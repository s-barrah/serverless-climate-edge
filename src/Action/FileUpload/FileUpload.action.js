
import {
  LambdaWrapper,
  DependencyInjection,
  RequestService,
  ResponseModel,
} from '../../Wrapper/index';

import FileParserService from '../../Service/FileParser.service';

import AgeResolver from '../../Resolver/Age.resolver';
import VarietyResolver from '../../Resolver/Variety.resolver';
import ChildResolver from '../../Resolver/Child.resolver';
import UserResolver from '../../Resolver/User.resolver';
import PlotResolver from '../../Resolver/Plot.resolver';

import stationMock from '../../../tests/mocks/form/station/valid.mock.json';

/***
 * Upload files
 *
 * @api {post} /upload /upload
 * @apiName Upload files
 * @apiGroup Entities
 * @apiDescription Upload files
 *
 * @apiSuccess {array} data     Object containing individual systems health
 * @apiSuccess {string} message The overall system health
 *
 */
import CONFIGURATION, { DEFINITIONS, TABLES, TABLE_DEFINITIONS } from '../../Config/Configuration';
import StationModel from "../../Model/Station.model";

export default LambdaWrapper(CONFIGURATION, async (di: DependencyInjection, request: RequestService, done) => {
  let response = {};

  //const event = request.getContainer().getEvent();
  const formData = request.getAll();

  console.log('formData: ', formData);

  if (formData) {

    const filesCount = Object.values(formData).length;

    console.log('filesCount: ', filesCount);

    const data = new FileParserService().getFileContent(formData);

    const ageResolver = new AgeResolver(di);
    const varietyResolver = new VarietyResolver(di);
    const plotResolver = new PlotResolver(di);
    const childResolver = new ChildResolver(di);
    const userResolver = new UserResolver(di);

    ageResolver.importFromFile(data); // get import data

    const ages = ageResolver.getRawData(); // hydrate and return entities

    // PROCESS AGES
    await di.get(DEFINITIONS.DATABASE).processBatches(ages, TABLES.AGE_TABLE); // store to db

    // PROCESS VARIETIES
    varietyResolver.importFromFile(data); // get import data
    const varieties = await varietyResolver.getRawData(); // hydrate and return entities
    await di.get(DEFINITIONS.DATABASE).processBatches(varieties, TABLES.VARIETY_TABLE); // store to db


    // PROCESS PLOTS
    plotResolver.importFromFile(data); // get import data
    const plots = await plotResolver.getRawData(); // hydrate and return entities
    await di.get(DEFINITIONS.DATABASE).processBatches(plots, TABLES.PLOT_TABLE); // store to db

    // PROCESS CHILDREN
    childResolver.importFromFile(data); // get import data
    const children = await childResolver.getChildren(); // hydrate and return entities
    await di.get(DEFINITIONS.DATABASE).processBatches(children, TABLES.CHILD_TABLE); // store to db

    const childrenResults = await childResolver.getAll();

    // PROCESS USERS
    userResolver.importFromFile(data); // get import data
    const users = await userResolver.getRawData(); // hydrate and return entities
    await di.get(DEFINITIONS.DATABASE).processBatches(users, TABLES.USER_TABLE); // store to db

    const userResults = await userResolver.getAll();

    const message = filesCount > 1 ? `${filesCount} files` : `1 file`;
    response = new ResponseModel({}, 200, `Successfully processed ${message}`);
  } else {
    response = new ResponseModel({}, 500, 'No files found!');
  }


  done(null, response.generate());
});

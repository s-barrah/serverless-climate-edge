
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
import CONFIGURATION, { DEFINITIONS, TABLES } from '../../Config/Configuration';

export default LambdaWrapper(CONFIGURATION, async (di: DependencyInjection, request: RequestService, done) => {
  let response = {};

  //const event = request.getContainer().getEvent();
  const formData = request.getAll();

  console.log('formData: ', formData);

  if (formData) {

    const data = new FileParserService().getFileContent(formData); // get data from files

    // PROCESS AGE DATA
    const ageResolver = new AgeResolver(di);
    ageResolver.importFromFile(data); // get import data
    const ages = ageResolver.getRawData(); // hydrate and return entities
    await di.get(DEFINITIONS.DATABASE).processBatches(ages, TABLES.AGE_TABLE); // store to db

    // PROCESS VARIETIES DATA
    const varietyResolver = new VarietyResolver(di);
    varietyResolver.importFromFile(data); // get import data
    const varieties = await varietyResolver.getRawData(); // hydrate and return entities
    await di.get(DEFINITIONS.DATABASE).processBatches(varieties, TABLES.VARIETY_TABLE); // store to db


    // PROCESS PLOTS DATA
    const plotResolver = new PlotResolver(di);
    plotResolver.importFromFile(data); // get import data
    const plots = await plotResolver.getRawData(); // hydrate and return entities
    await di.get(DEFINITIONS.DATABASE).processBatches(plots, TABLES.PLOT_TABLE); // store to db

    // PROCESS CHILDREN DATA
    const childResolver = new ChildResolver(di);
    childResolver.importFromFile(data); // get import data
    const children = await childResolver.getChildren(); // hydrate and return entities
    await di.get(DEFINITIONS.DATABASE).processBatches(children, TABLES.CHILD_TABLE); // store to db


    // PROCESS USERS DATA
    const userResolver = new UserResolver(di);
    userResolver.importFromFile(data); // get import data
    const users = await userResolver.getRawData(); // hydrate and return entities
    await di.get(DEFINITIONS.DATABASE).processBatches(users, TABLES.USER_TABLE); // store to db

    const filesCount = Object.values(formData).length;
    const message = filesCount > 1 ? `${filesCount} files` : `1 file`;

    response = new ResponseModel({}, 200, `Successfully processed ${message}`);

  } else {
    response = new ResponseModel({}, 500, 'No files found!');
  }


  done(null, response.generate());
});

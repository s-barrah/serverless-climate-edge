
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

  const data = new FileParserService().getFileContent(formData);
  const stationModel = new StationModel(stationMock);

  const ageResolver = new AgeResolver(di);
  const varietyResolver = new VarietyResolver(di);
  const plotResolver = new PlotResolver(di);

  // const varietyResolver = new VarietyResolver().importFromFile(data);
  /*
  const childResolver = new ChildResolver(data);
  const userResolver = new UserResolver(data);
  const plotResolver = new PlotResolver(data);*/

  ageResolver.importFromFile(data);

  const ages = ageResolver.getRawData();
  // const varieties = varietyResolver.getFormattedVarieties();

 /* const users = userResolver.getEnrichedUsers();
  const children = childResolver.getFormattedChildren();
  const varieties = varietyResolver.getFormattedVarieties();
  const plots = plotResolver.getEnrichedPlots();*/

  await di.get(DEFINITIONS.DATABASE).processBatches(ages, TABLES.AGE_TABLE);
    /*.then(() => {
      console.log('Processed Ages');
    })
    .catch((error) => {
      console.log('Error with processing Ages');
      response = new ResponseModel({}, 500, 'Error with processing Ages');
    });*/
/*
  const ageBatchWrites = di.get(DEFINITIONS.DATABASE).createBatchWrite(ages);
  const ageChunkArrays = di.get(DEFINITIONS.DATABASE).createChunks(ageBatchWrites, 20);

  const tableName = TABLES[TABLE_DEFINITIONS.STATION_TABLE];
  // await di.get(DEFINITIONS.DATABASE).createEntry(stationModel.getEntityMappings(), tableName);
  await Promise.all(
    ageChunkArrays.map((chunk) => {
      di.get(DEFINITIONS.DATABASE).batchWrite(chunk, TABLES[TABLE_DEFINITIONS.AGE_TABLE])

    }));*/
  // const ageResults = await ageResolver.getAll();


  varietyResolver.importFromFile(data);
  const varieties = await varietyResolver.getRawData();
  console.log('===================varieties==============');
  // console.log(varieties);
  console.log('FileUpload varieties.length: ', varieties.length);
  console.log('===================varieties==============');
  await di.get(DEFINITIONS.DATABASE).processBatches(varieties, TABLES.VARIETY_TABLE, 'name', 'age');
    /*.then(() => {
      console.log('Processed Variety');
    })
    .catch((error) => {
      console.log('Error with processing Variety');
      response = new ResponseModel({}, 500, 'Error with processing Variety');
    });*/
/*
  const varietyBatchWrites = di.get(DEFINITIONS.DATABASE).createBatchWrite(varieties);
  const varietyChunkArrays = di.get(DEFINITIONS.DATABASE).createChunks(varietyBatchWrites, 20);

  // await di.get(DEFINITIONS.DATABASE).createEntry(stationModel.getEntityMappings(), tableName);
  await Promise.all(
    varietyChunkArrays.map((chunk) => {
      di.get(DEFINITIONS.DATABASE).batchWrite(chunk, TABLES[TABLE_DEFINITIONS.VARIETY_TABLE])

    }));*/
  // const varietyResults = await varietyResolver.getAll();
  const varietyResults = await varietyResolver.getAll();
  console.log(varietyResults);


  plotResolver.importFromFile(data);
  const plots = await plotResolver.getRawData();
  console.log('===================plots==============');
  console.log(plots);
  console.log(plots.length);
  console.log('===================plots==============');
  await di.get(DEFINITIONS.DATABASE).processBatches(plots, TABLES.PLOT_TABLE);


  const plotResults = await plotResolver.getAll();

  response = new ResponseModel({ results: plotResults, length: plotResults.length }, 200, 'Retrieved Varieties from db');

    /*.then(async () => {
      console.log('Processed Plots');
      const plotResults = await plotResolver.getAll();

      response = new ResponseModel({ results: plotResults, length: plotResults.length }, 200, 'Retrieved Varieties from db');
    })
    .catch((error) => {
      console.log('Error with processing Plots');
      response = new ResponseModel({}, 500, 'Error with processing Plots');
    });*/



    // .then((data) => {



      // const ageBatchWrites = di.get(DEFINITIONS.DATABASE).createBatchWrite(ages);
      // const chunkArrays = di.get(DEFINITIONS.DATABASE).createChunks(ageBatchWrites, 20);
      //

      // console.log(ageBatchWrites);
      /*const chunkArrays = di.get(DEFINITIONS.DATABASE).createChunks(ageBatchWrites, 20);

      // return di.get(DEFINITIONS.DATABASE).batchProcessWrite(ageBatchWrites, TABLES[TABLE_DEFINITIONS.AGE_TABLE]);
      return Promise.all(
        chunkArrays.map((chunk) => {
          di.get(DEFINITIONS.DATABASE).batchWrite(chunk, TABLES[TABLE_DEFINITIONS.AGE_TABLE])

        }))*/
      /*response = new ResponseModel({
        ages,
        chunkArrays
      }, 200, 'Age data stored in database');*/
      // return di.get(DEFINITIONS.DATABASE).createBatchWrite(ages);
      // return chunkArrays;
    /*  return new Promise((resolve) => {
        const tableName = TABLES[TABLE_DEFINITIONS.AGE_TABLE];
        const stagePromises = ages.map((chunk) => {
          di.get(DEFINITIONS.DATABASE).createEntry(chunk, tableName)

        });
        return Promise.all(stagePromises)
          .catch((error) => {
            console.error(error);
          })
          .then(() => {
            resolve();
          });
      });*/
      // response = new ResponseModel({}, 200, 'Success!');
   // })
    /*.then((results) => {
      response = new ResponseModel(results, 200, 'Age data stored in database');
    })*/
    /*.catch((error) => {
      console.error(error);
      response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Unknown error.');
    })
    .then(() => {
      // console.log('Done');
      done(null, response.generate());
    });*/

  done(null, response.generate());
});

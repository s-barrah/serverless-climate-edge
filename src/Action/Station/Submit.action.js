import {
  LambdaWrapper,
  DependencyInjection,
  ResponseModel,
  RequestService,
} from '../../Wrapper';

import StationModel from '../../Model/Station.model';

import CONFIGURATION, {DEFINITIONS, TABLES} from '../../Config/Configuration';

// Define the request constraints
import requestConstraints from '../../Constraints/Station/Store.constraints.json';

/***
 * Store a station data
 *
 * @api {post} /data /data
 * @apiName Store a station data
 * @apiGroup Station
 * @apiDescription Store a station data
 *
 *
 *
 */
export default LambdaWrapper(CONFIGURATION, (di: DependencyInjection, request: RequestService, done) => {
  let response = {};

  // Store model
  const stationModel = new StationModel(request.getAll());

  console.log('stationModel.getSensorData: ', stationModel.getSensorData());


  const data = stationModel.getEntityMappings();
  data.timestamp = Math.floor(Date.now() / 1000);

  request.validateAgainstConstraints(requestConstraints)
    .then( async () => {
      console.log('data: ', data);
      await di.get(DEFINITIONS.DATABASE).processBatches(stationModel.getSensorData(), TABLES.SENSOR_TABLE);
      await di.get(DEFINITIONS.DATABASE).createEntry(data, TABLES.STATION_TABLE);
    })
    .then(() => {
      response = new ResponseModel(data, 200, 'Station data has been processed');
    })
    .catch((error) => {
      console.error(error);
      response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Unknown error.');
    })
    .then(() => {
      done(null, response.generate());
    });

});



import {
  LambdaWrapper,
  DependencyInjection,
  ResponseModel,
  RequestService,
} from '../../Wrapper';

import StationModel from '../../Model/Station.model';

import CONFIGURATION, { DEFINITIONS } from '../../Config/Configuration';

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
  console.log('stationModel.getSensorData2: ', stationModel.getSensorData2());

  const data = stationModel.getEntityMappings();
  data.timestamp = Math.floor(Date.now() / 1000);

  request.validateAgainstConstraints(requestConstraints)
    .then(() => {
      return di.get(DEFINITIONS.DATABASE).createEntry(data);
    })
    .then(() => {
      response = new ResponseModel({}, 200, 'Station data has been processed');
    })
    .catch((error) => {
      console.error(error);
      response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Unknown error.');
    })
    .then(() => {
      done(null, response.generate());
    });

});



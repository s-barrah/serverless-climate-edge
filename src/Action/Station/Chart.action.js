import {
  LambdaWrapper,
  DependencyInjection,
  RequestService,
  ResponseModel,
} from '../../Wrapper/index';


import CONFIGURATION, { DEFINITIONS } from '../../Config/Configuration';

// Define the request constraints
import requestConstraints from '../../Constraints/Station/Get.constraints.json';

/***
 * Get chart data
 *
 * @api {get} /chart /chart
 * @apiName Get chart data
 * @apiGroup Station
 * @apiDescription Get chart data
 *
 *
 *
 */
export default LambdaWrapper(CONFIGURATION, (di: DependencyInjection, request: RequestService, done) => {
  let response = {};

  const stationId = request.get('stationId');

  request.validateAgainstConstraints(requestConstraints)
    .then(() => {
      return di.get(DEFINITIONS.DATABASE).getEntry(stationId);
    })
    .then(() => {
      response = new ResponseModel({}, 200, 'Chart data has been processed');
    })
    .catch((error) => {
      console.error(error);
      response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Unknown error.');
    })
    .then(() => {
      done(null, response.generate());
    });

});

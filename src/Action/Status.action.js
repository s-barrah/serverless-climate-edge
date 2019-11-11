import {
  LambdaWrapper,
  DependencyInjection,
  ResponseModel,
  RequestService,
  StatusModel,
  STATUS_TYPES,
} from '../Wrapper';
import CONFIGURATION, { DEFINITIONS } from '../Config/Configuration';

/**
 * Get application status
 *
 * @api {get} /status /status
 * @apiName Application Status
 * @apiGroup General
 * @apiDescription Get application status
 *
 * @apiParam {integer} verbose  Whether to show a verbose result of system dependencies (1 or 0)
 *
 * @apiSuccess {array} data     Object containing individual systems health
 * @apiSuccess {string} message The overall system health
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "data": {},
 *      "message": "OK"
 *    }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "data": [
 *        {
 *          "service": "DYNAMODB",
 *          "status": "OK"
 *        }
 *      ],
 *      "message": "OK"
 *    }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "data": {},
 *      "message": "APPLICATION_FAILURE"
 *    }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "data": [
 *        {
 *          "service": "DYNAMODB",
 *          "status": "OK"
 *        }
 *      ],
 *      "message": "APPLICATION_FAILURE"
 *    }
 *
 *  @apiErrorExample {json} Error-Response: Unknown Error
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "data": {},
 *      "message": "Unknown error"
 *    }
 *
 */
export default LambdaWrapper(CONFIGURATION, (di: DependencyInjection, request: RequestService, done) => {
  let response = {};
  Promise.all([
    di.get(DEFINITIONS.DATABASE).checkStatus(),
  ])
    .then((statusChecks) => {
      response = new ResponseModel(request.get('verbose') === '1' ? statusChecks : {}, 200, STATUS_TYPES.OK);

      statusChecks.forEach((statusCheck: StatusModel) => {
        if (statusCheck.getStatus() === STATUS_TYPES.ACCEPTABLE_FAILURE && response.getMessage() !== STATUS_TYPES.APPLICATION_FAILURE) {
          response.setMessage(STATUS_TYPES.ACCEPTABLE_FAILURE);
        }
        if (statusCheck.getStatus() === STATUS_TYPES.APPLICATION_FAILURE) {
          response.setCode(500);
          response.setMessage(STATUS_TYPES.APPLICATION_FAILURE);
        }
      });
    })
    .catch((error) => {
      console.log(error);
      response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'unknown failure');
    })
    .then(() => {
      done(null, response.generate());
    });
});

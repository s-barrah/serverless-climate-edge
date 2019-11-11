import {
  LambdaWrapper,
  DependencyInjection,
  RequestService,
  ResponseModel,
} from '../../Wrapper/index';

/**
 * Get all age entities
 *
 * @api {get} /ages /ages
 * @apiName Get all age entities
 * @apiGroup Entities
 * @apiDescription Get all age entities
 *
 * @apiSuccess {array} data     Object containing db results
 * @apiSuccess {string} message The overall system health
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "data": [
 *       {
 *         months: 1
 *         years: null,
 *       },
 *       {
 *         months: 8
 *         years: null,
 *       },
 *       {
 *         months: null
 *         years: 5,
 *       },
 *      ],
 *      "message": "Successfully retrieved data!"
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
import CONFIGURATION, {DEFINITIONS, TABLES} from '../../Config/Configuration';

export default LambdaWrapper(CONFIGURATION, (di: DependencyInjection, request: RequestService, done) => {
  let response = {};

  di.get(DEFINITIONS.DATABASE).getEntries(TABLES.AGE_TABLE)
    .then((data) => {
      response = new ResponseModel(data, 200, 'Successfully retrieved data!');
    })
    .catch((error) => {
      console.error(error);
      response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Unknown error.');
    })
    .then(() => {
      done(null, response.generate());
    });

});

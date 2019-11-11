import {
  LambdaWrapper,
  DependencyInjection,
  RequestService,
  ResponseModel,
} from '../../Wrapper/index';

/**
 * Get all varieties entities
 *
 * @api {get} /varieties /varieties
 * @apiName Get all varieties entities
 * @apiGroup Entities
 * @apiDescription Get all varieties entities
 *
 * @apiSuccess {array} data     Object containing db results
 * @apiSuccess {string} message The overall system health
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "data": [
 *        {
 *          name: 'Catuai',
 *          age: null,
 *          percentage: 3000
 *        },
 *        {
 *          name: 'Borbon',
 *          plotName: 'El Naranjo',
 *          age: { months: null, years: 10 },
 *          percentage: null
 *        }
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

  di.get(DEFINITIONS.DATABASE).getEntries(TABLES.VARIETY_TABLE)
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

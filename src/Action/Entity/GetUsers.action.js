import {
  LambdaWrapper,
  DependencyInjection,
  RequestService,
  ResponseModel,
} from '../../Wrapper/index';

/**
 * Get all users entities
 *
 * @api {get} /users /users
 * @apiName Get all users entities
 * @apiGroup Entities
 * @apiDescription Get all users entities
 *
 * @apiSuccess {array} data     Object containing db results
 * @apiSuccess {string} message The overall system health
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "data": [
 *       {
 *         firstName: 'User',
 *         lastName: 'test 1',
 *         partnerFullName: 'test 1',
 *         children: [
 *          {
 *            fullName: 'Test'
 *            age: {
 *              months: null
 *              years: 5,
 *          },
 *          {
 *            fullName: 'John Green'
 *            age: {
 *              months: null
 *              years: 21,
 *            },
 *          },
 *         ]
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

  di.get(DEFINITIONS.DATABASE).getEntries(TABLES.USER_TABLE)
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

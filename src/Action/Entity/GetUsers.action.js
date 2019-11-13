import {
  LambdaWrapper,
  DependencyInjection,
  RequestService,
  ResponseModel,
} from '../../Wrapper/index';

import CONFIGURATION from '../../Config/Configuration';

import UserResolver from '../../Resolver/User.resolver';

import { getCount } from '../../lib/Util';


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
 *            age: '5 years',
 *          {
 *            fullName: 'John Green'
 *            age: '21 years',
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

export default LambdaWrapper(CONFIGURATION, async (di: DependencyInjection, request: RequestService, done) => {
  let response = {};

  try {
    const userResolver = new UserResolver(di);
    const results = await userResolver.getAll();

    const count = getCount(results);

    response = new ResponseModel(results, 200, `${count} found`);

  } catch (e) {
    console.log('Get Users error - ', e);
    response = new ResponseModel({}, 500, 'Unknown error.');
  }

  done(null, response.generate());

});

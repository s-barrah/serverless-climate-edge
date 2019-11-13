import {
  LambdaWrapper,
  DependencyInjection,
  RequestService,
  ResponseModel,
} from '../../Wrapper/index';

import CONFIGURATION from '../../Config/Configuration';

import ChildResolver from '../../Resolver/Child.resolver';

import { getCount } from '../../lib/Util';

/**
 * Get all children entities
 *
 * @api {get} /children /children
 * @apiName Get all children entities
 * @apiGroup Entities
 * @apiDescription Get all children entities
 *
 * @apiSuccess {array} data     Object containing db results
 * @apiSuccess {string} message The overall system health
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "data": [
 *       {
 *         fullName: "Marco Antonio Lazo"
 *         age: "23 years",
 *       },
 *       {
 *         fullName: "Glory Martinez Reyes"
 *         age: "11 years",
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
    const childResolver = new ChildResolver(di);
    const children = await childResolver.getAll();
    const results = childResolver.getFormattedList(children);

    const count = getCount(results);

    response = new ResponseModel(results, 200, `${count} found`);
  } catch (e) {
    console.log('Get Children Error - ', e);
    response = new ResponseModel({}, 500, 'Unknown error.');
  }

  done(null, response.generate());
});

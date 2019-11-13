import {
  LambdaWrapper,
  DependencyInjection,
  RequestService,
  ResponseModel,
} from '../../Wrapper/index';

import CONFIGURATION from '../../Config/Configuration';

import AgeResolver from "../../Resolver/Age.resolver";

import { getCount } from '../../lib/Util';

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

export default LambdaWrapper(CONFIGURATION, async (di: DependencyInjection, request: RequestService, done) => {
  let response = {};

  try {
    const ageResolver = new AgeResolver(di);
    const results = await ageResolver.getAll();

    const count = getCount(results);

    response = new ResponseModel(results, 200, `${count} found`);

  } catch (e) {
    console.log('GetAgesError - ', e);
    response = new ResponseModel({}, 500, 'Unknown error.');
  }

  done(null, response.generate());

});

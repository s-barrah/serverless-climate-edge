import {
  LambdaWrapper,
  DependencyInjection,
  RequestService,
  ResponseModel,
} from '../../Wrapper/index';

import CONFIGURATION, {DEFINITIONS, TABLES} from '../../Config/Configuration';

import VarietyResolver from '../../Resolver/Variety.resolver';

import { getCount } from '../../lib/Util';

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
 *          id: 'Gh69j-902DFb-19028-827wD',
 *          name: 'Catuai',
 *          age: null,
 *          percentage: 3000
 *        },
 *        {
 *          id: 'm21Tg9h-Gw5625-j9s552-BN9Gb',
 *          name: 'Borbon',
 *          age: '10 years',
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


export default LambdaWrapper(CONFIGURATION, async (di: DependencyInjection, request: RequestService, done) => {
  let response = {};

  try {
    const varietyResolver = new VarietyResolver(di);
    const varieties = await varietyResolver.getAll();

    const count = getCount(varieties);

    response = new ResponseModel(varieties, 200, `${count} found`);

  } catch (e) {
    console.log('Get Varieties Error - ', e);
    response = new ResponseModel({}, 500, 'Unknown error.');
  }

  done(null, response.generate());

});

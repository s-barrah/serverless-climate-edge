import {
  LambdaWrapper,
  DependencyInjection,
  RequestService,
  ResponseModel,
} from '../../Wrapper/index';

import CONFIGURATION from '../../Config/Configuration';

import PlotResolver from '../../Resolver/Plot.resolver';

import { getCount } from '../../lib/Util';

/**
 * Get all plots entities
 *
 * @api {get} /plots /plots
 * @apiName Get all plots entities
 * @apiGroup Entities
 * @apiDescription Get all plots entities
 *
 * @apiSuccess {array} data     Object containing db results
 * @apiSuccess {string} message The overall system health
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "data": [
 *       {
 *         title: 'El Sucunan',
 *         size: '0.5 Manzana',
 *         varieties: [
 *           {
 *             name: 'Catuai',
 *             age: null,
 *             percentage: 3000
 *           },
 *         ]
 *       },
 *      ],
 *      "message": "1 records found"
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
    const plotResolver = new PlotResolver(di);
    const plots = await plotResolver.getAll();

    const count = getCount(plots);

    response = new ResponseModel(plots, 200, `${count} found`);

  } catch (e) {
    console.log('Get Plots error - ', e);
    response = new ResponseModel({}, 500, 'Unknown error.');
  }

  done(null, response.generate());
});

import FileParserService from '../../Service/FileParser.service';

import AgeResolver from '../../Resolver/Age.resolver';
import VarietyResolver from '../../Resolver/Variety.resolver';
import ChildResolver from '../../Resolver/Child.resolver';
import UserResolver from '../../Resolver/User.resolver';
import PlotResolver from '../../Resolver/Plot.resolver';

import {
  LambdaWrapper,
  DependencyInjection,
  RequestService,
  ResponseModel,
} from '../../Wrapper/index';

/***
 * Upload files
 *
 * @api {post} /upload /upload
 * @apiName Upload files
 * @apiGroup Entities
 * @apiDescription Upload files
 *
 * @apiSuccess {array} data     Object containing individual systems health
 * @apiSuccess {string} message The overall system health
 *
 */
import CONFIGURATION, { DEFINITIONS } from '../../Config/Configuration';

export default LambdaWrapper(CONFIGURATION, async (di: DependencyInjection, request: RequestService, done) => {
  let response = {};

  const event = request.getContainer().getEvent();
  const formData = request.getAll();

  new FileParserService().getFileContent(formData)
    .then((data) => {

      const ageResolver = new AgeResolver(data);
      const varietyResolver = new VarietyResolver(data);
      const childResolver = new ChildResolver(data);
      const userResolver = new UserResolver(data);
      const plotResolver = new PlotResolver(data);

      const ages = ageResolver.getAges(data);
      const users = userResolver.getEnrichedUsers();
      const children = childResolver.getFormattedChildren();
      const varieties = varietyResolver.getFormattedVarieties();
      const plots = plotResolver.getEnrichedPlots();

      console.log('===================ages==============');
      console.log(ages);
      console.log('===================ages==============');

      console.log('===================users==============');
      console.log(users);
      console.log('===================users==============');

      console.log('===================children==============');
      console.log(children);
      console.log('===================children==============');

      console.log('===================varieties==============');
      console.log(varieties);
      console.log('===================varieties==============');

      console.log('===================plots==============');
      console.log(plots);
      console.log('===================plots==============');

      response = new ResponseModel({}, 200, 'Files uploaded!');
    })
    .catch((error) => {
      console.error(error);
      response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Unknown error.');
    })
    .then(() => {
      done(null, response.generate());
    });


});

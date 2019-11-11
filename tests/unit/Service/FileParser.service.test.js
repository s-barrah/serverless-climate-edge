import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import FileImporterService from '../../../src/Service/FileParser.service';

import AgeResolver from '../../../src/Resolver/Age.resolver';
import VarietyResolver from '../../../src/Resolver/Variety.resolver';
import ChildResolver from '../../../src/Resolver/Child.resolver';
import UserResolver from '../../../src/Resolver/User.resolver';
import PlotResolver from '../../../src/Resolver/Plot.resolver';


const expect = ServerlessMochaPlugin.chai.expect;

const filePath = {
  plot: `${__dirname}/../../mocks/files/Lowell plot data.csv`,
  farmer: `${__dirname}/../../mocks/files/Farmer Data.csv`,
  children: `${__dirname}/../../mocks/files/Children Data.csv`,
};

describe('Service/FileParser.service', () => {
  let response;
  const fileImporterService = new FileImporterService();



  describe('Ensure data is retrieved from file', () => {
    const plotsData = fileImporterService.getFileData(filePath.plot);
    const farmerData = fileImporterService.getFileData(filePath.farmer);
    const childrenData = fileImporterService.getFileData(filePath.children);

    const combinedData = [ ...plotsData, ...farmerData, ...childrenData ];


    const ageResolver = new AgeResolver(combinedData);
    const varietyResolver = new VarietyResolver(combinedData);
    const childResolver = new ChildResolver(combinedData);
    const userResolver = new UserResolver(combinedData);
    const plotResolver = new PlotResolver(combinedData);

    const ages = ageResolver.getAges(combinedData);
    const users = userResolver.getEnrichedUsers();
    const children = childResolver.getFormattedChildren();
    const varieties = varietyResolver.getFormattedVarieties();

    console.log('===================getEnrichedPlots==============');
    plotResolver.getEnrichedPlots();
     //console.log('plotResolver: ', plotResolver.getEnrichedPlots());
    // console.log('Get plotResolver.getEnrichedPlots() length: ', plotResolver.getEnrichedPlots().length);
    console.log('===================getEnrichedPlots==============');


    // console.log('Get varieties: ', varieties);
/*

    console.log('===================getVarieties==============');
    console.log('getVarieties: ', fileImporterService.getVarieties(combinedData));
    console.log('===================getVarieties==============');

    const getAges = fileImporterService.getAges(combinedData);
    const formatAges = fileImporterService.formatAges(combinedData);
    console.log('===================getAges==============');
    console.log('getAges: ', getAges);
    console.log('getAges length: ', getAges.length);
    console.log('===================getAges==============');


    console.log('===================formatAges==============');
    console.log('formatAges: ', formatAges);
    console.log('formatAges length: ', formatAges.length);
    console.log('===================formatAges==============');

    console.log('===================ageResolver==============');
    console.log('ageResolver getAges: ', ageResolver.getAges());
    console.log('ageResolver.getAges() length: ', ageResolver.getAges().length);
    console.log('===================ageResolver==============');

    console.log('getAges == formatAges', JSON.stringify(getAges) === JSON.stringify(formatAges));
    console.log('getAges == ageResolver.getAges()', JSON.stringify(getAges) === JSON.stringify(ageResolver.getAges()));
    console.log('ageResolver.getAges() == formatAges', JSON.stringify(ageResolver.getAges()) === JSON.stringify(formatAges));

*/
    /*console.log('children == getChildren', JSON.stringify(children) === JSON.stringify(childResolver.getFormattedChildren()));
    console.log('===================children==============');
    console.log('children: ', children);
    console.log('===================children==============');

    console.log('===================getFormattedChildren==============');
    console.log('getFormattedChildren: ', childResolver.getFormattedChildren());
    console.log('===================getFormattedChildren==============');*/


    // console.log('getChildren === enrichData: ', JSON.stringify(childResolver.getChildren()) === JSON.stringify(childResolver.enrichData()));

    // console.log('Get User length: ', users.length);
/*

    users.map((user) => {
      console.log(`Name: ${user.firstName} ${user.lastName}`);
      console.log(`Children: ${JSON.stringify(user.children)}`);
    });
*/

    // console.log('Get Children: ', children);

  });


});

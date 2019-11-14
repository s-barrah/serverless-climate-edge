import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import PlotModel from '../../../src/Model/Plot.model';

let expect = ServerlessMochaPlugin.chai.expect;

const plotMock = require('../../mocks/form/entity/plot.mock.json');


// Test definitions.
describe('Model/Plot.model', () => {

  describe('Ensure setting and getting of variables', () => {
    const plotModel = new PlotModel();

    it('should set the title correctly', () => {
      plotModel.setTitle(plotMock.title);
      expect(plotModel.getTitle()).to.eql(plotMock.title);
    });

    it('should set the size correctly', () => {
      plotModel.setSize(plotMock.size);
      expect(plotModel.getSize()).to.eql(plotMock.size);
    });

    it('should set the varieties correctly', () => {
      plotModel.setVarieties(plotMock.varieties);
      expect(plotModel.getVarieties()).to.eql(plotMock.varieties);
    });

  });

  describe('Ensure entity mapping', () => {

    const plotModel = new PlotModel().hydrateFromEntity(plotMock);

    it('should return an object with all of the entity values', () => {
      expect(plotModel.getEntityMappings()).to.eql({
        title: plotMock.title,
        size: plotMock.size,
        varieties: plotMock.varieties
      });
    });
  });

  describe('Ensure entity hydration', () => {

    it('should be able to get the hydrated variables from the model', () => {
      const plotModel = new PlotModel().hydrateFromEntity(plotMock);

      expect(plotModel.getTitle()).to.eql(plotMock.title);
      expect(plotModel.getSize()).to.eql(plotMock.size);
      expect(plotModel.getVarieties()).to.eql(plotMock.varieties);
    });
  });


});

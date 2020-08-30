import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import AgeModel from '../../../src/Model/Age.model';

let expect = ServerlessMochaPlugin.chai.expect;

const ageMock = require('../../mocks/form/entity/age.mock.json');


// Test definitions.
describe('Model/Age.model', () => {

  describe('Ensure setting and getting of variables', () => {
    const ageModel = new AgeModel();

    it('should set the id correctly', () => {
      ageModel.setId(ageMock.id);
      expect(ageModel.getId()).to.eql(ageMock.id);
    });

    it('should set the month correctly', () => {
      ageModel.setMonths(ageMock.months);
      expect(ageModel.getMonths()).to.eql(null);
    });

    it('should set the year correctly', () => {
      ageModel.setYears(ageMock.years);
      expect(ageModel.getYears()).to.eql(ageMock.years);
    });

  });

  describe('Ensure entity mapping', () => {

    const ageModel = new AgeModel().hydrateFromEntity(ageMock);

    it('should return an object with all of the entity values', () => {
      expect(ageModel.getEntityMappings()).to.eql({
        id: ageMock.id,
        months: null,
        years: ageMock.years
      });
    });
  });

  describe('Ensure entity hydration', () => {

    it('should be able to get the hydrated variables from the model', () => {
      const ageModel = new AgeModel().hydrateFromEntity(ageMock);

      expect(ageModel.getId()).to.eql(ageMock.id);
      expect(ageModel.getMonths()).to.eql(null);
      expect(ageModel.getYears()).to.eql(ageMock.years);
    });
  });


});

import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import VarietyModel from '../../../src/Model/Variety.model';

let expect = ServerlessMochaPlugin.chai.expect;

const varietyMock = require('../../mocks/form/entity/variety.mock.json');


// Test definitions.
describe('Model/Variety.model', () => {

  describe('Ensure setting and getting of variables', () => {
    const varietyModel = new VarietyModel();

    it('should set the id correctly', () => {
      varietyModel.setId(varietyMock.id);
      expect(varietyModel.getId()).to.eql(varietyMock.id);
    });

    it('should set the name correctly', () => {
      varietyModel.setName(varietyMock.name);
      expect(varietyModel.getName()).to.eql(varietyMock.name);
    });

    it('should set the age correctly', () => {
      varietyModel.setAge(varietyMock.age);
      expect(varietyModel.getAge()).to.eql(varietyMock.age);
    });

    it('should set the percentage correctly', () => {
      varietyModel.setPercentage(varietyMock.percentage);
      expect(varietyModel.getPercentage()).to.eql(varietyMock.percentage);
    });

  });

  describe('Ensure entity mapping', () => {

    const varietyModel = new VarietyModel().hydrateFromEntity(varietyMock);

    it('should return an object with all of the entity values', () => {
      expect(varietyModel.getEntityMappings()).to.eql({
        id: varietyMock.id,
        name: varietyMock.name,
        age: varietyMock.age,
        percentage: varietyMock.percentage
      });
    });
  });

  describe('Ensure entity hydration', () => {

    it('should be able to get the hydrated variables from the model', () => {
      const varietyModel = new VarietyModel().hydrateFromEntity(varietyMock);

      expect(varietyModel.getId()).to.eql(varietyMock.id);
      expect(varietyModel.getName()).to.eql(varietyMock.name);
      expect(varietyModel.getAge()).to.eql(varietyMock.age);
      expect(varietyModel.getPercentage()).to.eql(varietyMock.percentage);
    });
  });


});

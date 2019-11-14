import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import ChildModel from '../../../src/Model/Child.model';

let expect = ServerlessMochaPlugin.chai.expect;

const childMock = require('../../mocks/form/entity/child.mock.json');


// Test definitions.
describe('Model/Child.model', () => {

  describe('Ensure setting and getting of variables', () => {
    const childModel = new ChildModel();

    it('should set the Full Name correctly', () => {
      childModel.setFullName(childMock.fullName);
      expect(childModel.getFullName()).to.eql(childMock.fullName);
    });

    it('should set the age correctly', () => {
      childModel.setAge(childMock.age);
      expect(childModel.getAge()).to.eql(childMock.age);
    });

  });

  describe('Ensure entity mapping', () => {

    const childModel = new ChildModel().hydrateFromEntity(childMock);

    it('should return an object with all of the entity values', () => {
      expect(childModel.getEntityMappings()).to.eql({
        fullName: childMock.fullName,
        age: childMock.age
      });
    });
  });

  describe('Ensure entity hydration', () => {

    it('should be able to get the hydrated variables from the model', () => {
      const childModel = new ChildModel().hydrateFromEntity(childMock);

      expect(childModel.getFullName()).to.eql(childMock.fullName);
      expect(childModel.getAge()).to.eql(childMock.age);
    });
  });


});

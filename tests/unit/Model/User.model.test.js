import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import UserModel from '../../../src/Model/User.model';

let expect = ServerlessMochaPlugin.chai.expect;

const userMock = require('../../mocks/form/entity/user.mock.json');


// Test definitions.
describe('Model/User.model', () => {

  describe('Ensure setting and getting of variables', () => {
    const userModel = new UserModel();

    it('should set the First Name correctly', () => {
      userModel.setFirstName(userMock.firstName);
      expect(userModel.getFirstName()).to.eql(userMock.firstName);
    });

    it('should set the Last Name correctly', () => {
      userModel.setLastName(userMock.lastName);
      expect(userModel.getLastName()).to.eql(userMock.lastName);
    });

    it('should set the Partner FullName correctly', () => {
      userModel.setPartnerFullName(userMock.partnerFullName);
      expect(userModel.getPartnerFullName()).to.eql(userMock.partnerFullName);
    });

    it('should set the children correctly', () => {
      userModel.setChildren(userMock.children);
      expect(userModel.getChildren()).to.eql(userMock.children);
    });

  });

  describe('Ensure entity mapping', () => {

    const userModel = new UserModel().hydrateFromEntity(userMock);

    it('should return an object with all of the entity values', () => {
      expect(userModel.getEntityMappings()).to.eql({
        firstName: userMock.firstName,
        lastName: userMock.lastName,
        partnerFullName: userMock.partnerFullName,
        children: userMock.children
      });
    });
  });

  describe('Ensure entity hydration', () => {

    it('should be able to get the hydrated variables from the model', () => {
      const userModel = new UserModel().hydrateFromEntity(userMock);

      expect(userModel.getFirstName()).to.eql(userMock.firstName);
      expect(userModel.getLastName()).to.eql(userMock.lastName);
      expect(userModel.getPartnerFullName()).to.eql(userMock.partnerFullName);
      expect(userModel.getChildren()).to.eql(userMock.children);
    });
  });


});

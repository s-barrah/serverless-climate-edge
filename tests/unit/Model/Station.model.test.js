import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import StationModel from '../../../src/Model/Station.model';

let expect = ServerlessMochaPlugin.chai.expect;

const stationMock = require('../../mocks/form/station/valid.mock.json');


// Test definitions.
describe('Model/Station.model', () => {

  describe('Ensure entity mapping', () => {

    const stationModel = new StationModel(stationMock);

    it('should return an object with all of the entity values', () => {
      expect(stationModel.getEntityMappings()).to.eql({
        stationId: stationMock.stationId,
        hardwareVersion: stationMock.hardwareVersion,
        firmwareVersion: stationMock.firmwareVersion,
        signalStrength: stationMock.signalStrength,
        networkOperator: stationMock.networkOperator,
        latitude: stationMock.latitude,
        longitude: stationMock.longitude,
        altitude: stationMock.altitude
      });
    });
  });

  describe('Ensure entity hydration', () => {

    it('should be able to get the hydrated variables from the model', () => {
      const stationModel = new StationModel(stationMock);

      expect(stationModel.getStationId()).to.eql(stationMock.stationId);
      expect(stationModel.getHardwareVersion()).to.eql(stationMock.hardwareVersion);
      expect(stationModel.getFirmwareVersion()).to.eql(stationMock.firmwareVersion);
      expect(stationModel.getSignalStrength()).to.eql(stationMock.signalStrength);
      expect(stationModel.getNetworkOperator()).to.eql(stationMock.networkOperator);
      expect(stationModel.getLatitude()).to.eql(stationMock.latitude);
      expect(stationModel.getLongitude()).to.eql(stationMock.longitude);
      expect(stationModel.getAltitude()).to.eql(stationMock.altitude);
      expect(stationModel.getSensorData().length).to.eql(stationMock.data.length);
    });
  });


});

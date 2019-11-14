import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import SensorModel from '../../../src/Model/Sensor.model';

let expect = ServerlessMochaPlugin.chai.expect;

const sensorMock = require('../../mocks/form/station/sensor.mock.json');


// Test definitions.
describe('Model/Sensor.model', () => {

  describe('Ensure setting and getting of variables', () => {
    const sensorModel = new SensorModel();

    it('should set the station id correctly', () => {
      sensorModel.setStationId(sensorMock.stationId);
      expect(sensorModel.getStationId()).to.eql(sensorMock.stationId);
    });

    it('should set the timestamp correctly', () => {
      sensorModel.setTimestamp(sensorMock.timestamp);
      expect(sensorModel.getTimestamp()).to.eql(sensorMock.timestamp);
    });

    it('should set the air temperature correctly', () => {
      sensorModel.setAirTemperature(sensorMock.airTemperature);
      expect(sensorModel.getAirTemperature()).to.eql(sensorMock.airTemperature);
    });

    it('should set the soil temperature correctly', () => {
      sensorModel.setSoilTemperature(sensorMock.soilTemperature);
      expect(sensorModel.getSoilTemperature()).to.eql(sensorMock.soilTemperature);
    });

    it('should set the air pressure correctly', () => {
      sensorModel.setAirPressure(sensorMock.airPressure);
      expect(sensorModel.getAirPressure()).to.eql(sensorMock.airPressure);
    });

    it('should set the soil moisture correctly', () => {
      sensorModel.setSoilMoisture(sensorMock.soilMoisture);
      expect(sensorModel.getSoilMoisture()).to.eql(sensorModel.calculateSoilMoisture(sensorMock.soilMoisture));
    });

    it('should set the leaf wetness correctly', () => {
      sensorModel.setLeafWetness(sensorMock.leafWetness);
      expect(sensorModel.getLeafWetness()).to.eql(sensorModel.calculateLeafWetness(sensorMock.leafWetness));
    });

    it('should set the PAR correctly', () => {
      sensorModel.setPar(sensorMock.PAR);
      expect(sensorModel.getPar()).to.eql(sensorModel.calculatePar(sensorMock.PAR));
    });

    it('should set the humidity correctly', () => {
      sensorModel.setHumidity(sensorMock.humidity);
      expect(sensorModel.getHumidity()).to.eql(sensorMock.humidity);
    });

    it('should set the battery voltage correctly', () => {
      sensorModel.setBatteryVoltage(sensorMock.batteryVoltage);
      expect(sensorModel.getBatteryVoltage()).to.eql(sensorModel.dividedByThousand(sensorMock.batteryVoltage));
    });

    it('should set the battery temperature correctly', () => {
      sensorModel.setBatteryTemperature(sensorMock.batteryTemperature);
      expect(sensorModel.getBatteryTemperature()).to.eql(sensorMock.batteryTemperature);
    });

    it('should set the solar voltage correctly', () => {
      sensorModel.setSolarVoltage(sensorMock.solarVoltage);
      expect(sensorModel.getSolarVoltage()).to.eql(sensorModel.dividedByThousand(sensorMock.solarVoltage));
    });

    it('should set the charge current correctly', () => {
      sensorModel.setChargeCurrent(sensorMock.chargeCurrent);
      expect(sensorModel.getChargeCurrent()).to.eql(sensorMock.chargeCurrent);
    });

  });

  describe('Ensure entity mapping', () => {

    const sensorModel = new SensorModel().hydrateFromEntity(sensorMock);

    it('should return an object with all of the entity values', () => {
      expect(sensorModel.getEntityMappings()).to.eql({
        stationId: sensorMock.stationId,
        timestamp: sensorMock.timestamp,
        airTemperature: sensorMock.airTemperature,
        soilTemperature: sensorMock.soilTemperature,
        airPressure: sensorMock.airPressure,
        soilMoisture: sensorModel.calculateSoilMoisture(sensorMock.soilMoisture),
        leafWetness: sensorModel.calculateLeafWetness(sensorMock.leafWetness),
        PAR: sensorModel.calculatePar(sensorMock.PAR),
        rainfallSensorBatteryVoltage: null,
        rainfallDripCount: null,
        humidity: sensorMock.humidity,
        batteryVoltage: sensorModel.dividedByThousand(sensorMock.batteryVoltage),
        batteryTemperature: sensorMock.batteryTemperature,
        solarVoltage: sensorModel.dividedByThousand(sensorMock.solarVoltage),
        chargeCurrent: sensorMock.chargeCurrent,
        VPD: sensorModel.getVPD(),
      });
    });
  });

  describe('Ensure entity hydration', () => {

    it('should be able to get the hydrated variables from the model', () => {
      const sensorModel = new SensorModel().hydrateFromEntity(sensorMock);

      expect(sensorModel.getStationId()).to.eql(sensorMock.stationId);
      expect(sensorModel.getTimestamp()).to.eql(sensorMock.timestamp);
      expect(sensorModel.getAirTemperature()).to.eql(sensorMock.airTemperature);
      expect(sensorModel.getSoilTemperature()).to.eql(sensorMock.soilTemperature);
      expect(sensorModel.getAirPressure()).to.eql(sensorMock.airPressure);
      expect(sensorModel.getSoilMoisture()).to.eql(sensorModel.calculateSoilMoisture(sensorMock.soilMoisture));
      expect(sensorModel.getLeafWetness()).to.eql(sensorModel.calculateLeafWetness(sensorMock.leafWetness));
      expect(sensorModel.getPar()).to.eql(sensorModel.calculatePar(sensorMock.PAR));
      expect(sensorModel.getRainfallSensorBatteryVoltage()).to.eql(null);
      expect(sensorModel.getRainfallDripCount()).to.eql(null);
      expect(sensorModel.getHumidity()).to.eql(sensorMock.humidity);
      expect(sensorModel.getBatteryVoltage()).to.eql(sensorModel.dividedByThousand(sensorMock.batteryVoltage));
      expect(sensorModel.getBatteryTemperature()).to.eql(sensorMock.batteryTemperature);
      expect(sensorModel.getSolarVoltage()).to.eql(sensorModel.dividedByThousand(sensorMock.solarVoltage));
      expect(sensorModel.getChargeCurrent()).to.eql(sensorMock.chargeCurrent);

    });
  });


});

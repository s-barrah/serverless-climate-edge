import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import StationModel from '../../../src/Model/Station.model';

import SensorService from '../../../src/Service/Sensor.service';

let expect = ServerlessMochaPlugin.chai.expect;

const stationMock = require('../../mocks/form/station/valid.mock.json');

// Test definitions.
describe('Service/Sensor.service', () => {

  describe('Ensure data processes completely', () => {

    const stationModel = new StationModel(stationMock);
    const sensorService = new SensorService();
    const processedResponse = sensorService.processedResponse(stationModel.getSensorData());

    it('should return the processed response', () => {
      expect(processedResponse).to.have.property('airTemperature');
      expect(processedResponse).to.have.property('soilTemperature');
      expect(processedResponse).to.have.property('airPressure');
      expect(processedResponse).to.have.property('soilMoisture');
      expect(processedResponse).to.have.property('leafWetness');
      expect(processedResponse).to.have.property('PAR');
      expect(processedResponse).to.have.property('humidity');
      expect(processedResponse).to.have.property('batteryVoltage');
      expect(processedResponse).to.have.property('batteryTemperature');
      expect(processedResponse).to.have.property('solarVoltage');
      expect(processedResponse).to.have.property('chargeCurrent');
      expect(processedResponse).to.have.property('VPD');
    });


  });

  describe('Process latest, minimum, maximum and mean values', () => {

    const stationModel = new StationModel(stationMock);
    const sensorService = new SensorService();
    const processedResponse = sensorService.processedResponse(stationModel.getSensorData());

    it('should return the LATEST Air Temperature value', () => {
      expect(processedResponse.airTemperature.latest).to.eql(25.76);
    });

    it('should return the MINIMUM Air Temperature value', () => {
      expect(processedResponse.airTemperature.minimum).to.eql(22.86);
    });

    it('should return the MAXIMUM Air Temperature value', () => {
      expect(processedResponse.airTemperature.maximum).to.eql(25.76);
    });

    it('should return the MEAN Air Temperature value', () => {
      expect(processedResponse.airTemperature.mean).to.eql(24.105);
    });

    it('should return the LATEST Soil Temperature value', () => {
      expect(processedResponse.soilTemperature.latest).to.eql(21.52);
    });

    it('should return the MINIMUM Soil Temperature value', () => {
      expect(processedResponse.soilTemperature.minimum).to.eql(20.75);
    });

    it('should return the MAXIMUM Soil Temperature value', () => {
      expect(processedResponse.soilTemperature.maximum).to.eql(21.52);
    });

    it('should return the MEAN Soil Temperature value', () => {
      expect(processedResponse.soilTemperature.mean).to.eql(21.2275);
    });

    it('should return the LATEST Air Pressure value', () => {
      expect(processedResponse.airPressure.latest).to.eql(844);
    });

    it('should return the MINIMUM Air Pressure value', () => {
      expect(processedResponse.airPressure.minimum).to.eql(794);
    });

    it('should return the MAXIMUM Air Pressure value', () => {
      expect(processedResponse.airPressure.maximum).to.eql(844);
    });

    it('should return the MEAN Air Pressure value', () => {
      expect(processedResponse.airPressure.mean).to.eql(816);
    });

    it('should return the LATEST Soil Moisture value', () => {
      expect(processedResponse.soilMoisture.latest).to.eql(17.035644531249993);
    });

    it('should return the MINIMUM Soil Moisture value', () => {
      expect(processedResponse.soilMoisture.minimum).to.eql(9.831879882812489);
    });

    it('should return the MAXIMUM Soil Moisture value', () => {
      expect(processedResponse.soilMoisture.maximum).to.eql(17.035644531249993);
    });

    it('should return the MEAN Soil Moisture value', () => {
      expect(processedResponse.soilMoisture.mean).to.eql(12.87656494140624);
    });

    it('should return the LATEST Leaf Wetness value', () => {
      expect(processedResponse.leafWetness.latest).to.eql(100);
    });

    it('should return the MINIMUM Leaf Wetness value', () => {
      expect(processedResponse.leafWetness.minimum).to.eql(95.14285714285714);
    });

    it('should return the MAXIMUM Leaf Wetness value', () => {
      expect(processedResponse.leafWetness.maximum).to.eql(100);
    });

    it('should return the MEAN Leaf Wetness value', () => {
      expect(processedResponse.leafWetness.mean).to.eql(98.3095238095238);
    });

    it('should return the LATEST PAR value', () => {
      expect(processedResponse.PAR.latest).to.eql(830.5145095246573);
    });

    it('should return the MINIMUM PAR value', () => {
      expect(processedResponse.PAR.minimum).to.eql(771.3192095424604);
    });

    it('should return the MAXIMUM PAR value', () => {
      expect(processedResponse.PAR.maximum).to.eql(830.5145095246573);
    });

    it('should return the MEAN PAR value', () => {
      expect(processedResponse.PAR.mean).to.eql(794.6857753249067);
    });

    it('should return the LATEST humidity value', () => {
      expect(processedResponse.humidity.latest).to.eql(60.12);
    });

    it('should return the MINIMUM humidity value', () => {
      expect(processedResponse.humidity.minimum).to.eql(52.12);
    });

    it('should return the MAXIMUM humidity value', () => {
      expect(processedResponse.humidity.maximum).to.eql(60.12);
    });

    it('should return the MEAN humidity value', () => {
      expect(processedResponse.humidity.mean).to.eql(56.667500000000004);
    });

    it('should return the LATEST Battery Voltage value', () => {
      expect(processedResponse.batteryVoltage.latest).to.eql(7.912);
    });

    it('should return the MINIMUM Battery Voltage value', () => {
      expect(processedResponse.batteryVoltage.minimum).to.eql(7.89);
    });

    it('should return the MAXIMUM Battery Voltage value', () => {
      expect(processedResponse.batteryVoltage.maximum).to.eql(8.214);
    });

    it('should return the MEAN Battery Voltage value', () => {
      expect(processedResponse.batteryVoltage.mean).to.eql(8.0495);
    });

    it('should return the LATEST Battery Temperature value', () => {
      expect(processedResponse.batteryTemperature.latest).to.eql(25.24);
    });

    it('should return the MINIMUM Battery Temperature value', () => {
      expect(processedResponse.batteryTemperature.minimum).to.eql(22.11);
    });

    it('should return the MAXIMUM Battery Temperature value', () => {
      expect(processedResponse.batteryTemperature.maximum).to.eql(25.24);
    });

    it('should return the MEAN Battery Temperature value', () => {
      expect(processedResponse.batteryTemperature.mean).to.eql(23.955);
    });

    it('should return the LATEST Solar Voltage value', () => {
      expect(processedResponse.solarVoltage.latest).to.eql(22.48);
    });

    it('should return the MINIMUM Solar Voltage value', () => {
      expect(processedResponse.solarVoltage.minimum).to.eql(20.118);
    });

    it('should return the MAXIMUM Solar Voltage value', () => {
      expect(processedResponse.solarVoltage.maximum).to.eql(22.48);
    });

    it('should return the MEAN Solar Voltage value', () => {
      expect(processedResponse.solarVoltage.mean).to.eql(21.26775);
    });

    it('should return the LATEST Charge Current value', () => {
      expect(processedResponse.chargeCurrent.latest).to.eql(4);
    });

    it('should return the MINIMUM Charge Current value', () => {
      expect(processedResponse.chargeCurrent.minimum).to.eql(4);
    });

    it('should return the MAXIMUM Charge Current value', () => {
      expect(processedResponse.chargeCurrent.maximum).to.eql(6);
    });

    it('should return the MEAN Charge Current value', () => {
      expect(processedResponse.chargeCurrent.mean).to.eql(5.25);
    });

    it('should return the LATEST VPD value', () => {
      expect(processedResponse.VPD.latest).to.eql(1.323695645169191);
    });

    it('should return the MINIMUM VPD value', () => {
      expect(processedResponse.VPD.minimum).to.eql(1.2529280358964967);
    });

    it('should return the MAXIMUM VPD value', () => {
      expect(processedResponse.VPD.maximum).to.eql(1.335938442425099);
    });

    it('should return the MEAN VPD value', () => {
      expect(processedResponse.VPD.mean).to.eql(1.2997994897910234);
    });
  });

  describe('Process and return chart data', () => {

    const stationModel = new StationModel(stationMock);
    const sensorService = new SensorService();
    const chartData = sensorService.getChartData(stationModel.getSensorData());

    it('should return an array of arrays containing the Air Temperature chart values', () => {
      expect(chartData.airTemperature.length).to.eql(4);
    });

    it('should return an array of arrays containing the Soil Temperature chart values', () => {
      expect(chartData.soilTemperature.length).to.eql(4);
    });

    it('should return an array of arrays containing the Air Pressure chart values', () => {
      expect(chartData.airPressure.length).to.eql(4);
    });

    it('should return an array of arrays containing the Soil Moisture chart values', () => {
      expect(chartData.soilMoisture.length).to.eql(4);
    });

    it('should return an array of arrays containing the Leaf Wetness chart values', () => {
      expect(chartData.leafWetness.length).to.eql(4);
    });

    it('should return an array of arrays containing the PAR chart values', () => {
      expect(chartData.PAR.length).to.eql(4);
    });

    it('should return an array of arrays containing the Humidity chart values', () => {
      expect(chartData.humidity.length).to.eql(4);
    });

    it('should return an array of arrays containing the Battery Voltage chart values', () => {
      expect(chartData.batteryVoltage.length).to.eql(4);
    });

    it('should return an array of arrays containing the Battery Temperature chart values', () => {
      expect(chartData.batteryTemperature.length).to.eql(4);
    });

    it('should return an array of arrays containing the Solar Voltage chart values', () => {
      expect(chartData.solarVoltage.length).to.eql(4);
    });

    it('should return an array of arrays containing the Charge Current chart values', () => {
      expect(chartData.chargeCurrent.length).to.eql(4);
    });

    it('should return an array of arrays containing the VPD chart values', () => {
      expect(chartData.VPD.length).to.eql(4);
    });

  });
});

import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import StationAction from '../../lib/actions/station';

const expect = ServerlessMochaPlugin.chai.expect;

const stationMock = require('../../mocks/form/station/valid.mock.json');

describe('GET /data/{stationId} - Get station submission', () => {

  let response, statusCode;

  // Before running the tests, send a request to the endpoint.
  before(function(done){

    StationAction.submit(stationMock)
      .then((body) => {
        const stationId = body.data.stationId;
        return StationAction.get(stationId)
      })
      .then((body) => {
        statusCode = 200;
        response = body;
        done();
      })
      .catch((error) => {
        statusCode = error.response.statusCode;
        response = error.response.body;
        done();
      });

  });

  it('should expect a 200 status code', (done) => {
    expect(statusCode).to.eql(200);
    done();
  });

  it('should expect a success status', (done) => {
    expect(response.message).to.eql('Success');
    done();
  });

  it('should return the processed response', () => {
    expect(response.data).to.have.property('altitude');
    expect(response.data).to.have.property('networkOperator');
    expect(response.data).to.have.property('signalStrength');
    expect(response.data).to.have.property('latitude');
    expect(response.data).to.have.property('hardwareVersion');
    expect(response.data).to.have.property('firmwareVersion');
    expect(response.data).to.have.property('stationId');
    expect(response.data).to.have.property('longitude');
    expect(response.data).to.have.property('timestamp');
    expect(response.data).to.have.property('sensors');
  });

  it('should return the Station altitude value', () => {
    expect(response.data.altitude).to.eql(169.09);
  });

  it('should return the Station network operator value', () => {
    expect(response.data.networkOperator).to.eql('63907');
  });

  it('should return the Station signal strength value', () => {
    expect(response.data.signalStrength).to.eql(26);
  });

  it('should return the Station hardware version value', () => {
    expect(response.data.hardwareVersion).to.eql('2.0-CG');
  });

  it('should return the Station firmware version value', () => {
    expect(response.data.firmwareVersion).to.eql('3.1');
  });

  it('should return the Station Id value', () => {
    expect(response.data.stationId).to.eql(996937517);
  });

  it('should return the Station longitude value', () => {
    expect(response.data.longitude).to.eql(35.20965);
  });

  it('should return the Station Sensor PAR processed data', () => {
    expect(response.data.sensors.PAR.latest).to.eql(790.0124621684174);
    expect(response.data.sensors.PAR.minimum).to.eql(771.3192095424604);
    expect(response.data.sensors.PAR.maximum).to.eql(790.0124621684174);
    expect(response.data.sensors.PAR.mean).to.eql(782.7428639249896);
  });

  it('should return the Station Sensor Air Temperature processed data', () => {
    expect(response.data.sensors.airTemperature.latest).to.eql(24.82);
    expect(response.data.sensors.airTemperature.minimum).to.eql(22.86);
    expect(response.data.sensors.airTemperature.maximum).to.eql(24.82);
    expect(response.data.sensors.airTemperature.mean).to.eql(23.55333333333333);
  });

  it('should return the Station Sensor Soil Moisture processed data', () => {
    expect(response.data.sensors.soilMoisture.latest).to.eql(13.89145996093749);
    expect(response.data.sensors.soilMoisture.minimum).to.eql(9.831879882812489);
    expect(response.data.sensors.soilMoisture.maximum).to.eql(13.89145996093749);
    expect(response.data.sensors.soilMoisture.mean).to.eql(11.490205078124989);
  });

  it('should return the Station Sensor Air Pressure processed data', () => {
    expect(response.data.sensors.airPressure.latest).to.eql(825);
    expect(response.data.sensors.airPressure.minimum).to.eql(794);
    expect(response.data.sensors.airPressure.maximum).to.eql(825);
    expect(response.data.sensors.airPressure.mean).to.eql(806.6666666666666);
  });

  it('should return the Station Sensor Battery Voltage processed data', () => {
    expect(response.data.sensors.batteryVoltage.latest).to.eql(7.89);
    expect(response.data.sensors.batteryVoltage.minimum).to.eql(7.89);
    expect(response.data.sensors.batteryVoltage.maximum).to.eql(8.214);
    expect(response.data.sensors.batteryVoltage.mean).to.eql(8.095333333333334);
  });

  it('should return the Station Sensor Battery Temperature processed data', () => {
    expect(response.data.sensors.batteryTemperature.latest).to.eql(24.58);
    expect(response.data.sensors.batteryTemperature.minimum).to.eql(22.11);
    expect(response.data.sensors.batteryTemperature.maximum).to.eql(24.58);
    expect(response.data.sensors.batteryTemperature.mean).to.eql(23.526666666666667);
  });

  it('should return the Station Sensor VPD processed data', () => {
    expect(response.data.sensors.VPD.latest).to.eql(1.2866358356733076);
    expect(response.data.sensors.VPD.minimum).to.eql(1.2529280358964967);
    expect(response.data.sensors.VPD.maximum).to.eql(1.335938442425099);
    expect(response.data.sensors.VPD.mean).to.eql(1.291834104664968);
  });

  it('should return the Station Sensor Solar Voltage processed data', () => {
    expect(response.data.sensors.solarVoltage.latest).to.eql(21.229);
    expect(response.data.sensors.solarVoltage.minimum).to.eql(20.118);
    expect(response.data.sensors.solarVoltage.maximum).to.eql(21.244);
    expect(response.data.sensors.solarVoltage.mean).to.eql(20.863666666666663);
  });

  it('should return the Station Sensor Air Temperature processed data', () => {
    expect(response.data.sensors.airTemperature.latest).to.eql(24.82);
    expect(response.data.sensors.airTemperature.minimum).to.eql(22.86);
    expect(response.data.sensors.airTemperature.maximum).to.eql(24.82);
    expect(response.data.sensors.airTemperature.mean).to.eql(23.55333333333333);
  });

  it('should return the Station Sensor Charge Current processed data', () => {
    expect(response.data.sensors.chargeCurrent.latest).to.eql(5);
    expect(response.data.sensors.chargeCurrent.minimum).to.eql(5);
    expect(response.data.sensors.chargeCurrent.maximum).to.eql(6);
    expect(response.data.sensors.chargeCurrent.mean).to.eql(5.666666666666667);
  });

  it('should return the Station Sensor Soil Temperature processed data', () => {
    expect(response.data.sensors.soilTemperature.latest).to.eql(21.44);
    expect(response.data.sensors.soilTemperature.minimum).to.eql(20.75);
    expect(response.data.sensors.soilTemperature.maximum).to.eql(21.44);
    expect(response.data.sensors.soilTemperature.mean).to.eql(21.13);
  });

  it('should return the Station Sensor Leaf Wetness processed data', () => {
    expect(response.data.sensors.leafWetness.latest).to.eql(98.0952380952381);
    expect(response.data.sensors.leafWetness.minimum).to.eql(95.14285714285714);
    expect(response.data.sensors.leafWetness.maximum).to.eql(100);
    expect(response.data.sensors.leafWetness.mean).to.eql(97.74603174603175);
  });

  it('should return the Station Sensor humidity processed data', () => {
    expect(response.data.sensors.humidity.latest).to.eql(59.01);
    expect(response.data.sensors.humidity.minimum).to.eql(52.12);
    expect(response.data.sensors.humidity.maximum).to.eql(59.01);
    expect(response.data.sensors.humidity.mean).to.eql(55.51666666666666);
  });


});

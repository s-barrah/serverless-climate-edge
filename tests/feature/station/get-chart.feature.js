import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import StationAction from '../../lib/actions/station';

const expect = ServerlessMochaPlugin.chai.expect;

const stationMock = require('../../mocks/form/station/valid.mock.json');

describe('GET /chart/{stationId} - Submit and Get Chart Data', () => {

  let response, statusCode;

  // Before running the tests, send a request to the endpoint.
  before(function(done){

    this.timeout(10000);

    StationAction.submit(stationMock)
      .then((results) => StationAction.getChart(results.data.stationId))
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

  it('should return the processed response', (done) => {
    expect(response.data).to.have.property('stationId');
    done();
  });

  it('should return the Station Id value', (done) => {
    expect(response.data.stationId).to.eql(996937517);
    done();
  });

  it('should return the Chart Par value', (done) => {
    expect(response.data.PAR.length > 0).to.eql(true);
    done();
  });

  it('should return the Chart Soil Moisture value', (done) => {
    expect(response.data.soilMoisture.length > 0).to.eql(true);
    done();
  });

  it('should return the Chart Air Pressure value', (done) => {
    expect(response.data.airPressure.length > 0).to.eql(true);
    done();
  });

  it('should return the Chart Battery Voltage value', (done) => {
    expect(response.data.batteryVoltage.length > 0).to.eql(true);
    done();
  });

  it('should return the Chart Battery Temperature value', (done) => {
    expect(response.data.batteryTemperature.length > 0).to.eql(true);
    done();
  });

  it('should return the Chart VPD value', (done) => {
    expect(response.data.VPD.length > 0).to.eql(true);
    done();
  });

  it('should return the Chart Solar Voltage value', (done) => {
    expect(response.data.solarVoltage.length > 0).to.eql(true);
    done();
  });

  it('should return the Chart Air Temperature value', (done) => {
    expect(response.data.airTemperature.length > 0).to.eql(true);
    done();
  });

  it('should return the Chart Charge Current value', (done) => {
    expect(response.data.chargeCurrent.length > 0).to.eql(true);
    done();
  });

  it('should return the Chart Soil Temperature value', (done) => {
    expect(response.data.soilTemperature.length > 0).to.eql(true);
    done();
  });

  it('should return the Chart Leaf Wetness value', (done) => {
    expect(response.data.leafWetness.length > 0).to.eql(true);
    done();
  });

  it('should return the Chart Humidity value', (done) => {
    expect(response.data.humidity.length > 0).to.eql(true);
    done();
  });

});

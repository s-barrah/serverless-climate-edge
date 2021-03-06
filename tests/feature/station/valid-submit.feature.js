import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import StationAction from '../../lib/actions/station';

const expect = ServerlessMochaPlugin.chai.expect;

const stationMock = require('../../mocks/form/station/valid.mock.json');

describe('POST /data/{stationId} - Valid station data submission', () => {

  let response, statusCode;

  // Before running the tests, send a request to the endpoint.
  before(function(done){

    this.timeout(10000);

    StationAction.submit(stationMock)
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
    expect(response.message).to.eql('Station data has been processed');
    done();
  });

  it('should return the Station altitude value', (done) => {
    expect(response.data.altitude).to.eql(169.09);
    done();
  });

  it('should return the Station network operator value', (done) => {
    expect(response.data.networkOperator).to.eql('63907');
    done();
  });

  it('should return the Station signal strength value', (done) => {
    expect(response.data.signalStrength).to.eql(26);
    done();
  });

  it('should return the Station hardware version value', (done) => {
    expect(response.data.hardwareVersion).to.eql('2.0-CG');
    done();
  });

  it('should return the Station firmware version value', (done) => {
    expect(response.data.firmwareVersion).to.eql('3.1');
    done();
  });

  it('should return the Station station Id value', (done) => {
    expect(response.data.stationId).to.eql(996937517);
    done();
  });

  it('should return the Station longitude value', (done) => {
    expect(response.data.longitude).to.eql(35.20965);
    done();
  });


});

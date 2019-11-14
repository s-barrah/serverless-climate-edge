import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import StationAction from '../../lib/actions/station';

const expect = ServerlessMochaPlugin.chai.expect;

describe('GET /data/{stationId} - Invalid station data submission', () => {

  let response, statusCode;

  // Before running the tests, send a request to the endpoint.
  before(function(done){

    StationAction.submit({})
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

  it('should expect a 400 status code', (done) => {
    expect(statusCode).to.eql(400);
    done();
  });

  it('should expect a success status', (done) => {
    expect(response.message).to.eql('required fields are missing');
    done();
  });

  it('Expect validation errors to be listed', (done) => {
    let validationErrors = response.validation_errors;
    expect(validationErrors.stationId[0]).to.eql('Station id can\'t be blank');
    expect(validationErrors.hardwareVersion[0]).to.eql('Hardware version can\'t be blank');
    expect(validationErrors.firmwareVersion[0]).to.eql('Firmware version can\'t be blank');
    expect(validationErrors.signalStrength[0]).to.eql('Signal strength can\'t be blank');
    expect(validationErrors.networkOperator[0]).to.eql('Network operator can\'t be blank');
    expect(validationErrors.latitude[0]).to.eql('Latitude can\'t be blank');
    expect(validationErrors.longitude[0]).to.eql('Longitude can\'t be blank');
    expect(validationErrors.altitude[0]).to.eql('Altitude can\'t be blank');
    done();
  });

});

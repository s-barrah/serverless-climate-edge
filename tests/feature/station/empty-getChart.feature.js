import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import StationAction from '../../lib/actions/station';

const expect = ServerlessMochaPlugin.chai.expect;


describe('GET /chart/{stationId} - Empty Get chart submission', () => {

  let response, statusCode;

  // Before running the tests, send a request to the endpoint.
  before(function(done){

    StationAction.getChart()
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

  it('should expect a 500 status code', (done) => {
    expect(statusCode).to.eql(500);
    done();
  });

  it('should expect a success status', (done) => {
    expect(response.message).to.eql('No station id provided');
    done();
  });

});

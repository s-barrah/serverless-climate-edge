import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import EntityAction from '../../lib/actions/entity';

const expect = ServerlessMochaPlugin.chai.expect;


describe('GET /users - get all users data from db', () => {

  let response, statusCode;

  // Before running the tests, send a request to the endpoint.
  before(function(done){
    EntityAction.getUsers()
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
    expect(response.message).to.eql('0 record found');
    done();
  });
});

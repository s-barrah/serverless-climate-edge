import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import fs from 'fs';

import FileUploadAction from '../../lib/actions/fileUpload';

const expect = ServerlessMochaPlugin.chai.expect;


describe('POST /upload - Empty file upload', () => {

  let response, statusCode;

  // Before running the tests, send a request to the endpoint.
  before(function(done){

    this.timeout(10000);

    FileUploadAction.upload({})
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
    expect(response.message).to.eql('No files found!');
    done();
  });


});

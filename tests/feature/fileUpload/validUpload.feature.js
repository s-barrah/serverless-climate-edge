import ServerlessMochaPlugin from 'serverless-mocha-plugin';

import fs from 'fs';

import FileUploadAction from '../../lib/actions/fileUpload';

const expect = ServerlessMochaPlugin.chai.expect;


const filePath = {
  plot: `${__dirname}/../../mocks/files/Lowell plot data.csv`,
  farmer: `${__dirname}/../../mocks/files/Farmer Data.csv`,
  children: `${__dirname}/../../mocks/files/Children Data.csv`,
};


describe('POST /upload - Valid files upload', () => {

  let response, statusCode;

  const formData = {
    plot: fs.createReadStream(filePath.plot),
    farmer: fs.createReadStream(filePath.farmer),
    children: fs.createReadStream(filePath.children),
  };

  // Before running the tests, send a request to the endpoint.
  before(function(done){

    this.timeout(10000);

    FileUploadAction.upload(formData)
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
    expect(response.message).to.eql('Successfully processed 3 files');
    done();
  });


});

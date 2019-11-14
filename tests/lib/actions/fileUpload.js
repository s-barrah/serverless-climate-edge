import request from 'request-promise';

const BASE_URL = process.env.STAGING_BASE_URL;


const filePath = {
  plot: `${__dirname}/../../mocks/files/Lowell plot data.csv`,
  farmer: `${__dirname}/../../mocks/files/Farmer Data.csv`,
  children: `${__dirname}/../../mocks/files/Children Data.csv`,
};


export default class FileUploadAction {

  static upload() {
    return new Promise((resolve, reject) => {
      request({
        method: 'POST',
        uri: BASE_URL + 'upload',
        formData: {
          attachments: [
            fs.createReadStream(filePath.plot),
            fs.createReadStream(filePath.farmer),
            fs.createReadStream(filePath.children),
          ],
        },
        json: true,
      })
        .then((body) => {
          resolve(body);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }
}

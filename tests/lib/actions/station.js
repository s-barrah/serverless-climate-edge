import request from 'request-promise';

const BASE_URL = process.env.STAGING_BASE_URL;

export default class StationAction {

  static submit(data = {}, stationId = '') {
    return new Promise((resolve, reject) => {
      const url = stationId !== '' ? BASE_URL + 'data' : BASE_URL + 'data/' + stationId;
      request({
        method: 'POST',
        uri: url,
        body: data,
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


  static get(stationId = '') {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        uri: BASE_URL + 'data/' + stationId,
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


  static getChart(stationId = '') {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        uri: BASE_URL + 'chart/' + stationId,
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

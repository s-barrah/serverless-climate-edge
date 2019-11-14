import request from 'request-promise';

const BASE_URL = process.env.STAGING_BASE_URL;

export default class EntityAction {

  static getAges() {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        uri: BASE_URL + 'ages',
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

  static getChildren() {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        uri: BASE_URL + 'children',
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

  static getPlots() {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        uri: BASE_URL + 'plots',
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

  static getUsers() {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        uri: BASE_URL + 'users',
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

  static getVarieties() {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        uri: BASE_URL + 'varieties',
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

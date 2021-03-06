import QueryString from 'querystring';
import validate from 'validate.js/validate';
import XML2JS from 'xml2js';
import useragent from 'useragent';

import DependencyAwareClass from '../DependencyInjection/DependencyAware.class';
import ResponseModel from '../Model/Response.model';
import { DEFINITIONS } from '../Config/Dependencies';

export const REQUEST_TYPES = {
  GET: 'GET',
  POST: 'POST',
};

// Define action specific error types
export const ERROR_TYPES = {
  VALIDATION_ERROR: new ResponseModel({}, 400, 'required fields are missing'),
};


/**
 * RequestService class
 */
export default class RequestService extends DependencyAwareClass {
  /**
   * Get a parameter from the request.
   * @param param
   * @param ifNull
   * @param requestType
   * @return {*}
   */
  get(param: string, ifNull = null, requestType = null) {
    const queryParams = this.getAll(requestType);

    if (queryParams === null) {
      return ifNull;
    }

    return typeof queryParams[param] !== 'undefined' ? queryParams[param] : ifNull;
  }

  /**
   * Get authorization token
   * @return {*}
   */
  getAuthorizationToken() {
    const { headers } = this.getContainer().getEvent();

    if (typeof headers.Authorization === 'undefined' && typeof headers.authorization === 'undefined') {
      return null;
    }

    const tokenParts = headers[typeof headers.Authorization === 'undefined' ? 'authorization' : 'Authorization'].split(' ');
    const tokenValue = tokenParts[1];

    if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
      return null;
    }

    return tokenValue;
  }

  /**
   * Get a path parameter
   * @param param  string|null
   * @param ifNull mixed
   * @return {*}
   */
  getPathParameter(param: string = null, ifNull = {}) {
    const event = this.getContainer().getEvent();

    // If no parameter has been requested, return all path parameters
    if (param === null && typeof event.pathParameters === 'object') {
      return event.pathParameters;
    }

    // If a specifc parameter has been requested, return the parameter if it exists
    if (typeof param === 'string' && typeof event.pathParameters === 'object' && event.pathParameters !== null && typeof event.pathParameters[param] !== 'undefined') {
      return event.pathParameters[param];
    }

    return ifNull;
  }

  /**
   * Get all request parameters
   * @param requestType
   * @return {{}}
   */
  getAll(requestType = null) {
    const event = this.getContainer().getEvent();

    if (event.httpMethod === 'GET' || requestType === REQUEST_TYPES.GET) {
      return typeof event.queryStringParameters !== 'undefined' ? event.queryStringParameters : {};
    }

    if (event.httpMethod === 'POST' || requestType === REQUEST_TYPES.POST) {
      let queryParams = {};

      if ((typeof event.headers['Content-Type'] !== 'undefined' && event.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') !== -1)
        || (typeof event.headers['content-type'] !== 'undefined' && event.headers['content-type'].indexOf('application/x-www-form-urlencoded') !== -1)) {
        queryParams = QueryString.parse(event.body);
      }

      if ((typeof event.headers['Content-Type'] !== 'undefined' && event.headers['Content-Type'].indexOf('application/json') !== -1)
        || (typeof event.headers['content-type'] !== 'undefined' && event.headers['content-type'].indexOf('application/json') !== -1)) {
        try {
          queryParams = JSON.parse(event.body);
        } catch (e) {
          queryParams = {};
        }
      }

      if ((typeof event.headers['Content-Type'] !== 'undefined' && event.headers['Content-Type'].indexOf('text/xml') !== -1)
        || (typeof event.headers['content-type'] !== 'undefined' && event.headers['content-type'].indexOf('text/xml') !== -1)) {
        XML2JS.parseString(event.body, ((err, result) => {
          if (err) {
            queryParams = {};
          } else {
            queryParams = result;
          }
        }));
      }
      if ((typeof event.headers['Content-Type'] !== 'undefined' && event.headers['Content-Type'].indexOf('multipart/form-data') !== -1)
        || (typeof event.headers['content-type'] !== 'undefined' && event.headers['content-type'].indexOf('multipart/form-data') !== -1)) {
        queryParams = this.parseMultiFormData();
      }
      return typeof queryParams !== 'undefined' ? queryParams : {};
    }

    return null;
  }

  /**
   * Fetch the request IP address
   * @return {*}
   */
  getIp() {
    const event = this.getContainer().getEvent();

    if (typeof event.requestContext !== 'undefined'
      && typeof event.requestContext.identity !== 'undefined'
      && typeof event.requestContext.identity.sourceIp !== 'undefined') {
      return event.requestContext.identity.sourceIp;
    }

    return null;
  }

  /**
   * Get user agent
   * @return {*}
   */
  getUserBrowserAndDevice() {
    const { headers } = this.getContainer().getEvent();
    let userAgent = null;

    if (typeof headers !== 'object') {
      return null;
    }

    Object.keys(headers).forEach((header) => {
      if (header.toUpperCase() === 'USER-AGENT') {
        userAgent = headers[header];
      }
    });

    if (userAgent === null) {
      return null;
    }

    try {
      const agent = useragent.parse(userAgent);
      const os = agent.os.toJSON();

      return {
        'browser-type': agent.family,
        'browser-version': agent.toVersion(),
        'device-type': agent.device.family,
        'operating-system': os.family,
        'operating-system-version': agent.os.toVersion(),
      };
    } catch (error) {
      console.log('user-agent-parsing-failed', error);

      return null;
    }
  }

  /**
   * Test a request against validation constraints
   * @param constraints
   * @return {Promise<any>}
   */
  validateAgainstConstraints(constraints: object) {

    return new Promise((resolve, reject) => {
      const validation = validate(this.getAll(), constraints);

      if (typeof validation === 'undefined') {
        resolve();
      } else {
        const validationErrorResponse = ERROR_TYPES.VALIDATION_ERROR;
        validationErrorResponse.setBodyVariable('validation_errors', validation);

        reject(validationErrorResponse);
      }
    });
  }

  /**
   * Fetch the request multipart form
   * @param useBuffer
   * @return {*}
   */
  parseForm(useBuffer: boolean) {
    const event = this.getContainer().getEvent();
    const boundary = this.getBoundary(event);

    const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('binary').trim() : event.body;

    const result = {};
    body
      .split(`${boundary}`)
      .forEach((item) => {

        if (item !== null) {
          if (/filename=".+"/g.test(item)) {
            result[item.match(/name=".+";/g)[0].slice(6, -2)] = {
              type: 'file',
              filename: item.match(/filename=".+"/g)[0].slice(10, -1),
              contentType: item.match(/Content-Type:\s.+/g)[0].slice(14),
              content: useBuffer ? Buffer.from(item.slice(item.search(/Content-Type:\s.+/g) + item.match(/Content-Type:\s.+/g)[0].length + 4, -4), 'binary')
                : item.slice(item.search(/Content-Type:\s.+/g) + item.match(/Content-Type:\s.+/g)[0].length + 4, -4),
            };
          } else if (/name=".+"/g.test(item)) {
            result[item.match(/name=".+"/g)[0].slice(6, -1)] = item.slice(item.search(/name=".+"/g) + item.match(/name=".+"/g)[0].length + 4, -4);
          }
        }
      });
    return result;
  }

  parseMultiFormData() {
    const prefixBoundary = '\r\n--';
    const delimData = '\r\n\r\n';

    const defaultResult = {files: {}, fields: {}};
    const split = (str, delim) => [
      str.substring(0, str.indexOf(delim)),
      str.substring(str.indexOf(delim) + delim.length)];

    const event = this.getContainer().getEvent();

    const boundary = prefixBoundary + this.getBoundary(event);

    if (!boundary || event.body === null) { return null;}
    return (event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('binary') : event.body)
      .split(boundary)
      .filter((item) => item.indexOf('Content-Disposition: form-data') !== -1)
      .map((item) => {

        const tmp = split(item, delimData);

        const header = tmp[0];
        let content = tmp[1];

        const name = header.match(/name="([^"]+)"/)[0];

        const result = {};
        result[name] = content;

        if (header.indexOf('filename') !== -1) {
          const filename = header.match(/filename="([^"]+)"/)[0];
          const contentType = header.match(/Content-Type: (.+)/)[0];

          if (!(contentType.indexOf('text') !== -1)) { // replace content with binary
            content = Buffer.from(content, 'binary');
          }
          result[name] = {
            type: 'file',
            filename: filename,
            contentType: contentType,
            content: content,
            size: content.length
          };
        }
        return result;
      })
      .reduce((accumulator, current) => Object.assign(accumulator, current), []);
  }

  /**
   * Fetch the request AWS event Records
   * @return {*}
   */
  getAWSRecords() {
    const event = this.getContainer().getEvent();
    const eventRecord = event.Records && event.Records[0];

    if (typeof event.Records !== 'undefined'
      && typeof event.Records[0] !== 'undefined'
      && typeof eventRecord.eventSource !== 'undefined') {
      return eventRecord;
    }
    return null;
  }


  getValueIgnoringKeyCase(object, key) {
    const foundKey = Object
      .keys(object)
      .find(currentKey => currentKey.toLocaleLowerCase() === key.toLowerCase());
    return object[foundKey];
  }

  getBoundary(event) {
    return this.getValueIgnoringKeyCase(event.headers, 'Content-Type').split('=')[1];
  }

  /**
   * Check to ensure that the request is authenticated
   * @param key
   * @return {Promise<any>}
   */
  isAuthenticatedRequest(key) {
    return new Promise((resolve, reject) => {
      if (key === process.env.INTERNAL_ACCESS_KEY) {
        return resolve();
      }

      return reject(new ResponseModel({}, 401, 'Request not authenticated'));
    });
  }
}

import { DependencyAwareClass, ResponseModel } from '../Wrapper';
import jwt from 'jsonwebtoken';
import jwks from 'jwks-rsa';

/**
 * Service Error Responses
 * @type {{ACCESS_DENIED}}
 */
export const ERROR_RESPONSES = {
  ACCESS_DENIED: new ResponseModel({}, 401, 'Access Denied'),
};

/**
 * Auth0Service class
 */
export default class Auth0Service extends DependencyAwareClass {
  /**
   * Authenticate Token
   * @param token
   * @return {Promise<any>}
   */
  authenticate(token) {
    return new Promise((resolve, reject) => {
      const options = {
        audience: process.env.AUTH0_CLIENT_ID,
        algorithms: ['RS256'],
      };

      jwt.verify(token, this._getSigningKey, options, ((error, decoded) => {
        if (error) {
          reject(ERROR_RESPONSES.ACCESS_DENIED);
        }

        resolve(decoded);
      }));
    });
  }

  /**
   * Get signing key from auth0
   * @param header
   * @param callback
   * @return {any}
   * @private
   */
  _getSigningKey(header, callback) {
    const client = jwks({
      trictSsl: true,
      jwksUri: process.env.AUTH0_CLIENT_PUBLIC_KEY_URL,
    });

    return client.getSigningKey(header.kid, ((error, key) => {
      callback(null, key.publicKey || key.rsaPublicKey);
    }));
  }
}

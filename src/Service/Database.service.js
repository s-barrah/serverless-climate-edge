import AWS from 'aws-sdk';

import {
  DependencyAwareClass,
  StatusModel,
  STATUS_TYPES,
} from '../Wrapper';


import { DEFINITIONS } from '../Config/Configuration';

AWS.config.update({
  region: "eu-west-1",
  endpoint: "http://localhost:8001"
});

const dynamoDb = new AWS.DynamoDB();

const documentClient = new AWS.DynamoDB.DocumentClient();

/*{
  region: 'localhost',
    endpoint: 'http://localhost:8000',
  accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
  secretAccessKey: 'DEFAULT_SECRET'
}*/
const tableName = process.env.STATION_TABLE;

/**
 * DatabaseService class
 */
export default class DatabaseService extends DependencyAwareClass {

  constructor(props) {
    super(props);
    const container = this.getContainer();
    this.Timer = container.get(DEFINITIONS.TIMER);
  }

  async create(params: Object) {
    console.log('transactionId', params.Item.transactionId);
    this.Timer.start('dynamoDb-create-item');
    await documentClient.put(params).promise();
    this.Timer.stop('dynamoDb-create-item');
    return true;
  }

  async update(params: Object) {
    this.Timer.start('dynamoDb-update-item');
    const result = await documentClient.update(params).promise();
    this.Timer.stop('dynamoDb-update-item');
    if (result.Attributes) {
      return result.Attributes;
    }
    return null;
  }


  async getEntries(tableName: string) {
    try {
      const params = {
        TableName: tableName,
      };
      console.log('Listing entries');
      this.Timer.start('dynamoDb-getting-entries');
      const result = await documentClient.query(params).promise();
      this.Timer.stop('dynamoDb-getting-entries');
      return result;
    } catch (e) {
      console.error(e);
    }
  }


  async getEntry(id: string, tableName: string) {
    console.log('stationId', id);
    const params = {
      TableName: tableName,
      Key: {
        stationId: id,
      }
    };
    this.Timer.start('dynamoDb-get-item');
    const result = await documentClient.get(params).promise();
    this.Timer.stop('dynamoDb-get-item');
    if (result.Item) {
      return result.Item;
    }
    return null;
  }


  async createEntry(data: Object, tableName: string) {
    try {
      const params = {
        TableName: tableName,
        Item: data,
      };
      console.log('Creating entry');
      return await this.create(params);
    } catch (e) {
      console.error(e);
    }
  }

  async delete(id: string, tableName: string) {
    const params = {
      TableName: tableName,
      Key: {
        transactionId: id,
      }
    };
    this.Timer.start('dynamoDb-delete-item');
    await documentClient.delete(params).promise();
    this.Timer.stop('dynamoDb-delete-item');
    return true;
  }

  /**
   * Check Table status
   * @param tableName
   * @return {Promise<any>}
   */
  checkStatus(tableName) {
    return new Promise((resolve, reject) => {
      this.Timer.start('dynamoDb-check-table-exist');
      dynamoDb.describeTable({
        TableName: tableName
      }, ((error) => {
        this.Timer.stop('dynamoDb-check-table-exist');
        const statusModel = new StatusModel('DYNAMODB', STATUS_TYPES.OK);
        if (error) {
          console.error(error);
          statusModel.setStatus(STATUS_TYPES.APPLICATION_FAILURE);
        }
        resolve(statusModel);
      }))
    });
  }


}


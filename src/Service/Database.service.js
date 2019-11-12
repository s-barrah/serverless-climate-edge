import AWS from 'aws-sdk';
import each from 'async/each';

import {
  DependencyAwareClass,
  StatusModel,
  STATUS_TYPES,
} from '../Wrapper';


import {DEFINITIONS, TABLE_DEFINITIONS, TABLES} from '../Config/Configuration';

const config = { region: "eu-west-1" };
if (process.env.STAGE === process.env.DYNAMODB_LOCAL_STAGE) {
  config.accessKeyId = process.env.DYNAMODB_LOCAL_ACCESS_KEY_ID; // local dynamodb accessKeyId
  config.secretAccessKey = process.env.DYNAMODB_LOCAL_SECRET_ACCESS_KEY; // local dynamodb secretAccessKey
  config.endpoint = process.env.DYNAMODB_LOCAL_ENDPOINT; // local dynamodb endpoint
}
AWS.config.update(config);

const dynamoDb = new AWS.DynamoDB();

const documentClient = new AWS.DynamoDB.DocumentClient();
/*

const TABLES = {
  AGE: 'serverless-climate-edge-age-dev',
  VARIETY: 'serverless-climate-edge-variety-dev',
  PLOT: 'serverless-climate-edge-plots-dev',
  CHILD: 'serverless-climate-edge-child-dev',
  USER: 'serverless-climate-edge-users-dev'
};
*/


/*{
  region: 'localhost',
    endpoint: 'http://localhost:8000',
  accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
  secretAccessKey: 'DEFAULT_SECRET'
}*/
// const tableName = process.env.STATION_TABLE;

/**
 * DatabaseService class
 */
export default class DatabaseService extends DependencyAwareClass {

  constructor(props) {
    super(props);
    const container = this.getContainer();
    this.Timer = container.get(DEFINITIONS.TIMER);
    this.newItem = null;
  }

  async create(params: Object) {

    console.log('stationId', params.Item.stationId);
    console.log('Id', params.Item.id);

    this.Timer.start(`dynamoDb-create-${params.TableName}-item`);
    await documentClient.put(params).promise();
    this.Timer.stop(`dynamoDb-create-${params.TableName}-item`);
  }

  async update(params: Object) {
    this.Timer.start(`dynamoDb-update-${params.TableName}-item`);
    const result = await documentClient.update(params).promise();
    this.Timer.stop(`dynamoDb-update-${params.TableName}-item`);
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
      this.Timer.start(`dynamoDb-getting-${params.TableName}-entries`);
      const results = await documentClient.scan(params).promise();
      this.Timer.stop(`dynamoDb-getting-${params.TableName}-entries`);
      return results.Items;

    } catch (error) {
      console.error(`query-error: ${error}`);
    }
  }


  async getEntry(key: object, tableName: string) {

    console.log('key: ', key);

    const params = {
      TableName: tableName,
      Key: key
    };
    this.Timer.start(`dynamoDb-get-${params.TableName}-item`);
    const result = await documentClient.get(params).promise();
    this.Timer.stop(`dynamoDb-get-${params.TableName}-item`);
    if (result.Item) {
      return result.Item;
    }
    return null;
  }


  async createEntry(data: Object, tableName) {
    try {
      const params = {
        TableName: tableName,
        Item: data,
      };
      console.log('Creating entry');
      await this.create(params);
    } catch (error) {
      console.error(`createEntry-error: ${error}`);
    }
  }

  async delete(key: object, tableName: string) {

    try {
      const params = {
        TableName: tableName,
        Key: key
      };
      this.Timer.start(`dynamoDb-delete-${params.TableName}-item`);
      await documentClient.delete(params).promise();
      this.Timer.stop(`dynamoDb-delete-${params.TableName}-item`);
      return true;
    } catch (error) {
      console.error(`delete-error: ${error}`);
    }
  }

  async query(params) {

    try {
      this.Timer.start(`dynamoDb-query-${params.TableName}-item`);
      const results = await documentClient.query(params).promise();
      this.Timer.stop(`dynamoDb-query-${params.TableName}-item`);
      return results;
    } catch (error) {
      console.error(`query-error-${params.TableName}: ${error}`);
    }
  }

  /**
   * Check Table status
   * @param tableName
   * @return {Promise<any>}
   */
  checkStatus(tableName) {
    return new Promise((resolve, reject) => {
      this.Timer.start(`dynamoDb-check-${tableName}-exist`);
      dynamoDb.describeTable({
        TableName: tableName
      }, ((error) => {
        this.Timer.stop(`dynamoDb-check-${tableName}-exist`);
        const statusModel = new StatusModel('DYNAMODB', STATUS_TYPES.OK);
        if (error) {
          console.error(error);
          statusModel.setStatus(STATUS_TYPES.APPLICATION_FAILURE);
        }
        resolve(statusModel);
      }))
    });
  }

  createBatchWrite(data) {
    this.data = data;
    return this.data.map((item) => {
      return {
        PutRequest: {
          Item: item,
        },
      };
    });
  }

  async batchWrite(data, tableName) {

    try {
      this.Timer.start(`dynamoDb-batch-write-${tableName}-items`);
      const params = {
        RequestItems: {
          [tableName]: data
        }
      };
      await documentClient.batchWrite(params).promise();
      this.Timer.stop(`dynamoDb-batch-write-${tableName}-items`);
    } catch (error) {
      console.log('tableName: ', tableName);
      console.log('data: ', data);
      console.error(`batch-write-items-error: ${error}`);
    }
  }

  /***
   * Function to create chunks arrays
   * from large arrays
   * @param array Array
   * @param size Int
   * @return {Array}
   */
  createChunks(array, size) {
    const listChunks = [];
    let batchIterator = 0;
    while (batchIterator < array.length) {
      listChunks.push(array.slice(batchIterator, batchIterator += size));
    }
    return listChunks;
  }

  async processBatches(data, table) {
    if (data) {
      const getNewItems = await this.getNewItems(data, table);

      if (getNewItems.length > 0) { // items do not exist in db
        if (getNewItems.length > 20) { // batch write items
          const batchWrites = this.createBatchWrite(getNewItems);
          const chunkArrays = this.createChunks(batchWrites, 20);
          await Promise.all(chunkArrays.map(async (chunk) => await this.batchWrite(chunk, table))); // batch items
        } else {
          await Promise.all(getNewItems.map(async (item) => await this.createEntry(item, table))); // single items
        }
      }
    }
  }

  async getNewItems(data, table) {
    return new Promise((resolve) => {
      const newItem = [];
      if (data && table) {
        each(data, (async (item, callback) => {
          const params = this.getQueryParams(item, table); // get query params
          const queryResults = await this.query(params); // query table

          if (queryResults.Items.length === 0 || queryResults.Count === 0 || queryResults.ScannedCount === 0) {
            newItem.push(item); // item does not exist in database
          }
          callback();

        }), ((err) => {
          resolve(newItem);
          this.newItem = newItem;

        }));
      } else {
        resolve(newItem);
      }

    });

  }


  getQueryParams(item, table) {
    this.table = table;

    switch (this.table) {
      case TABLES.AGE_TABLE:
        return {
          TableName: table,
          KeyConditionExpression : 'id = :idVal',
          FilterExpression : 'months = :monthsVal and years = :yearsVal',
          ExpressionAttributeValues : {
            ':idVal' : item.id,
            ':monthsVal' : item.months,
            ':yearsVal' : item.years,
          }
        };
      case TABLES.VARIETY_TABLE:
        return {
          TableName: table,
          KeyConditionExpression : 'id = :idVal and #name = :nameVal',
          FilterExpression : 'age = :ageVal',
          ExpressionAttributeNames : {
            '#name' : 'name'
          },
          ExpressionAttributeValues : {
            ':idVal' : item.id,
            ':nameVal' : item.name,
            ':ageVal' : item.age,
          }
        };
      case TABLES.PLOT_TABLE:
        return {
          TableName: table,
          KeyConditionExpression : 'title = :titleVal',
          FilterExpression : 'size = :sizeVal',
          ExpressionAttributeValues : {
            ':titleVal' : item.title,
            ':sizeVal' : item.size,
          }
        };
      case TABLES.CHILD_TABLE:
        return {
          TableName: table,
          KeyConditionExpression : 'fullName = :fullNameVal',
          FilterExpression : 'age = :ageVal',
          ExpressionAttributeValues : {
            ':fullNameVal' : item.fullName,
            ':ageVal' : item.age,
          }
        };
      case TABLES.USER_TABLE:
        return {
          TableName: table,
          KeyConditionExpression : 'firstName = :firstNameVal and lastName = :lastNameVal',
          FilterExpression : 'partnerFullName = :partnerFullNameVal',
          ExpressionAttributeValues : {
            ':firstNameVal' : item.firstName,
            ':lastNameVal' : item.lastName,
            ':partnerFullNameVal' : item.partnerFullName,
          }
        };
      default:
        return null;
    }
  }


}


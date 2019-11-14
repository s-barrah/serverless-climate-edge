
import AgeModel from '../Model/Age.model';

import DatabaseService from '../Service/Database.service';

import { removeDuplicates } from '../lib/Util';
import { TABLES } from "../Config/Configuration";

export default class AgeResolver {

  constructor(di) {
    this.di = di;
    this.table = TABLES.AGE_TABLE;
  }


  /**
   * Function to get all ages
   * data from raw data
   * @return {Promise<*>}
   */
  getRawData() {

    // Get all age values
    const ages = this.data.map((item, index) => {
      const age = item['Age'] ? item['Age'] : item['Child\'s Age'];
      const unit = item['Unit'] === 'Year' || item['Age Units'] === 'Years' ? 'years' : 'months';
      return { [unit]: age }
    });
    // clean up results
    const filteredAges = ages.filter((item) => item.years !== undefined || item.months !== undefined);

    const results =  removeDuplicates(filteredAges); // remove duplicates

    // enrich data
    return results.map((age, index) => {
      const data = new AgeModel().hydrateFromEntity(age).getEntityMappings();
      data.id = index + 1;
      return data;
    });
  }

  /**
   * Function to get all data
   * from the database
   * @return {Promise<*|void>}
   */
  async getAll() {
    return await new DatabaseService(this.di).getEntries(this.table);
  }

  /**
   * Import data from file
   * @param data
   */
  importFromFile(data) {
    this.data = data;
  }
}

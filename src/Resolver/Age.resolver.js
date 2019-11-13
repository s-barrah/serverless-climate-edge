
import {
  DependencyAwareClass,
  StatusModel,
  STATUS_TYPES,
} from '../Wrapper';

import AgeModel from '../Model/Age.model';

import DatabaseService from '../Service/Database.service';

import { removeDuplicates } from '../lib/Util';
import {DEFINITIONS, TABLE_DEFINITIONS, TABLES} from "../Config/Configuration";

export default class AgeResolver {

  constructor(di) {
    this.di = di;

    this.table = TABLES.AGE_TABLE;
  }

  getRawData() {

    // Get all age values
    const ages = this.data.map((item) => {
      const age = item['Age'] ? item['Age'] : item['Child\'s Age'];
      const unit = item['Unit'] === 'Year' || item['Age Units'] === 'Years' ? 'years' : 'months';
      return { [unit]: age }
    });

    // clean up results
    const filtered = ages.filter((item) => item.years !== undefined || item.months !== undefined);

    // enrich data
    const results = filtered.map((age) => new AgeModel().hydrateFromEntity(age).getEntityMappings());

    return removeDuplicates(results);
  }

  async getAll() {
    const databaseService = new DatabaseService(this.di);

    return await databaseService.getEntries(this.table);
    // Get all age values
    /*const ages = this.data.map((item) => {
      const age = item['Age'] ? item['Age'] : item['Child\'s Age'];
      const unit = item['Unit'] === 'Year' || item['Age Units'] === 'Years' ? 'years' : 'months';
      return { [unit]: age }
    });

    // clean up results
    const filtered = ages.filter((item) => item.years !== undefined || item.months !== undefined);

    // enrich data
    const results = filtered.map((age) => new AgeModel().hydrateFromEntity(age).getEntityMappings());

    return removeDuplicates(results);*/
  }

  importFromFile(data) {
    this.data = data;
  }
}

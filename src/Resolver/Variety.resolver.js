
import VarietyModel from '../Model/Variety.model';

import AgeResolver from "./Age.resolver";

import { removeDuplicates } from '../lib/Util';
import { TABLES } from "../Config/Configuration";
import DatabaseService from "../Service/Database.service";

export default class VarietyResolver {

  constructor(di) {
    this.di = di;
    this.table = TABLES.VARIETY_TABLE;
  }


  /**
   * Function to get all varieties
   * data from raw data
   * @return {Promise<*>}
   */
  async getRawData() {

    const ageResolver = new AgeResolver(this.di);
    const ages = await ageResolver.getAll();

    const varieties = this.data.map((item, index) => {
      const name = item['Coffee Variety'];
      const total = item['Plant Number - Total'];
      const plotName = item['Plot Name'];
      const age = item['Age'];
      const unit = item['Age Units'] === 'Years' ? 'years' : 'months';
      const filteredAges = ages.filter((obj) => obj[unit] === age);

      const data = new VarietyModel().hydrateFromEntity({
        id: index + 1,
        name: name,
        age: filteredAges[0] && filteredAges[0][unit] ? `${filteredAges[0][unit]} ${unit}` : 'N/A',
        percentage: total ? total : null,
      }).getEntityMappings();
      data.plotName = plotName ? plotName : null;
      return data;
    });
    const cleanedData =  removeDuplicates(varieties);
    return cleanedData.filter((item) => item.name !== undefined && item.name !== null);
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


import VarietyModel from '../Model/Variety.model';

import AgeResolver from "./Age.resolver";

import { removeDuplicates, removeDuplicateByProp } from '../lib/Util';
import {TABLE_DEFINITIONS, TABLES} from "../Config/Configuration";
import DatabaseService from "../Service/Database.service";

export default class VarietyResolver {

  constructor(di) {
    this.di = di;

    this.table = TABLES[TABLE_DEFINITIONS.VARIETY_TABLE];
  }

  formatVarieties(data) {
    const varieties = this.data.map((item) => {
      const name = item['Coffee Variety'];
      return {
        name: name,
      }
    });
    return varieties.filter((item) => item.name !== undefined);
  }

  filteredVarietyList() {
    return this.data.filter((item) => {
      return item['Coffee Variety'] !== undefined;
    });
  }

  async getRawData() {

    const ageResolver = new AgeResolver(this.di);
    const ages = await ageResolver.getAll();

    const varieties = this.data.map((item) => {
      const name = item['Coffee Variety'];
      const total = item['Plant Number - Total'];
      const plotName = item['Plot Name'];
      const age = item['Age'];
      const unit = item['Age Units'] === 'Years' ? 'years' : 'months';
      const filteredAges = ages.filter((obj) => obj[unit] === age);
      // const cleanedResults = removeDuplicates(filteredResults);
      /*const results = {
        name: name,
        age: cleanedResults[0] ? cleanedResults[0] : null,
        percentage: total ? total : null,
        plotName: plotName ? plotName : null,
      };*/
      const data = new VarietyModel().hydrateFromEntity({
        name: name,
        age: filteredAges[0] && filteredAges[0][unit] ? `${filteredAges[0][unit]} ${unit}` : 'N/A',
        percentage: total ? total : null,
      }).getEntityMappings();
      data.plotName = plotName ? plotName : null;
      /*return {
        name: name,
        age: filteredAges[0] && filteredAges[0][unit] ? filteredAges[0][unit] : 'N/A',
        percentage: total ? total : null,
        plotName: plotName ? plotName : null,
      };*/
      return data;
    });
    const cleanedData =  removeDuplicates(varieties);
    // console.log('cleanedData: ', cleanedData);
    return cleanedData.filter((item) => item.name !== undefined && item.name !== null);
  }

  async getCleanedData() {
    const varieties = await this.getRawData();


    // const cleanedData =  removeDuplicates(varieties)
    return varieties.map((variety) => {
      const data = new VarietyModel().hydrateFromEntity({
        name: variety.name,
        age: variety.age ? variety.age : null,
        percentage: variety.percentage ? variety.percentage : null,
      }).getEntityMappings();
      data.plotName = variety.plotName ? variety.plotName : null;
      /*return {
        name: variety.name,
        age: variety.age ? variety.age : null,
        percentage: variety.percentage ? variety.percentage : null,
      };*/
      return data;
    });

    // return cleanedData;
  }

  async getAll() {
    const databaseService = new DatabaseService(this.di);

    return await databaseService.getEntries(this.table);
  }

  importFromFile(data) {
    this.data = data;
  }

}

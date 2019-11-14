
import PlotModel from '../Model/Plot.model';

import VarietyResolver from '../Resolver/Variety.resolver';


import { removeDuplicates } from '../lib/Util';
import { TABLES } from "../Config/Configuration";
import DatabaseService from "../Service/Database.service";

export default class PlotResolver {

  constructor(di) {
    this.di = di;

    this.table = TABLES.PLOT_TABLE;
  }

  getPlots() {
    const results = this.data.map((item) => {
      const size = item['Farm Size'] ? `${item['Farm Size']} ${item['Size Units']}` : null;
      return {
        title : item['Plot Name'],
        size : size
      }
    });
    const cleanedResults = results.filter((plot) => plot.title !== undefined);
    return removeDuplicates(cleanedResults);
  }


  /**
   * Function to get all plots
   * data from raw data
   * @return {Promise<*>}
   */
  async getRawData() {
    const varietyResolver = new VarietyResolver(this.di);
    const varieties = await varietyResolver.getAll();

    return this.getPlots().map((plot) => {
      const getVarieties = varieties.filter((variety) => variety.plotName === plot.title);

      const filteredVarietyList = this.getFilteredVarieties(getVarieties);
      const entity = {
        title: plot.title,
        size: plot.size,
        varieties: filteredVarietyList ? filteredVarietyList : null
      };
      return new PlotModel().hydrateFromEntity(entity).getEntityMappings();
    });
  }

  getFilteredVarieties(data) {
    this.data = data;
    return data.map((variety) => {
      return {
        name: variety.name,
        age: variety.age ? variety.age : null,
        percentage: variety.percentage ? variety.percentage : null,
      }
    });
  }


  /**
   * Function to get all data
   * from the database
   * @return {Promise<*|void>}
   */
  async getAll() {
    const databaseService = new DatabaseService(this.di);

    return await databaseService.getEntries(this.table);
  }


  /**
   * Import data from file
   * @param data
   */
  importFromFile(data) {
    this.data = data;
  }


}

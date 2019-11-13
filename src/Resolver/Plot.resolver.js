
import PlotModel from '../Model/Plot.model';
import VarietyModel from '../Model/Variety.model';

import VarietyResolver from '../Resolver/Variety.resolver';


import { removeDuplicates, removeDuplicateByProp } from '../lib/Util';
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

  async getRawData() {
    const varietyResolver = new VarietyResolver(this.di);
    const varieties = await varietyResolver.getAll();

    console.log('Plot resolver varieties.length: ', varieties.length);

    return this.getPlots().map((plot) => {
      const getVarieties = varieties.filter((variety) => variety.plotName === plot.title);
      // console.log('Plot resolver getVarieties: ', getVarieties);
      console.log('Plot resolver getVarieties.length: ', getVarieties.length);
      const filteredVarietyList = this.getFilteredVarieties(getVarieties);
      // console.log('Plot resolver formattedList: ', formattedList);
      const filteredVarieties = getVarieties.filter((variety) => {
        return {
          name: variety.name,
          age: variety.age ? variety.age : null,
          percentage: variety.percentage ? variety.percentage : null,
        }
      });
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
    // return data.map((variety) => new VarietyModel().hydrateFromEntity(variety).getEntityMappings());
  }
  /*
  getEnrichedVarieties(data) {
    return data.map((variety) => new VarietyModel().hydrateFromEntity(variety).getEntityMappings());
  }
*/
  async getAll() {
    const databaseService = new DatabaseService(this.di);

    return await databaseService.getEntries(this.table);
  }

  importFromFile(data) {
    this.data = data;
  }


}

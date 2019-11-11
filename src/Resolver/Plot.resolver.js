
import PlotModel from '../Model/Plot.model';
import VarietyModel from '../Model/Variety.model';

import VarietyResolver from '../Resolver/Variety.resolver';


import { removeDuplicates, removeDuplicateByProp } from '../lib/Util';

export default class PlotResolver {

  constructor(data) {
    this.data = data;
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

  getEnrichedPlots() {
    const varietyResolver = new VarietyResolver(this.data);
    const varieties = varietyResolver.getVarieties();
    return this.getPlots().map((plot) => {
      const getVarieties = varieties.filter((variety) => variety.plotName === plot.title);
      const formattedList = this.getFormattedList(getVarieties);
      return {
        title: plot.title,
        size: plot.size,
        varieties: formattedList ? formattedList : null
      };
    });
  }

  getFormattedList(data) {
    return data.map((variety) => new VarietyModel().hydrateFromEntity(variety).getEntityMappings());
  }

}

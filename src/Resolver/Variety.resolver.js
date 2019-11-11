
import VarietyModel from '../Model/Variety.model';

import AgeResolver from "./Age.resolver";

import { removeDuplicates } from '../lib/Util';

export default class VarietyResolver {

  constructor(data) {
    this.data = data;
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

  getVarieties() {

    const ageResolver = new AgeResolver(this.data);
    const ages = ageResolver.getAges();

    const varieties = this.data.map((item) => {
      this.name = item['Coffee Variety'];
      const total = item['Plant Number - Total'];
      const plotName = item['Plot Name'];
      const age = item['Age'];
      const unit = item['Age Units'] === 'Years' ? 'years' : 'months';
      const filteredResults = ages.filter((obj) => obj[unit] === age);
      const cleanedResults = removeDuplicates(filteredResults);

      return {
        name: this.name,
        plotName: plotName ? plotName : null,
        age: cleanedResults[0] ? cleanedResults[0] : null,
        percentage: total ? total : null,
      }
    });
    return varieties.filter((item) => item.name !== undefined);
  }

  getFormattedVarieties() {
    return this.getVarieties().map((variety) => {
      return {
        name: variety.name,
        age: variety.age ? variety.age : null,
        percentage: variety.percentage ? variety.percentage : null,
      };
    });
  }
}

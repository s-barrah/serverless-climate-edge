import AgeModel from '../Model/Age.model';

import { removeDuplicates } from '../lib/Util';

export default class AgeResolver {

  constructor(data) {
    this.data = data;
  }

  getAges() {

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
}

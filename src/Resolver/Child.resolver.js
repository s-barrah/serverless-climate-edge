
import ChildModel from '../Model/Child.model';

import AgeResolver from '../Resolver/Age.resolver';

import { removeDuplicates } from '../lib/Util';

export default class ChildResolver {

  constructor(data) {
    this.data = data;
  }

  getChildren() {
    const ageResolver = new AgeResolver(this.data);
    const ages = ageResolver.getAges();

    const children = this.data.map((child) => {
      const name = child['Child\'s Name'];
      const father = child['Farmer Name'];
      const age = child['Child\'s Age'];

      const unit = child['Unit'] === 'Year' ? 'years' : 'months';
      const getAges = ages.filter((obj) => {
        return obj[unit] === age;
      });

      const cleanedAges = removeDuplicates(getAges);

      // GET HYDRATED DATA
      const data = new ChildModel().hydrateFromEntity({
        fullName: name,
        age: cleanedAges[0] ? cleanedAges[0] : null,
      }).getEntityMappings();

      data.father = father ? father : null;

      return data;
    });
    return children.filter((child) => child.fullName !== undefined);
  }

  getFormattedChildren() {
    return this.getChildren().map((child) => {
      return {
        id: child.id,
        fullName: child.fullName,
        age: child.age,
      }
    });
  }


}

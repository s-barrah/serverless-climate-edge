
import ChildModel from '../Model/Child.model';

import AgeResolver from '../Resolver/Age.resolver';

import { removeDuplicates } from '../lib/Util';

export default class ChildResolver {

  constructor(data) {
    this.data = data;
  }
/*
  formatChildren() {
    const children = this.data.map((item) => {
      const name = item['Child\'s Name'];
      const father = item['Farmer Name'];
      return {
        fullName: name,
        father: father ? father : null,
      }
    });
    return children.filter((item) => item.fullName !== undefined);
  }

  filteredChildrensList() {
    return this.data.filter((item) => item['Child\'s Name'] !== undefined);
  }*/

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

      return {
        fullName: name,
        age: cleanedAges[0] ? cleanedAges[0] : null,
        father: father ? father : null,
      }
    });
    return children.filter((child) => child.fullName !== undefined);
  }
/*
  enrichData() {
    const ageResolver = new AgeResolver(this.data);
    const ages = ageResolver.getAges();

    const data = this.filteredChildrensList();

    return this.filteredChildrensList().map((item) => {
      const name = item['Child\'s Name'];
      const father = item['Farmer Name'];
      const age = item['Child\'s Age'];

      const unit = item['Unit'] === 'Year' ? 'years' : 'months';
      const getAges = ages.filter((obj) => {
        return obj[unit] === age;
      });

      const cleanedAges = removeDuplicates(getAges);

      return {
        fullName: name,
        age: cleanedAges[0] ? cleanedAges[0] : null,
        father: father ? father : null,
      };
    });
  }*/
/*

  getChildrenData() {

    const ageResolver = new AgeResolver(this.data);

    return this.enrichedChildrensData(
      this.formatChildren(), //
      this.filteredChildrensList(), // filter child
      ageResolver.getAges() // get all ages
    );
  }
*/

  getFormattedChildren() {
    return this.getChildren().map((child) => {
      return {
        fullName: child.fullName,
        age: child.age ? child.age : null,
      };
    });
  }
/*

  enrichedChildrensData(results, children, ages) {
    for ( let i = 0; i < results.length; i++) {
      for ( let j = 0; j < children.length; j++) {
        if (results[i].fullName === children[j]['Child\'s Name']) {
          const age = children[j]['Child\'s Age'];
          const unit = children[j]['Unit'] === 'Year' ? 'years' : 'months';
          const filtered = ages.filter((obj) => {
            return obj[unit] === age;
          });
          const filteredAge = removeDuplicates(filtered);
          results[i].age = filteredAge[0];
          results[i].father = children[j]['Farmer Name'];
        }
      }
    }
    return results;
  }

*/

}


import ChildModel from '../Model/Child.model';

import AgeResolver from '../Resolver/Age.resolver';

import { removeDuplicates } from '../lib/Util';
import { TABLES } from "../Config/Configuration";
import DatabaseService from "../Service/Database.service";

export default class ChildResolver {

  constructor(di) {
    this.di = di;

    this.table = TABLES.CHILD_TABLE;
  }

  async getChildren() {
    const ageResolver = new AgeResolver(this.di);
    const ages = await ageResolver.getAll();

    const children = this.data.map((child) => {
      const name = child['Child\'s Name'];
      const father = child['Farmer Name'];
      const age = child['Child\'s Age'];

      const unit = child['Unit'] === 'Year' ? 'years' : 'months';
      const filteredAges = ages.filter((obj) => obj[unit] === age);

      // const cleanedAges = removeDuplicates(getAges);

      // GET HYDRATED DATA
      const data = new ChildModel().hydrateFromEntity({
        fullName: name,
        age: filteredAges[0] && filteredAges[0][unit] ? `${filteredAges[0][unit]} ${unit}` : 'N/A',
      }).getEntityMappings();

      data.father = father ? father : null;

      return data;
    });
    return children.filter((child) => child.fullName !== null);
  }

  getFormattedList(data) {
    return data.map((child) => {
   /*   return {
        fullName: child.fullName,
        age: child.age,
      }*/
      return new ChildModel().hydrateFromEntity({
        fullName: child.fullName,
        age: child.age,
      }).getEntityMappings();
    });
  }

  async getAll() {
    const databaseService = new DatabaseService(this.di);

    return await databaseService.getEntries(this.table);
  }

  importFromFile(data) {
    this.data = data;
  }

}

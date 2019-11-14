
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


  /**
   * Function to get a childs age
   * @param data
   * @param age
   * @param unit
   * @return {*}
   */
  getChildsAge(data, age, unit) {
    if (data && age && unit) {
      const filteredAges = data.filter((obj) => obj[unit] === age);
      return filteredAges[0] && filteredAges[0][unit] ? `${filteredAges[0][unit]} ${unit}` : 'N/A'
    }
    return null;
  }

  /**
   * Function to get all children
   * data from raw data
   * @return {Promise<*>}
   */
  async getChildren() {
    const ageResolver = new AgeResolver(this.di);
    const ages = await ageResolver.getAll();

    const children = this.data.map((child) => {
      const name = child['Child\'s Name'];
      const father = child['Farmer Name'];
      const age = child['Child\'s Age'];

      const unit = child['Unit'] === 'Year' ? 'years' : 'months';
      const childsAge = this.getChildsAge(ages, age, unit);

      return {
        fullName: name,
        age: childsAge,
        father: father ? father : null,
      };
    });
    return children.filter((child) => child.fullName !== null);
  }

  /**
   * Function to hydrate children data
   * @param data
   * @return {*}
   */
  getFormattedList(data) {
    return data.map((child) => {
      return new ChildModel().hydrateFromEntity({
        fullName: child.fullName,
        age: child.age,
      }).getEntityMappings();
    });
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

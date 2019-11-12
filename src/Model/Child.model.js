import UUID from 'uuid/v4';

import { Model } from '../Wrapper';

/***
 * ChildModel
 */
export default class ChildModel extends Model {

  /**
   * ChildModel constructor
   */
  constructor() {
    super();

    this.id = null;
    this.fullName = null;
    this.age = null;
  }

  /**
   * Set Id
   * @param value
   */
  setId(value: string) {
    this.id = value && value.trim() !== '' ? value : null;
  }

  /**
   * Get Id
   * @return {null|*}
   */
  getId() {
    return this.id;
  }

  /**
   * Generate Id
   * @return {null|*}
   */
  generateId() {
    this.id = UUID();
    return this.id;
  }


  /**
   * Set Full Name
   * @param value
   */
  setFullName(value: string) {
    this.fullName = value && value.trim() !== '' ? value : null;
  }

  /**
   * Get Full Name
   * @return {null|*}
   */
  getFullName() {
    return this.fullName;
  }

  /**
   * Set Age
   * @param value
   */
  setAge(value: string) {
    this.age = value ? value : null;
  }

  /**
   * Get Age
   * @return {null|*}
   */
  getAge() {
    return this.age;
  }

  /**
   * Get Base entity mappings
   * @return {object}
   */
  getEntityMappings() {
    return {
      fullName: this.getFullName(),
      age: this.getAge(),
    };
  }

  /**
   * Hydrate the base model from a entity
   * @param entityDataValues object
   * @return {ChildModel}
   */
  hydrateFromEntity(entityDataValues) {
    this.instantiateFunctionWithDefinedValue('setFullName', entityDataValues.fullName);
    this.instantiateFunctionWithDefinedValue('setAge', entityDataValues.age);
    return this;
  }




}

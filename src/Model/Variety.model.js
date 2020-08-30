import { v4 as UUID } from 'uuid';

import { Model } from '../Wrapper';

/***
 * VarietyModel
 */
export default class VarietyModel extends Model {

  /**
   * VarietyModel constructor
   */
  constructor() {
    super();

    this.id = null;
    this.name = null;
    this.age = null;
    this.percentage = null;
  }


  /**
   * Set Id
   * @param value
   */
  setId(value: string) {
    this.id = value && value !== '' ? value : null;
  }

  /**
   * Get Id
   * @return {null|*}
   */
  getId() {
    return this.id !== null ? this.id : this.generateId();
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
   * Set Name
   * @param value
   */
  setName(value: string) {
    this.name = value !== '' ? value : null;
  }

  /**
   * Get Name
   * @return {null|*}
   */
  getName() {
    return this.name;
  }

  /**
   * Set Age
   * @param value
   */
  setAge(value: string) {
    this.age = value ? value : 'NULL';
  }

  /**
   * Get Age
   * @return {null|*}
   */
  getAge() {
    return this.age;
  }

  /**
   * Set Percentage
   * @param value
   */
  setPercentage(value: string) {
    this.percentage = value ? value : null;
  }

  /**
   * Get Percentage
   * @return {null|*}
   */
  getPercentage() {
    return this.percentage;
  }


  /**
   * Get Base entity mappings
   * @return {object}
   */
  getEntityMappings() {
    return {
      id: this.getId(),
      name: this.getName(),
      age: this.getAge(),
      percentage: this.getPercentage(),
    };
  }

  /**
   * Hydrate the base model from a entity
   * @param entityDataValues object
   * @return {VarietyModel}
   */
  hydrateFromEntity(entityDataValues) {
    this.instantiateFunctionWithDefinedValue('setId', entityDataValues.id);
    this.instantiateFunctionWithDefinedValue('setName', entityDataValues.name);
    this.instantiateFunctionWithDefinedValue('setAge', entityDataValues.age);
    this.instantiateFunctionWithDefinedValue('setPercentage', entityDataValues.percentage);
    return this;
  }




}

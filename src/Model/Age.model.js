import { Model } from '../Wrapper';
import UUID from "uuid/v4";

/***
 * AgeModel
 */
export default class AgeModel extends Model {

  /**
   * AgeModel constructor
   */
  constructor() {
    super();

    this.id = null;
    this.months = null;
    this.years = null;
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
   * Set Months
   * @param value
   */
  setMonths(value: string) {
    this.months = value ? value : null;
  }

  /**
   * Get Months
   * @return {null|*}
   */
  getMonths() {
    return this.months;
  }

  /**
   * Set Years
   * @param value
   */
  setYears(value: string) {
    this.years = value ? value : null;
  }

  /**
   * Get Years
   * @return {null|*}
   */
  getYears() {
    return this.years;
  }

  /**
   * Get Base entity mappings
   * @return {object}
   */
  getEntityMappings() {
    return {
      id: this.generateId(),
      months: this.getMonths(),
      years: this.getYears(),
    };
  }

  /**
   * Hydrate the base model from a entity
   * @param entityDataValues object
   * @return {AgeModel}
   */
  hydrateFromEntity(entityDataValues) {

    this.instantiateFunctionWithDefinedValue('setMonths', entityDataValues.months);
    this.instantiateFunctionWithDefinedValue('setYears', entityDataValues.years);
    return this;
  }




}

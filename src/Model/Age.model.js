import { Model } from '../Wrapper';

/***
 * AgeModel
 */
export default class AgeModel extends Model {

  /**
   * AgeModel constructor
   */
  constructor() {
    super();

    this.months = null;
    this.years = null;
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
    // console.log('entityDataValues: ', entityDataValues);

    this.instantiateFunctionWithDefinedValue('setMonths', entityDataValues.months);
    this.instantiateFunctionWithDefinedValue('setYears', entityDataValues.years);
    return this;
  }




}

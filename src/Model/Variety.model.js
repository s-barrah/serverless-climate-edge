import { Model } from '../Wrapper';

/***
 * VarietyModel
 */
export default class VarietyModel extends Model {

  /**
   * VarietyModel constructor
   */
  constructor(props) {
    super(props);

    this.name = null;
    this.age = null;
    this.percentage = null;
  }

  /**
   * Set Name
   * @param value
   */
  setName(value: string) {
    this.name = value && value.trim() !== '' ? value : null;
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
    this.instantiateFunctionWithDefinedValue('setName', entityDataValues.name);
    this.instantiateFunctionWithDefinedValue('setAge', entityDataValues.age);
    this.instantiateFunctionWithDefinedValue('setPercentage', entityDataValues.percentage);
    return this;
  }




}

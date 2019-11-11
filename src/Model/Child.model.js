import { Model } from '../Wrapper';

/***
 * ChildModel
 */
export default class ChildModel extends Model {

  /**
   * ChildModel constructor
   */
  constructor(props) {
    super(props);

    this.fullName = null;
    this.age = null;
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
    this.age = value && value.trim() !== '' ? value : null;
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

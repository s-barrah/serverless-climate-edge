import UUID from 'uuid/v4';

import { Model } from '../Wrapper';

/***
 * UserModel
 */
export default class UserModel extends Model {

  /**
   * UserModel constructor
   */
  constructor() {
    super();

    this.id = null;
    this.firstName = null;
    this.lastName = null;
    this.partnerFullName = null;
    this.children = null;
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
   * Set First Name
   * @param value
   */
  setFirstName(value: string) {
    this.firstName = value && value.trim() !== '' ? value : null;
  }

  /**
   * Get First Name
   * @return {null|*}
   */
  getFirstName() {
    return this.firstName;
  }

  /**
   * Set Last Name
   * @param value
   */
  setLastName(value: string) {
    this.lastName = value && value.trim() !== '' ? value : null;
  }

  /**
   * Get Last Name
   * @return {null|*}
   */
  getLastName() {
    return this.lastName;
  }

  /**
   * Set Partner Full Name
   * @param value
   */
  setPartnerFullName(value: string) {
    this.partnerFullName = value && value.trim() !== '' ? value : null;
  }

  /**
   * Get Partner Full Name
   * @return {null|*}
   */
  getPartnerFullName() {
    return this.partnerFullName;
  }

  /**
   * Set Children
   * @param value
   */
  setChildren(value: string) {
    this.children = value ? value : null;
  }

  /**
   * Get Children
   * @return {null|*}
   */
  getChildren() {
    return this.children;
  }


  /**
   * Get Base entity mappings
   * @return {object}
   */
  getEntityMappings() {
    return {
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      partnerFullName: this.getPartnerFullName(),
      children: this.getChildren(),
    };
  }

  /**
   * Hydrate the base model from a entity
   * @param entityDataValues object
   * @return {UserModel}
   */
  hydrateFromEntity(entityDataValues) {
    this.instantiateFunctionWithDefinedValue('setFirstName', entityDataValues.firstName);
    this.instantiateFunctionWithDefinedValue('setLastName', entityDataValues.lastName);
    this.instantiateFunctionWithDefinedValue('setPartnerFullName', entityDataValues.partnerFullName);
    this.instantiateFunctionWithDefinedValue('setChildren', entityDataValues.children);
    return this;
  }




}

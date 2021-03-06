import { v4 as UUID } from 'uuid';

import { Model } from '../Wrapper';

/***
 * PlotModel
 */
export default class PlotModel extends Model {

  /**
   * PlotModel constructor
   */
  constructor() {
    super();

    this.id = null;
    this.title = null;
    this.size = null;
    this.varieties = null;
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
   * Set Title
   * @param value
   */
  setTitle(value: string) {
    this.title = value !== '' ? value : null;
  }

  /**
   * Get Title
   * @return {null|*}
   */
  getTitle() {
    return this.title;
  }

  /**
   * Set Size
   * @param value
   */
  setSize(value: string) {
    this.size = value ? value : 'N/A';
  }

  /**
   * Get Size
   * @return {null|*}
   */
  getSize() {
    return this.size;
  }

  /**
   * Set Varieties
   * @param value
   */
  setVarieties(value: string) {
    this.varieties = value ? value : null;
  }

  /**
   * Get Varieties
   * @return {null|*}
   */
  getVarieties() {
    return this.varieties;
  }


  /**
   * Get Base entity mappings
   * @return {object}
   */
  getEntityMappings() {
    return {
      title: this.getTitle(),
      size: this.getSize(),
      varieties: this.getVarieties(),
    };
  }

  /**
   * Hydrate the base model from a entity
   * @param entityDataValues object
   * @return {PlotModel}
   */
  hydrateFromEntity(entityDataValues) {

    this.instantiateFunctionWithDefinedValue('setTitle', entityDataValues.title);
    this.instantiateFunctionWithDefinedValue('setSize', entityDataValues.size);
    this.instantiateFunctionWithDefinedValue('setVarieties', entityDataValues.varieties);
    return this;
  }




}

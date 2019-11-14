import UUID from 'uuid/v4';

import { Model } from '../Wrapper';

/***
 * SensorModel
 */
export default class SensorModel extends Model {

  /**
   * SensorModel constructor
   */
  constructor() {
    super();

    this._id = null;
    this._stationId = null;
    this._timestamp = null;
    this._air_temperature = null;
    this._soil_temperature = null;
    this._air_pressure = null;
    this._soil_moisture = null;
    this._leaf_wetness = null;
    this._par = null;
    this._humidity = null;
    this._battery_voltage = null;
    this._rainfall_sensor_battery_voltage = null;
    this._rainfall_drip_count = null;
    this._battery_temperature = null;
    this._solar_voltage = null;
    this._charge_current = null;
    this.thousandth = 1000;
  }


  dividedByThousand(value: number) {
    return value && value !== '' ? value / this.thousandth : null;
  }

  /**
   * Get Id
   * @return {null|*}
   */
  getId() {
    return this._id;
  }

  /**
   * Generate Id
   * @return {null|*}
   */
  generateId() {
    this._id = UUID();
    return this._id;
  }

  /**
   * Set Station Id
   * @param value
   */
  setStationId(value: number) {
    this._stationId = value !== '' ? value : null;
  }

  /**
   * Get Station Id
   * @return {null|*}
   */
  getStationId() {
    return this._stationId;
  }

  /**
   * Set Timestamp
   * @param value
   */
  setTimestamp(value: string) {
    this._timestamp = value && value.trim() !== '' ? value : null;
  }

  /**
   * Get Timestamp
   * @return {null|*}
   */
  getTimestamp() {
    return this._timestamp;
  }

  /**
   * Set Air Temperature
   * @param value
   */
  setAirTemperature(value: number) {
    this._air_temperature = value && value !== '' ? value : null;
  }

  /**
   * Get Air Temperature
   * @return {null|*}
   */
  getAirTemperature() {
    return this._air_temperature;
  }

  /**
   * Set Soil Temperature
   * @param value
   */
  setSoilTemperature(value: number) {
    this._soil_temperature = value && value !== '' ? value : null;
  }

  /**
   * Get Soil Temperature
   * @return {null|*}
   */
  getSoilTemperature() {
    return this._soil_temperature;
  }

  /**
   * Set Air Pressure
   * @param value
   */
  setAirPressure(value: number) {
    this._air_pressure = value && value !== '' ? value : null;
  }

  /**
   * Get Air Pressure
   * @return {null|*}
   */
  getAirPressure() {
    return this._air_pressure;
  }

  /**
   * Calculate Soil Moisture
   * @param value
   */
  calculateSoilMoisture(value: number) {
    this.value = value;
    const mV = (this.value / 4096) * 3300;
    return (0.000494 * mV - 0.554) * 100;
    // 0.000433 instead 0.000494 for non soil
  }

  /**
   * Set Soil Moisture
   * @param value
   */
  setSoilMoisture(value: number) {
    this._soil_moisture = value && value !== '' ? this.calculateSoilMoisture(value) : null;
  }

  /**
   * Get Soil Moisture
   * @return {null|*}
   */
  getSoilMoisture() {
    return this._soil_moisture;
  }

  /**
   * Calculate Leaf Wetness
   * @param value
   */
  calculateLeafWetness(value: number) {
    this.value = value;
    const min = 600; // dry
    const max = 1650; // saturated
    const range = (max - min) / 100;
    if (value <= min) {
      return 0;
    } else if (this.value >= max) {
      return 100;
    } else {
      return (this.value - min) / range;
    }
  }

  /**
   * Set Leaf Wetness
   * @param value
   */
  setLeafWetness(value: number) {
    this._leaf_wetness = value && value !== '' ? this.calculateLeafWetness(value) : null;
  }

  /**
   * Get Leaf Wetness
   * @return {null|*}
   */
  getLeafWetness() {
    return this._leaf_wetness;
  }

  /**
   * Calculate Par
   * @param value
   */
  calculatePar(value: number) {
    this.value = value;
    return (this.value / 11.234) * 5;
  }

  /**
   * Set Par
   * @param value
   */
  setPar(value: number) {
    this._par = value && value !== '' ? this.calculatePar(value) : null;
  }

  /**
   * Get Par
   * @return {null|*}
   */
  getPar() {
    return this._par;
  }

  /**
   * Set Humidity
   * @param value
   */
  setHumidity(value: number) {
    this._humidity = value && value !== '' ? value : null;
  }

  /**
   * Get Humidity
   * @return {null|*}
   */
  getHumidity() {
    return this._humidity;
  }

  /**
   * Set Battery Voltage
   * @param value
   */
  setBatteryVoltage(value: number) {
    this._battery_voltage = value && value !== '' ? this.dividedByThousand(value) : null;
  }

  /**
   * Get Battery Voltage
   * @return {null|*}
   */
  getBatteryVoltage() {
    return this._battery_voltage;
  }

  /**
   * Set Rainfall Sensor Battery Voltage
   * @param value
   */
  setRainfallSensorBatteryVoltage(value: number) {
    this._rainfall_sensor_battery_voltage = value && value !== '' ? this.dividedByThousand(value) : null;
  }

  /**
   * Get Rainfall Sensor Battery Voltage
   * @return {null|*}
   */
  getRainfallSensorBatteryVoltage() {
    return this._rainfall_sensor_battery_voltage;
  }

  calculateRainfallDripCount(value: number) {
    this.value = value;
    const dropToMIConversion = 1.75;
    const gaugeArea = 5500;
    const observeMI = this.value * dropToMIConversion;
    return (observeMI / gaugeArea) * 1000;
  }

  /**
   * Set Rainfall Drip Count
   * @param value
   */
  setRainfallDripCount(value: number) {
    this._rainfall_drip_count = value && value !== '' ? this.calculateRainfallDripCount(value) : null;
  }

  /**
   * Get Rainfall Drip Count
   * @return {null|*}
   */
  getRainfallDripCount() {
    return this._rainfall_drip_count;
  }

  /**
   * Set Battery Temperature
   * @param value
   */
  setBatteryTemperature(value: number) {
    this._battery_temperature = value && value !== '' ? value : null;
  }

  /**
   * Get Battery Temperature
   * @return {null|*}
   */
  getBatteryTemperature() {
    return this._battery_temperature;
  }

  /**
   * Set Solar Voltage
   * @param value
   */
  setSolarVoltage(value: number) {
    this._solar_voltage = this.dividedByThousand(value);
  }

  /**
   * Get Solar Voltage
   * @return {null|*}
   */
  getSolarVoltage() {
    return this._solar_voltage;
  }

  /**
   * Set Charge Current
   * @param value
   */
  setChargeCurrent(value: number) {
    this._charge_current = value && value !== '' ? value : null;
  }

  /**
   * Get Charge Current
   * @return {null|*}
   */
  getChargeCurrent() {
    return this._charge_current;
  }


  getVPD() {
    const T = this.getAirTemperature();
    const H = this.getHumidity();

    return ((6.1078 * Math.exp(17.08085 * T / (234.175 + T)))
      - (6.1078 * Math.exp(17.08085 * T / (234.175 + T)) * (H / 100))) / 10;
  }


  /**
   * Get Base entity mappings
   * @return {object}
   */
  getEntityMappings() {
    return {
      stationId: this.getStationId(),
      timestamp: this.getTimestamp(),
      airTemperature: this.getAirTemperature(),
      soilTemperature: this.getSoilTemperature(),
      airPressure: this.getAirPressure(),
      soilMoisture: this.getSoilMoisture(),
      leafWetness: this.getLeafWetness(),
      PAR: this.getPar(),
      rainfallSensorBatteryVoltage: this.getRainfallSensorBatteryVoltage(),
      rainfallDripCount: this.getRainfallDripCount(),
      humidity: this.getHumidity(),
      batteryVoltage: this.getBatteryVoltage(),
      batteryTemperature: this.getBatteryTemperature(),
      solarVoltage: this.getSolarVoltage(),
      chargeCurrent: this.getChargeCurrent(),
      VPD: this.getVPD(),
    };
  }


  /**
   * Hydrate the base model from a entity
   * @param entityDataValues object
   * @return {SensorModel}
   */
  hydrateFromEntity(entityDataValues) {
    this.instantiateFunctionWithDefinedValue('setStationId', entityDataValues.stationId);
    this.instantiateFunctionWithDefinedValue('setTimestamp', entityDataValues.timestamp);
    this.instantiateFunctionWithDefinedValue('setAirTemperature', entityDataValues.airTemperature);
    this.instantiateFunctionWithDefinedValue('setSoilTemperature', entityDataValues.soilTemperature);
    this.instantiateFunctionWithDefinedValue('setAirPressure', entityDataValues.airPressure);
    this.instantiateFunctionWithDefinedValue('setSoilMoisture', entityDataValues.soilMoisture);
    this.instantiateFunctionWithDefinedValue('setLeafWetness', entityDataValues.leafWetness);
    this.instantiateFunctionWithDefinedValue('setPar', entityDataValues.PAR);
    this.instantiateFunctionWithDefinedValue('setRainfallSensorBatteryVoltage', entityDataValues.rainfallSensorBatteryVoltage);
    this.instantiateFunctionWithDefinedValue('setRainfallDripCount', entityDataValues.rainfallDripCount);
    this.instantiateFunctionWithDefinedValue('setHumidity', entityDataValues.humidity);
    this.instantiateFunctionWithDefinedValue('setBatteryVoltage', entityDataValues.batteryVoltage);
    this.instantiateFunctionWithDefinedValue('setBatteryTemperature', entityDataValues.batteryTemperature);
    this.instantiateFunctionWithDefinedValue('setSolarVoltage', entityDataValues.solarVoltage);
    this.instantiateFunctionWithDefinedValue('setChargeCurrent', entityDataValues.chargeCurrent);
    return this;
  }






}

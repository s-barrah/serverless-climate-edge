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


  dividedByThousand(value: string) {
    return value && value !== '' ? value / this.thousandth : null;
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
  setAirTemperature(value: string) {
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
  setSoilTemperature(value: string) {
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
  setAirPressure(value: string) {
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
   * Set Soil Moisture
   * @param value
   */
  setSoilMoisture(value: string) {
    if (value && value !== '') {
      const mV = (value / 4096) * 3300;
      this._soil_moisture = (0.000494 * mV - 0.554) * 100;
      // 0.000433 instead 0.000494 for non soil
    } else {
      this._soil_moisture = null;
    }
  }

  /**
   * Get Soil Moisture
   * @return {null|*}
   */
  getSoilMoisture() {
    return this._soil_moisture;
  }


  /**
   * Set Leaf Wetness
   * @param value
   */
  setLeafWetness(value: string) {
    if (value && value !== '') {
      const min = 600; // dry
      const max = 1650; // saturated
      const range = (max - min) / 100;
      if (value <= min) {
        this._leaf_wetness = 0;
      } else if (value >= max) {
        this._leaf_wetness = 100;
      } else {
        this._leaf_wetness = (value - min) / range;
      }
    } else {
      this._leaf_wetness = null;
    }

  }

  /**
   * Get Leaf Wetness
   * @return {null|*}
   */
  getLeafWetness() {
    return this._leaf_wetness;
  }

  /**
   * Set Par
   * @param value
   */
  setPar(value: string) {
    if (value && value !== '') {
      this._par = (value / 11.234) * 5;
    } else {
      this._par = null;
    }
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
  setHumidity(value: string) {
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
  setBatteryVoltage(value: string) {
    this._battery_voltage = this.dividedByThousand(value);
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
  setRainfallSensorBatteryVoltage(value: string) {
    this._rainfall_sensor_battery_voltage = this.dividedByThousand(value);
  }

  /**
   * Get Rainfall Sensor Battery Voltage
   * @return {null|*}
   */
  getRainfallSensorBatteryVoltage() {
    return this._rainfall_sensor_battery_voltage;
  }

  /**
   * Set Rainfall Drip Count
   * @param value
   */
  setRainfallDripCount(value: string) {
    if (value && value !== '') {
      const dropToMIConversion = 1.75;
      const gaugeArea = 5500;
      const observeMI = value * dropToMIConversion;
      this._rainfall_drip_count = (observeMI / gaugeArea) * 1000;
    } else {
      this._rainfall_drip_count = null;
    }
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
  setBatteryTemperature(value: string) {
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
  setSolarVoltage(value: string) {
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
  setChargeCurrent(value: string) {
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

import { Model } from '../Wrapper';

import SensorModel from './Sensor.model';


/***
 * StationModel
 */
export default class StationModel extends Model {

  constructor(entity = null) {
    super();

    this._station_id = entity.stationId;
    this._hardware_version = entity.hardwareVersion;
    this._firmware_version = entity.firmwareVersion;
    this._signal_strength = entity.signalStrength;
    this._network_operator = entity.networkOperator;
    this._latitude = entity.latitude;
    this._longitude = entity.longitude;
    this._altitude = entity.altitude;
    this._sensor_data = [];

    // console.log('entity.data: ', entity.data);
    if (entity.data) {
      entity.data.forEach((sensorEntity) => {
        const sensorModel = new SensorModel().hydrateFromEntity(sensorEntity);
        this._sensor_data.push(sensorModel.getEntityMappings());
      })
    }
  }

  getStationId() {
    return this._station_id;
  }

  getHardwareVersion() {
    return this._hardware_version;
  }

  getFirmwareVersion() {
    return this._firmware_version;
  }

  getSignalStrength() {
    return this._signal_strength;
  }

  getNetworkOperator() {
    return this._network_operator;
  }

  getLatitude() {
    return this._latitude;
  }

  getLongitude() {
    return this._longitude;
  }

  getAltitude() {
    return this._altitude;
  }

  getSensorData() {
    return this._sensor_data;
  }

  /**
   * Get Base entity mappings
   * @return {object}
   */
  getEntityMappings() {
    return {
      stationId: this.getStationId(),
      hardwareVersion: this.getHardwareVersion(),
      firmwareVersion: this.getFirmwareVersion(),
      signalStrength: this.getSignalStrength(),
      networkOperator: this.getNetworkOperator(),
      latitude: this.getLatitude(),
      longitude: this.getLongitude(),
      altitude: this.getAltitude(),
    };
  }

}

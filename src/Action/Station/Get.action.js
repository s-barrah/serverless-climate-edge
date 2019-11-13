import {
  LambdaWrapper,
  DependencyInjection,
  RequestService,
  ResponseModel,
} from '../../Wrapper/index';


import CONFIGURATION, { DEFINITIONS, TABLES } from '../../Config/Configuration';

import SensorService from '../../Service/Sensor.service';


/***
 * Get chart data
 *
 * @api {get} /chart /chart
 * @apiName Get chart data
 * @apiGroup Station
 * @apiDescription Get chart data
 *
 *
 *
 */
export default LambdaWrapper(CONFIGURATION, async (di: DependencyInjection, request: RequestService, done) => {
  let response = {};

  const stationId = request.getPathParameter('stationId', null);

  if (stationId) {

    const id = parseInt(stationId, 10);

    const params = di.get(DEFINITIONS.DATABASE).getStationTableParam(TABLES.STATION_TABLE, id);
    const results = await di.get(DEFINITIONS.DATABASE).query(params);

    if (results && results.Items) {
      const sensorParams = di.get(DEFINITIONS.DATABASE).getStationTableParam(TABLES.SENSOR_TABLE, id);
      const stationSensors = await di.get(DEFINITIONS.DATABASE).query(sensorParams);

      const items =  stationSensors.Items ? stationSensors.Items : [];
      if (items.length > 0) {

        const sensorService = new SensorService();
        const processedResponse = sensorService.processedResponse(items);

        let storage = {
          ...results.Items[0],
          sensors: processedResponse,
        };
        response = new ResponseModel(storage, 200, 'Success');
      } else {
        response = new ResponseModel({}, 200, `No sensor data found for Station - ${id}`);
      }

    } else {
      response = new ResponseModel({}, 200, 'No records found');
    }
  } else {
    response = new ResponseModel({}, 500, 'No station id provided');
  }

  done(null, response.generate());
});

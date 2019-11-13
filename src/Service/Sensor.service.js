import { DependencyAwareClass } from '../Wrapper'


export default class SensorService extends DependencyAwareClass {


  getMinValue(data, prop) {
    // return data.reduce((min, p) => p[prop] < min ? p[prop] : min, data[0][prop]);
    return Math.min(...data.map(o => o[prop]));
  }


  getMaxValue(data, prop) {
    // return data.reduce((max, p) => p[prop] > max ? p[prop] : max, data[0][prop]);
    return Math.max(...data.map(o => o[prop]));
  }

  getMeanValue(data, prop) {
    return data.reduce((acc, c) => acc + c[prop], 0) / data.length
  }

  filterEmptyData(data) {
    return data.map((item) => {
      const results = {};
      Object.getOwnPropertyNames(item).forEach((prop) => {
        if (item[prop] !== null) {
          results[prop] = item[prop];
        }
      });
      return results;
    })
  }


  processedResponse(data) {
    let results = {};
    const latestData = this.getLatestData(data); // filter most recent data
    const filteredData = this.filterEmptyData(data); // remove empty properties

    Object.getOwnPropertyNames(filteredData[0]).forEach((prop) => {
      if (prop !== 'timestamp' && prop !== 'id' && prop !== 'stationId') {
        if (results[prop] === undefined) {
          results[prop] = {};
        }
        results[prop].latest = latestData[prop];
        results[prop].minimum = this.getMinValue(filteredData, prop);
        results[prop].maximum = this.getMaxValue(filteredData, prop);
        results[prop].mean = this.getMeanValue(filteredData, prop);
      }
    });
    return results;
  }

  getChartData(data) {
    let results = {};
    const processedData = this.processChartSensorData(data);

    Object.getOwnPropertyNames(processedData[0]).forEach((prop) => {
      if (prop !== 'timestamp' && prop !== 'id' && prop !== 'stationId') {
        results[prop] = this.getChartValues(processedData, prop);
      }
    });
    return results;
  }

  getChartValues(data, prop) {
    const results = [];
    Object.values(data).forEach((item) => {
      if (item[prop] !== null) {
        results.push([new Date(item.timestamp).getTime(), item[prop]]);
      }
    });
    // console.log('Results: ', results);

    return results;
  }

  convertToTimestamp(data) {
    return data.map((item) => {
      if (item.timestamp !== null) {
        item.timestamp = new Date(item.timestamp).getTime();
      }
      return item;
    })
  }

  processChartSensorData(data) {
    const filteredData = this.filterEmptyData(data); // remove empty properties
    const filtered = this.convertToTimestamp(filteredData); // convert date to unix timestamp

    // sort array by timestamp ascending order
    // .sort((a,b) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0))
    return filtered.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1);
  }


  getLatestData(data) {
    const latest = new Date(Math.max(...data.map( item => new Date(item.timestamp))));
    return data.filter( item => {
      let d = new Date( item.timestamp );
      return d.getTime() === latest.getTime();
    })[0];
  }

}

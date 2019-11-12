import XLSX from "xlsx";

export default class FileParserService {

  constructor() {
    this.file = null;
  }

  /***
   * Function to get data
   * from xlsx file
   * @param file
   * @return {*}
   */
  getFileData(file) {
    this.file = file;
    const workbook = XLSX.readFile(this.file); // Read file
    const sheetNameList = workbook.SheetNames; // Get sheet names
    const xlsData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]); // Get data as json object
    xlsData.shift(); // remove heading
    return xlsData;
  }

  /***
   * Function to get data
   * from xlsx file
   * @param data
   * @return {*}
   */
  getData(data) {
    this.data = data;
    const workbook = XLSX.read(this.data, {type: "string", raw: true }); // Read data
    const sheetNameList = workbook.SheetNames; // Get sheet names
    const xlsData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]); // Get data as json object
    xlsData.shift(); // remove heading
    return xlsData;
  }

  getFileContent(data) {
    /*return new Promise((resolve, reject) => {
      resolve(Object.values(data).map((file) => this.getData(file.content)).flat());
    })*/
    return Object.values(data).map((file) => this.getData(file.content)).flat();
  }

}

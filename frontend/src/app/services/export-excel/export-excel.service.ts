import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }

  exportToExcel(json: any[], excelFileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type:'array'});

    //llamar al metodo buffer y nombre
    this.saveAsExcel(excelBuffer, excelFileName);
  }

  private saveAsExcel(buffer:any, fileName:string){
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    const time = new Date().getTime()
    FileSaver.saveAs(data, `${fileName}_${time}${EXCEL_EXT}`);
  }
}

import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  public data: any;

  ngOnInit() {
    console.log('entra en el onInit');
    this.llamadoApi()
  }

  async llamadoApi() {
     await fetch('http://localhost:3001/getReservas')
      .then(response => response.json())
      .then(data => {
        console.log('data', data.reservas);
        this.data = data.reservas;
      });
  }

  async changeState(item){
    let url = `http://localhost:3001/updateState`;
      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          "idReserva": item.idReserva
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .catch(error => {
          console.log('error', error);

        })
        .then(response => {
           console.log('response', response); 
           if(response.error){
            alert(response.errorDescription)
           }else{
             console.log('se cambió el estado ');
             location.reload()
           }
           
          }
        );
  }

  exportAsXLSX(){
    let json= this.data
    let excelFileName= "Reporte"
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'informe': worksheet }, 
    SheetNames: ['informe'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  saveAsExcelFile(buffer, fileName){
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_Admin_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}

import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { Observable } from 'rxjs/internal/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import { from } from 'rxjs';

import { CurrencyGate } from '../Models/CurrencyGate';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';

import { HttpService } from '../services/http.service'
import { stringify } from '@angular/core/src/render3/util';




@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css', '../../../node_modules/primeng/resources/themes/nova-light/theme.css']
})
export class CurrencyComponent implements OnInit {

  title: string = "שאילתת שערי מטבע";
  descriptionLines: string[] = ['הצגת שערי המכס שנקבעו למטבע הנבחר או כלל המטבעות על פי טווח תאריכים.','שער יציג של המטבע לפי בנק ישראל בתוספת 0.5%.'];

  yearRange:string;
  fromDate: Date;
  toDate: Date;
  heIL: any;

  selectedCurrency: any;

  filteredData: CurrencyGate[];
  currencyTypeList: CurrencyGate[];
  gridData: CurrencyGate[];
  myData1: string;
  columns: any[];


  constructor(private httpService: HttpService, private renderer: Renderer2) { }
   
  currentIndex: number = 0;
  
  ngOnInit() {

    let tdate:Date=new Date();
    this.yearRange=(tdate.getFullYear() - 10).toString()+':'+tdate.getFullYear();



    //פניה לשירות לצורך שליפת כל הנתונים
    this.callService(`https://shaarolami-query.customs.mof.gov.il/CustomsPilotWeb/CurrencyRates/api/GetRates?fromDate=${this.FromDateString}&toDate=${this.ToDateString}`, 'GET').
      subscribe(response => { this.onSuccess(response) },
        error => { console.error(error) });

    this.heIL = {
      firstDayOfWeek: 0,
      dayNames: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
      dayNamesShort: ["ראש", "שני", "שלי", "רבי", "חמי", "שיש", "שבת"],
      dayNamesMin: ["א", "ב", "ג", "ד", "ה", "ו", "ז"],
      monthNames: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
      monthNamesShort: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"],
      today: 'היום',
      clear: 'נקה'
 

    };


    this.columns = [
      { field: 'currencyTypeName', header: 'שם מטבע' },
      { field: 'currencyTypeID', header: 'קוד מטבע' },
      { field: 'customsCurrencyRate', header: 'שיעור מכס' },
      { field: 'startDate', header: 'מתאריך תוקף' },
      { field: 'endDate', header: 'עד תאריך תוקף' }
    ];


  }



  private callService(url: string, method: string): Observable<string> {


    return Observable.create(observer => {

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response)
          }
        }
      }

      xhr.open(method, url, true);
      // xhr.onload = this.onSuccess;
      // xhr.onerror = this.handleError;
      xhr.send();
    });
  }



  private onSuccess(data: any) {

    let pattern: string = this.selectedCurrencyString;


    this.gridData = this.filteredData = data.map(r => new CurrencyGate(r.startDate, r.endDate, r.currencyTypeID, r.currencyTypeName, r.customsCurrencyRate)).filter(r => 1 == 1);

    this.filteredData = this.filteredData.filter(r => (pattern == undefined || pattern == "הכל" || r.displayText.toLowerCase().indexOf(pattern) >= 0)). //פילטור לפי הטקסט בתיבת הבחירה
      sort((a, b) => { //מיון לפי החיפוש
        let aIndex = a.displayText.toLowerCase().indexOf(pattern);
        let bIndex = b.displayText.toLowerCase().indexOf(pattern);

        return (aIndex < bIndex) ? -1 : ((aIndex > bIndex) ? 1 : 0);

      });   // sort((a, b) => (a.currencyTypeName < b.currencyTypeName) ? -1 : ((a.currencyTypeName > b.currencyTypeName) ? 1 : 0));



    this.initCurrencyTypesList(this.filteredData);

  }


  //לצורך החיפוש האוטו-קומפלט 
  get selectedCurrencyString(): string {


    if (this.selectedCurrency == undefined)
      return undefined;

    return typeof this.selectedCurrency === "string" ? this.selectedCurrency.toLowerCase() : this.selectedCurrency.displayText.toLowerCase();

  }


  //לצורך שליחה לשירות משורשר שם הפרמטר, מחזיר נתונים רק במידה ונבחר ערך ולא נמצא עדיין באמצע חיפוש
  get selectedCurrencyApiString(): string {


    if (this.selectedCurrency == undefined || this.selectedCurrency.currencyTypeID == null)
      return "";

    return `&currencyCode=${(typeof this.selectedCurrency === "string" ? this.selectedCurrency : this.selectedCurrency.currencyTypeID)}`;

  }


  
  get FromDateString(): string {


    let date = this.fromDate != undefined ? this.fromDate : (this.toDate == undefined ? new Date() : this.toDate);


    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  }


  get ToDateString(): string {


    let date = this.toDate != undefined ? this.toDate : new Date();


    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  }



  initCurrencyTypesList(list: CurrencyGate[]) {

    //הסרת רשומות כפולות
    this.currencyTypeList = list.filter((elem, index, self) => index === self.findIndex(i => i.currencyTypeName == elem.currencyTypeName));

    //הוספת ערך:הכל
    this.currencyTypeList.splice(0, 0, new CurrencyGate(null, null, null, "הכל", null));


  }

  searchData() {


    //פניה לשירות לצורך שליפת כל הנתונים
    this.callService(`https://shaarolami-query.customs.mof.gov.il/CustomsPilotWeb/CurrencyRates/api/GetRates?fromDate=${this.FromDateString}&toDate=${this.ToDateString}${this.selectedCurrencyApiString}`, 'GET').
      subscribe(response => { this.onSuccess(response) },
        error => { console.error(error) });


    this.initCurrencyTypesList(this.filteredData);


    //init paging
    this.resetPaging();



  }

  completeData() {

    let pattern: string = this.selectedCurrencyString;


    this.filteredData = this.gridData.
      filter(r => (pattern == undefined || pattern == "הכל" || r.displayText.toLowerCase().indexOf(pattern) >= 0)). //פילטור לפי הטקסט בתיבת הבחירה
      sort((a, b) => { //מיון לפי החיפוש
        let aIndex = a.displayText.toLowerCase().indexOf(pattern);
        let bIndex = b.displayText.toLowerCase().indexOf(pattern);

        return (aIndex < bIndex) ? -1 : ((aIndex > bIndex) ? 1 : 0);

      });   // sort((a, b) => (a.currencyTypeName < b.currencyTypeName) ? -1 : ((a.currencyTypeName > b.currencyTypeName) ? 1 : 0));



    this.initCurrencyTypesList(this.filteredData);
  }



  ngAfterViewInit() {
    //הוספת קלאס של תהילה כיוון שאין אפשרות להוסיף לטבלה עצמה
    this.renderer.addClass(document.getElementsByTagName("table")[0], "table-bordered");
  }



  @ViewChild('dt') table: Table;

  resetPaging() {

    this.currentIndex = 0;
    this.table.reset();
  }



}

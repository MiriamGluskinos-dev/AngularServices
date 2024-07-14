import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';

import { environment } from '../../environments/environment';

import { Table } from 'primeng/table';
import { CaptchaModule } from 'primeng/captcha';

import { Vendor } from '../Models/vedor';
import { Observable } from 'rxjs';
import { SystemTable } from '../Models/SystemTable';
import { MessagesModule } from 'primeng/messages';
import { HttpClient } from '@angular/common/http';

import * as xml2js from 'xml2js';


@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']

})

export class VendorComponent implements OnInit {

  

  title: string = 'שאילתת ספקים/לקוחות חו"ל';
  descriptionLines: string[] = ['מטרת השאילתה הנה להציג נתונים על ספקים או לקוחות חו"ל שהוקמו במערכת שער עולמי. הצגת הנתונים הנה מוגבלת מבחינת המידע הניתן להציג על כל ספק.  ',
    'נתוני הקלט מכילים את המדינה אליה משתייך הספק/לקוח חו"ל וכן אחד מהמזהים הבאים: שם ספק ומספר ספק. בתוצאות השאילתה ניתן יהיה לראות עד 5 רשומות העונות לנתוני הקלט. ',
    'נתוני קלט: ',
    'שליפת ספקים/לקוחות חו"ל לפי נתוני הקלט הבאים ',
    'א.מדינה - שדה חובה ',
    'ב.מספר ספק/לקוח חו"ל - מזהה במערכת שער עולמי ',
    'ג.שם ספק/לקוח חו"ל - לפחות שני תווים רצופים באותיות אנגליות או ספרות ',
    'נתוני הפלט: ',
    'נתוני הפלט בשאילתה מציגים עד 5 מופעים העונים על נתוני הקלט. בנוסף ניתנת אינדקציה על מספר הרשומות הכולל העונה על נתוני הקלט.'];
  currentIndex: number = 0;
  @ViewChild('dt') table: Table;
  @ViewChild('cpt') captcha: any;
  heIL: any;
  //מדינות
  StatesList: SystemTable[];
  typeList: SystemTable[];
  //מדינות מפולטר
  filteredDataCountry: any[];
  filteredDataType: any[];
  columns: any[] = [];

  //בשביל הארצות flag
  flagRequiredCountry: boolean = true;
  flagNotRequiredCountry: boolean = false;
  //בשביל הסוג flag
  flagRequiredType: boolean = true;
  flagNotRequiredType: boolean = false;

  flagErrorFeildCountry: boolean = false;
  flagErrorFeildType: boolean = false;
  //בשביל לדעת האם להציג את הטבלה או לא
  flag: boolean = false;
  //בשביל לדעת האם חזר נתונים מהשרות
  flagservice: boolean;
  //מכיל את הארץ והסוג הנבחרים
  selectedCountryList: any;
  selectedTypeList: any;
  textNameNumber: number;
  textVendorName: string = "";
  o: Object;// json דוגמא ל
  vendorsTable: Vendor[] = [];
  // האם להציג את הקפצה או לא
  captchaFlag: boolean;
  captchaValue: string = ''
  apiUrl:string=''
  baseUrl :string ="CustomspilotWeb/VendorSearch/api/GetVendors?countryCode=";
  siteKey:string=''
  
  //בשביל החיפוש של הAEO
  vendorId: number;
  textAEONumber:string= "";
  //אם לא נמצאו תוצאות
  mes: string = "";
  //שומר את כמות הרשומות שחזרו עבור אותו חיפוש
  mesResult="";
  //לצורך החיפוש האוטו-קומפלט 
  //של הארצות
  get selectedtablesTypeListString(): string {
    if (this.selectedCountryList == undefined)
      return undefined;

    return typeof this.selectedCountryList === "string" ? this.selectedCountryList.toLowerCase() : this.selectedCountryList.Name.toLowerCase();

  }
  //לצורך החיפוש האוטו-קומפלט 
  //של הספקים
  get selectedVendorsTypeListString(): string {
    if (this.selectedTypeList == undefined)
      return undefined;

    return typeof this.selectedTypeList === "string" ? this.selectedTypeList.toLowerCase() : this.selectedTypeList.Name.toLowerCase();

  }


  constructor(private renderer: Renderer2 ,private http: HttpClient) {
    this.StatesList = new Array();
    this.typeList = new Array();
    this.apiUrl=environment.apiUrl;
    this.siteKey=environment.ReCaptcha.siteKey;
    // ng build --configuration=staging





  }

  ngAfterViewInit() {
    this.captcha.reset();  
  }

  // recaptcha: any
  ngOnInit() {

    // this.recaptcha = (window as any).grecaptcha;
    //this.captchaFlag = false;
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

      { field: 'VendorTypeIDName', header: 'סוג' },
      { field: 'vendorID', header: 'מספר מזהה' },
      { field: 'vendorName', header: 'שם' },
      { field: 'dunsNumberSpecified', header: 'מספר  DUNS' },
      { field: 'licensedDealerNumber', header: 'מספר עוסק?' },
      { field: 'englishCountryName', header: 'מדינה' },
      { field: 'englishSubCountryName', header: 'תת מדינה' },
      { field: 'statusName', header: 'סטאטוס' },
      { field: 'vAddress', header: 'כתובת' }
    ];
    
    //פניה לשרות על מנת לקבל את כל הארצות
    this.callService('https://shaarolami-query.customs.mof.gov.il/CustomspilotWeb/SystemTables/api/GetTableData?tableName=Country', 'GET').
      subscribe(response => { this.onSuccessCountry(response) },
        error => { console.error(error) });

    //פניה לשרות על מנת לקבל את כל הסוגים
    
    this.callService('https://shaarolami-query.customs.mof.gov.il/CustomspilotWeb/SystemTables/api/GetTableData?tableName=VendorType', 'GET').
       subscribe(response => { this.onSuccessVendorType(response) },
        error => { console.error(error) });


  }


  //הפונקציה מבצעת פניה לשירות 
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
      xhr.send();
    });
  }

 

  
  private onSuccessCountry(data: any) {
    this.StatesList = data.map(r => new SystemTable(r.ID, r.MalamId, r.Name, r.State, r.ExtraStringData)).filter(r => 1 == 1);
  }
  private onSuccessVendorType(data: any) {
    this.typeList = data.map(r => new SystemTable(r.ID, r.MalamId, r.Name, r.State, r.ExtraStringData)).filter(r => 1 == 1);
  }
  private onSuccess(data: any) {

    if (data["VendorResults"] == undefined) {

      this.mes = data;
      //לא חזרו  נתונים מהשרות
      this.flagservice = false;
  
    }
    else {
      this.vendorsTable = data["VendorResults"].map(r => new Vendor(r.vendorTypeID, r.VendorTypeIDName, r.vendorID, r.vendorName, r.dunsNumberSpecified, r.licensedDealerNumber, r.englishCountryID, r.englishCountryName, r.englishSubCountryID, r.englishSubCountryName, r.statusID, r.statusName, r.Address)).filter(r => 1 == 1);
      this.flagservice = true;
      this.mesResult="אותרו " + data["NumberOfResults"]+ " רשומות העונות לנתוני הקלט. מוצגות רק הראשונות שבהן."

    }
  }
  //הפונקציה ממלא את המערך בנתונים
  initData() {

  }
  filterCountry() {

    let pattern: string = this.selectedtablesTypeListString;
    this.filteredDataCountry = this.StatesList.

      filter(r => (pattern == undefined || r.Name.indexOf(pattern) >= 0)). //פילטור לפי הטקסט בתיבת הבחירה
      sort((a, b) => { //מיון לפי החיפוש
        let aIndex = a.Name.toLowerCase().indexOf(pattern);
        let bIndex = b.Name.toLowerCase().indexOf(pattern);

        return (aIndex < bIndex) ? -1 : ((aIndex > bIndex) ? 1 : 0);

      });

  }
  filterType() {

    let pattern: string = this.selectedTypeList;
    this.filteredDataType = this.typeList.
      filter(r => (pattern == undefined || r.Name.toLowerCase().indexOf(pattern) >= 0)). //פילטור לפי הטקסט בתיבת הבחירה
      sort((a, b) => { //מיון לפי החיפוש
        let aIndex = a.Name.toLowerCase().indexOf(pattern);
        let bIndex = b.Name.toLowerCase().indexOf(pattern);


        return (aIndex < bIndex) ? -1 : ((aIndex > bIndex) ? 1 : 0);

      });

  }
  //onDropdownClick- בשביל ה 
  initCountyTablesList(list: string[]) {
    this.filteredDataCountry = list.filter((elem, index, self) => index === self.findIndex(i => i == elem));
  }
  //onDropdownClick- בשביל ה 
  initTypeTablesList(list: string[]) {
    this.filteredDataType = list.filter((elem, index, self) => index === self.findIndex(i => i == elem));
  }
  searchData() {

    if ((this.selectedCountryList != undefined || this.selectedCountryList != null) && this.selectedCountryList != "") {
      this.flagNotRequiredCountry = true;
      this.flagRequiredCountry = false;
    }
    if ((this.selectedTypeList != undefined || this.selectedTypeList != null) && this.selectedTypeList != "") {

      this.flagRequiredType = false;
      this.flagNotRequiredType = true;
      this.vendorId=this.selectedTypeList.ID
    }

    //אם שני הדברים בחורים
    if (((this.selectedCountryList != undefined || this.selectedCountryList != null) && this.selectedCountryList != "") && ((this.selectedTypeList != undefined || this.selectedTypeList != null) && this.selectedTypeList != "")) {
      this.flag = true;
      
    }



  }

  filterResults(rowData: Vendor): boolean {
    let hasParam: boolean = false;
    let canShow: boolean = false;

    hasParam = ((this.textNameNumber != undefined && this.textNameNumber.toString() != "") || (this.textVendorName != undefined && this.textVendorName.toString() != ""));

    if (!hasParam) return true;

    if (this.textNameNumber != undefined && this.textNameNumber.toString() != "") {
      canShow = (rowData.vendorID == this.textNameNumber);
      // אין סיבה להמשיך לבדוק אם יש אי התמאה בשלב הזה
      if (!canShow) { return false; }
    };

    if (this.textVendorName != undefined && this.textVendorName.toString() != "") {
      canShow = (rowData.vendorName == this.textVendorName);
    }
    return canShow;
  }

  flagErrorFeildCountryFunc() {

    this.flagErrorFeildCountry = true;

  }
  flagErrorFeildTypeFunc() {
    this.flagErrorFeildType = true;
  }



  GetDataFromService() {

   this.apiUrl ='https://shaarolami-query.customs.mof.gov.il/'
   this.baseUrl="CustomspilotWeb/VendorSearch/api/GetVendors?countryCode="  
   this.baseUrl+=  this.selectedCountryList.ID + "&customerTypeId=" + this.selectedTypeList.ID;
   this.baseUrl+=(this.textNameNumber != undefined && this.textNameNumber.toString() != "") ?  "&vendorId=" + this.textNameNumber : '';
   this.baseUrl+= (this.textVendorName != undefined && this.textVendorName.toString() != "") ?  "&vendorName=" + this.textVendorName : ''; 
   this.baseUrl+= (this. textAEONumber!= undefined && this. textAEONumber.toString() != "") ?  "&AEOCertificateNumber=" + this.textAEONumber: '';
   this.callService(this.apiUrl+ this.baseUrl+ "&captcha="+this.captcha.getResponse(), 'GET').
        subscribe(response => { this.onSuccess(response) },
          error => { console.error(error) }); 
   
   this.captcha.reset();
   this.captchaValue = ''

  }
  clearFilter() {


    if (this.selectedCountryList == undefined || this.selectedCountryList == null || this.selectedCountryList == "") {
      this.flagNotRequiredCountry = false;
      this.flagRequiredCountry = true;
      this.flag = false;

    }

    if (this.selectedTypeList == undefined || this.selectedTypeList == null || this.selectedTypeList == "") {
      this.flagRequiredType = true;
      this.flagNotRequiredType = false;
      this.flag = false;
    }

  }
 
  resetPaging() {
    this.currentIndex = 0;
    this.table.reset();
  }
  showResponse(response) {

    this.checkRequiredFields()


  }

  // פונקציה שבודקת האם כל שדות החובה מלאים

  checkRequiredFields() {

    var response = this.captcha.getResponse();
    // console.log('response', response);
    if (response.length === 0) {
      (<any>window).grecaptcha.execute();
    } else {
      if (this.flag == true) {
        this.GetDataFromService()
      }
      if (this.flag == false) {
        this.flagErrorFeildCountry = true;
        this.flagErrorFeildType = true;
      }
     
    }

  }

}



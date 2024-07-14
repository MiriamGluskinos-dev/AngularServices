import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { SystemTable, SystemTableNameField } from '../Models/SystemTable';
import { Observable } from 'rxjs';
import { TableModule, Table } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HttpParams } from '@angular/common/http';
import { SystemTablesServiceResult, SystemTablesServiceData } from '../Models/ServiceApiData';
import { HttpService } from '../services/http.service';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-system-table',
  templateUrl: './system-table.component.html',
  styleUrls: ['./system-table.component.css','../../../node_modules/primeng/resources/themes/nova-light/theme.css']
})
export class SystemTableComponent implements OnInit {

  title: string = "הצגת טבלאות קהילתיות";
  // descriptionLines: string[] = ["נותנת מענה לגורמים השונים בשרשרת הסחר בדבר נתונים החסרים להם לשם המשך עבודתם, וכן משמשת את הציבור הרחב לטובת פעילותו המכסית.",
  //   "הנתונים מוצגים בצורה מובנת של טבלאות קוד ממערכת שער עולמי. הנתונים ניתנים לחשיפה לכלל הציבור ללא צורך בזיהוי השואל.",
  //   "הנתונים מתעדכנים אחת ל 24 שעות, תאריך עדכון האחרון של ערכי הטבלה יופיע בתוצאות החיפוש."];
  descriptionLines: string[] = ['נותנת מענה לגורמים השונים בשרשרת הסחר בדבר נתונים החסרים להם לשם המשך עבודתם, וכן משמשת את הציבור הרחב לטובת פעילותו המכסית.',
    'הנתונים מוצגים בצורה מובנת של טבלאות קוד ממערכת שער עולמי. הנתונים ניתנים לחשיפה לכלל הציבור ללא צורך בזיהוי השואל.',
    'הנתונים מתעדכנים אחת ל 24 שעות.'];


  currentIndex: number = 0;
  // מקור
  // gridData: any[];
  gridData: any;
  tables: any[];
  filterTables: any[];
  //הטבלה הנבחרת
  selectedtablesTypeList: any;
  columns: any[] = [];
  idList: any[];
  selectedID: any;
  flag: boolean = false;
  param: string;
  //מערך של כל טבלאות המערכת
  tablesList: SystemTable[];
  flagPaginator: boolean = false;
  //מערך שמכיל את השדות הרלוונטים של הטבלה הנבחרת
  tableWithHebrewFieldName: SystemTableNameField[];
  // apiUrlTest:string='https://shaarolami-query-stage.customs.mof.gov.il/';
  // apiUrlProd:string='https://shaarolami-query.customs.mof.gov.il';
  //לצורך החיפוש האוטו-קומפלט 
  get selectedtablesTypeListString(): string {
    if (this.selectedtablesTypeList == undefined)
      return undefined;
      // return typeof this.selectedtablesTypeList === "string" ? this.selectedtablesTypeList.toLowerCase() : this.selectedtablesTypeList.ExtraStringData.toLowerCase();

    return typeof this.selectedtablesTypeList === "string" ? this.selectedtablesTypeList.toLowerCase() : this.selectedtablesTypeList.displayText.toLowerCase();

  }

  //מחזיר את המפתח של הערך הנבחר
  get selectedKey(): string {
    if (this.selectedtablesTypeList.key == undefined)
      return undefined;

    return (typeof this.selectedtablesTypeList.key === "string" ?
      this.selectedtablesTypeList.key : this.selectedtablesTypeList.key).toLowerCase();
  }

  //מחזיר את המזהה של הערך הנבחר
  get selectedIdd(): string {
    if (this.selectedID == undefined)
      return undefined;

    return (typeof this.selectedID === "string" ?
      this.selectedID : this.selectedID.tableID).toLowerCase();
  }

  constructor(private httpService: HttpService) {
    this.param = "TableConfiguration";

  }

  ngOnInit() {

    this.param = "TableConfiguration";
    this.callService('https://shaarolami-query.customs.mof.gov.il/CustomspilotWeb/SystemTables/api/GetTableData?tableName=' + this.param, 'GET').

      subscribe(response => { this.onSuccessTables(response) },
        error => { console.error(error) });
  }


  private onSuccessTables(data: any) {
    this.tablesList = data.map(r => new SystemTable(r.ID, r.MalamId, r.Name, r.State, r.ExtraStringData)).filter(r => 1 == 1);
  }

  private onSuccess(data: any,tableID) {
    // source this.tableWithHebrewFieldName = data['ColumnsCaption'].map(r => new SystemTableNameField(r.Name, r.Description)).filter(r => 1 == 1);

// 

this.tableWithHebrewFieldName = data['ColumnsCaption'].reduce((acc, r) => {
  if ((tableID == 1964 && r.Name=='ID' )||( tableID == 2050 && r.Name=='ID' )||( tableID == 239688 && r.Name=='ExternalIdNum')) {
    // לא מוסיפים את הפריט למערך
  } else {
    acc.push(new SystemTableNameField(r.Name, r.Description));
  }
  return acc;
}, []);

// 





    //מקור
    this.columns = this.tableWithHebrewFieldName;
    // MalamID על מנת להסיר את הערך 
    // this.columns.forEach(element => {
    //   if (element.field == 'MalamID') {
    //     const index: number = this.columns.indexOf(element);
    //     if (index !== -1) {
    //       this.columns.splice(index, 1);
    //     }

    //   }

    // });
    // מקור
    // this.gridData = data['Table'];
    // אחרי הפיתוח של ממשל זמין לעשות את זה:
    this.gridData = (Object.values(data)[0]);
    
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

  filterTablesType() {

    let pattern: string = this.selectedtablesTypeListString
    this.filterTables = this.tablesList.
    // filter(r => (pattern == undefined || r.ExtraStringData.toLowerCase().indexOf(pattern) >= 0)). //פילטור לפי הטקסט בתיבת הבחירה

      filter(r => (pattern == undefined || r.displayText.toLowerCase().indexOf(pattern) >= 0)). //פילטור לפי הטקסט בתיבת הבחירה
      sort((a, b) => { //מיון לפי החיפוש
        // let aIndex = a.ExtraStringData.toLowerCase().indexOf(pattern);
        // let bIndex = b.ExtraStringData.toLowerCase().indexOf(pattern);
        let aIndex = a.displayText.toLowerCase().indexOf(pattern);
        let bIndex = b.displayText.toLowerCase().indexOf(pattern);

        return (aIndex < bIndex) ? -1 : ((aIndex > bIndex) ? 1 : 0);
        
      });

  }

  searchData() {

    this.flagPaginator = true;
    this.columns = this.selectedtablesTypeList.columns;
    //פניה לשירות לצורך שליפת הנתונים של הטבלה הנבחרת
    var b: boolean = true;
    // alert(this.selectedtablesTypeList.Name)
    this.callService("https://shaarolami-query.customs.mof.gov.il/CustomspilotWeb/SystemTables/api/GetTableData?tableName=" + this.selectedtablesTypeList.Name + "&includeMetadata=" + b, 'GET').
      subscribe(response => { this.onSuccess(response, this.selectedtablesTypeList.ID) },
        error => { console.error(error) });
    this.resetPaging();

  }
  initSystemTablesList(list: SystemTable[]) {
    this.filterTables = list.filter((elem, index, self) => index === self.findIndex(i => i.ExtraStringData == elem.ExtraStringData));

  }

  filterId() {
    this.idList = this.gridData.filter(r => 1 == 1).sort((a, b) => (a.id < b.id) ? -1 : ((a.id > b.id) ? 1 : 0))
  }

  @ViewChild('dt') table: Table;


  resetPaging() {
    this.currentIndex = 0;
    this.table.reset();
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DetectionManifest } from '../Models/DetectionManifest';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-detection-manifest',
  templateUrl: './detection-manifest.component.html',
  styleUrls: ['./detection-manifest.component.css']
})
export class DetectionManifestComponent implements OnInit {

  isDisabled: boolean = true;

  currentIndex: number = 0;
  val1: string = "מטען:";
  cargoList: DetectionManifest[] = [];
  heIL: any;
  //התאריכים שנבחרו
  fromDate: Date;
  toDate: Date;
  //מכיל את הערך שהכניסו לתיבות הטקסט
  textNumberManifest: string;
  textNumberTransaction: string;
  textNumberContainer: string;
  textNumberReference: string;
  textNumberDiploma: string;
  textYear: string;
  textNumberBillCargo: string;
  textNumberBillCargoInternal: string;
  //מספר שטר מטען בלדר
  textNumberBaldarCargo: string;
  //ח.פ בלדר
  textBaldar: string;
  //תאריך הקמה
  textDateOfEstablishment: string;
  //מערך של מספר אסמכתא מפולטר
  filterReferenceList: any[];
  //מכיל את מספר האסמכתא הנבחר
  selectedReferenceList: any;
  //מערך של מספר אתר יציאה מפולטר
  filterExitSiteList: any[];
  //מכיל את אתר היציאה הנבחר
  selectedExitSiteList: any;
  //מערך מפולטר של אתר הכניסה
  filterEnterSiteList: any[];
  //מכיל את אתר הכניסה הבחר
  selectedEnterSiteList: any;
  //מערך מפולטר של סוג המטען
  filterCargoList: any[];
  //מכיל את סוג המטען הנבחר
  selectedCargoList: any;
  //flag 
  //כולל גם מצהר מלא ומכולות ריקות
  flagYami: boolean = true;
  flagYabasha: boolean = false;
  flagAviri: boolean = false;
  flagBaldarCargo: boolean = false;
  //Disable משתנה בשביל ה
  flagDisableCargo: boolean = false;
  flagDisableContainer: boolean = true;
  flagDisableCargoDate: boolean = false;



  //לצורך החיפוש האוטו-קומפלט 
  get selectedCargoListString(): string {


    if (this.selectedCargoList == undefined)
      return undefined;

    return typeof this.selectedCargoList === "string" ? this.selectedCargoList.toLowerCase() : this.selectedCargoList.name.toLowerCase();

  }

  constructor() {

  }

  ngOnInit() {

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
    //מאתחל את מערך שמות המטענים האפשריים
    this.cargoList.push(new DetectionManifest("אווירי", "Aerial"));
    this.cargoList.push(new DetectionManifest("ימי", "Seafaring"));
    this.cargoList.push(new DetectionManifest("יבשתי", "Terrestrial"));
    this.cargoList.push(new DetectionManifest("מצהר מלא", "RemainOnBoard"));
    this.cargoList.push(new DetectionManifest("מכולות ריקות", "Empty"));
    this.cargoList.push(new DetectionManifest("מטען בלדר", "Courier"));
  }

  //פילטור האסמכתא
  filterReference() {

  }
  //פילטור מספר תעודה
  filterExitSite() {

  }
  filterEnterSite() {

  }
  //פילטור של סוג המטען
  filterCargo() {
    let pattern: string = this.selectedCargoListString
    this.filterCargoList = this.cargoList.

      filter(r => (pattern == undefined || r.name.toLowerCase().indexOf(pattern) >= 0)). //פילטור לפי הטקסט בתיבת הבחירה
      sort((a, b) => { //מיון לפי החיפוש
        let aIndex = a.name.toLowerCase().indexOf(pattern);
        let bIndex = b.name.toLowerCase().indexOf(pattern);
        return (aIndex < bIndex) ? -1 : ((aIndex > bIndex) ? 1 : 0);

      });
  }
  //פונקציה שקוראת בעת בחירת מטען מסוים 
  //flag ובהתאם לבחירה מעדכנת את ה 
  UpDateFlag() {
    if (this.selectedCargoList.name == "אווירי") {
      this.flagAviri = true;
      this.flagBaldarCargo = false;
      this.flagYami = false;
      this.flagYabasha = false;
    }
    if (this.selectedCargoList.name == "ימי" || this.selectedCargoList.name == "מצהר מלא" || this.selectedCargoList.name == "מכולות ריקות") {
      this.flagAviri = false;
      this.flagBaldarCargo = false;
      this.flagYami = true;
      this.flagYabasha = false;
    }
    if (this.selectedCargoList.name == "יבשתי") {
      this.flagAviri = false;
      this.flagBaldarCargo = false;
      this.flagYami = false;
      this.flagYabasha = true;
    }
    if (this.selectedCargoList.name == "מטען בלדר") {
      this.flagAviri = false;
      this.flagBaldarCargo = true;
      this.flagYami = false;
      this.flagYabasha = false;
    }
  }

  // בעת בחירת מטען
  cargoChoice() {

    this.flagDisableCargo = false;
    this.flagDisableContainer = true;
  }
  // בעת בחירת מכולה
  containerChoice() {

    this.flagDisableContainer = false;
    this.flagDisableCargo = true;
  }
  initCargoList(list: DetectionManifest[]) {

    //הסרת רשומות כפולות
    this.filterCargoList = list.filter((elem, index, self) => index === self.findIndex(i => i.name == elem.name));




  }
  searchData() {

  }
  @ViewChild('dt') table: TableModule;

  resetPaging() {
    this.currentIndex = 0;
    this.table.reset();
  }
}

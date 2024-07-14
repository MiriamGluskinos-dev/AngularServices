import { Component, OnInit, ViewChild } from '@angular/core';
import { initChangeDetectorIfExisting } from '@angular/core/src/render3/instructions';
import { MessageService } from 'primeng/api';
import { TableModule, Table } from 'primeng/table';


@Component({
  selector: 'app-morning-message',
  templateUrl: './morning-message.component.html',
  styleUrls: ['./morning-message.component.css']
})


export class MorningMessageComponent implements OnInit {

  title: string = "שאילתת הודעות בוקר";
  descriptionLines: string[] = [""];


  currentIndex: number = 0;
  heIL: any;
  fromDate: Date;
  toDate: Date;
  selectedAddresseeTypeList: any;
  selectedMessageTypeList: any;
  //מכיל את כל סוגי הנמענים
  addresseeTypeList: string[]
  //מכיל את כל סוגי ההודעות
  messageTypeList: string[]
  //מכיל את כל סוגי הנמענים -מפולטר
  filtersAddresseeTypeList: string[]
  //מכיל את כל סוגי ההודעות -מפולטר
  filterMessageTypeList: string[]
  index: number = -1;
  textTitle:string;
  textContent:string;


  get FromDateString(): string {


    let date = this.fromDate != undefined ? this.fromDate : (this.toDate == undefined ? new Date() : this.toDate);


    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  }


  get ToDateString(): string {


    let date = this.toDate != undefined ? this.toDate : new Date();


    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  }


  constructor(private messageService: MessageService) {
    this.addresseeTypeList = new Array();
    this.messageTypeList = new Array();
    this.initData();
  }

  onTabClose(event) {
    this.messageService.add({ severity: 'info', summary: 'Tab Closed', detail: 'Index: ' + event.index })
  }

  onTabOpen(event) {
    this.messageService.add({ severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index });
  }

  openNext() {
    this.index = (this.index === 3) ? 0 : this.index + 1;
  }

  openPrev() {
    this.index = (this.index <= 0) ? 3 : this.index - 1;
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


  }

  //הפונקציה ממלא את המערך בנתונים
  initData() {

    this.addresseeTypeList.push('כללי')
    this.addresseeTypeList.push('מסוף מטענים ים')
    this.addresseeTypeList.push('נמלים')
    this.addresseeTypeList.push('בלדרים')
    this.addresseeTypeList.push('חברות תעופה')
    this.messageTypeList.push("כללי")
    this.messageTypeList.push("תפעול")

  }
  filterAddress() {


    let pattern: string = this.selectedAddresseeTypeList
    this.filtersAddresseeTypeList = this.addresseeTypeList.
      //אם אני יעשה את זה מחלקה נצטרך להגיד לו לפי איזה שדה לפלטר
      filter(r => (pattern == undefined || r.toLowerCase().indexOf(pattern) >= 0)). //פילטור לפי הטקסט בתיבת הבחירה
      sort((a, b) => { //מיון לפי החיפוש
        let aIndex = a.toLowerCase().indexOf(pattern);
        let bIndex = b.toLowerCase().indexOf(pattern);


        return (aIndex < bIndex) ? -1 : ((aIndex > bIndex) ? 1 : 0);

      });

  }
  initAddressList(list: string[]) {
    //הסרת רשומות כפולות
    this.filtersAddresseeTypeList = list.filter((elem, index, self) => index === self.findIndex(i => i == elem));
  }
  filterMessage() {
    let pattern: string = this.selectedMessageTypeList
    this.filterMessageTypeList = this.messageTypeList.
      //אם אני יעשה את זה מחלקה נצטרך להגיד לו לפי איזה שדה לפלטר
      filter(r => (pattern == undefined || r.toLowerCase().indexOf(pattern) >= 0)). //פילטור לפי הטקסט בתיבת הבחירה
      sort((a, b) => { //מיון לפי החיפוש
        let aIndex = a.toLowerCase().indexOf(pattern);
        let bIndex = b.toLowerCase().indexOf(pattern);


        return (aIndex < bIndex) ? -1 : ((aIndex > bIndex) ? 1 : 0);

      });

  }
  initMessageList(list: string[])
  {
    this.filterMessageTypeList = list.filter((elem, index, self) => index === self.findIndex(i => i == elem));
  }
  searchData() {
  }

}

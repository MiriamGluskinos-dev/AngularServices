import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { importer } from '../Models/importer';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})


export class BusinessComponent implements OnInit {
  // בשביל נסיון האפיון
  items1: MenuItem[];
  items2: MenuItem[];
  activeItem: MenuItem;
  columns: any[] = [];
  data: importer[] = [];

  // 
  constructor() { }

  ngOnInit() {
    // בשביל נסיון האפיון
    this.items2 = [
      { label: 'תצהיר ליבואן', icon: 'pi pi-check' },
      { label: 'תיק בישבון', icon: 'fa fa-fw fa-calendar' },
      { label: 'ליקויים', icon: 'fa fa-fw fa-book' },
      { label: 'Support', icon: 'fa fa-fw fa-support' },
      { label: 'Social', icon: 'fa fa-fw fa-twitter' }
    ];

    this.activeItem = this.items2[0];
    this.items1 = [
      { label: 'Stats', icon: 'fa fa-fw fa-bar-chart' },
      { label: 'Calendar', icon: 'fa fa-fw fa-calendar' },
      { label: 'Documentation', icon: 'fa fa-fw fa-book' },
      { label: 'Support', icon: 'fa fa-fw fa-support' },
      { label: 'Social', icon: 'fa fa-fw fa-twitter' }
    ];


    // closeItem(event, index) {
    //   this.items2 = this.items2.filter((item, i) => i !== index);
    //   event.preventDefault();

    // }

    this.columns = [
      { field: 'currencyTypeName', header: 'מספר בקשה' },
      { field: 'currencyTypeID', header: 'סטאטוס' },
      { field: 'customsCurrencyRate', header: 'תאריך החלטה' },
      { field: 'startDate', header: 'יחידה מטפלת' },
      { field: 'endDate', header: 'מסלול' },
      { field: 'currencyTypeName', header: 'תאריך הגשה' },
      { field: 'currencyTypeID', header: 'תקופת תביעה' },
      { field: 'customsCurrencyRate', header: 'פירוט הטובין שיוצאו' },
      { field: 'startDate', header: 'סכום התביעה שאושר' }
    ];
    this.data.push(new importer("49", "מאושרת", "06-04-2008", "חיפה", "מס נדחה", "10-06-2007", "12/07-1/07", "בקש'ח יצחק מרום", "0"))
    this.data.push(new importer("95", "מאושרת", "16-06-2013", "חיפה", "מס נדחה", "17-03-2007", "12/12-1/12", "בקש'ח גדי אזולאי", "106,083"))
    this.data.push(new importer("470", "מאושרת", "27-01-2011", "חיפה", "מס נדחה", "27-01-2011", "12/10-1/10", "בקש'ח  מרום", "29,180"))
    this.data.push(new importer("686", "מאושרת", "26-12-2012", "חיפה", "מס נדחה", "24-04-2007", "12/07-1/07", "בקש'ח יצחק מרום", "0"))
    this.data.push(new importer("49", "מאושרת", "06-04-2008", "חיפה", "מס נדחה", "10-06-2007", "12/11-1/11", "בקש'ח יצחק מרום", "13,096"))
    this.data.push(new importer("1041", "מאושרת", "06-04-2008", "חיפה", "מס נדחה", "10-06-2007", "12/07-1/07", "בקש'ח יצחק מרום", "0"))
    this.data.push(new importer("1619", "מאושרת", "11-10-2009", "חיפה", "מס נדחה", "31-03-2010", "12/08-1/08", "בקש'ח  מרום", "10,994"))


  }
}


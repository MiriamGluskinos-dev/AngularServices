

// <!-- גרסא אחרונה של שרי לפני ששניתי את הקוד שלה -->

import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule, Table } from 'primeng/table';


import { HttpService } from '../services/http.service'
import { ConcentratedData } from '../Models/ConentrateData'
import { ConcentratedServiceData } from '../Models/ServiceApiData'
import { DatePipe } from '@angular/common'
import { Observable } from 'rxjs/internal/Observable';

//בדיקה

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css', '../../../node_modules/primeng/resources/themes/nova-light/theme.css']
})
export class SearchTableComponent implements OnInit {


  title: string = "טבלת מסי  יבוא מרוכזים";
  descriptionLines: string[] = ['טבלת עזר המציגה שיעורי מסים מרוכזים החלים ביבוא מוצרים לישראל. הטבלה מיועדת בעיקר לשימוש ביבוא אישי.',
    'מסים מרוכזים כוללים מע"מ, מכס ומס קנייה אם חלים.'];


  cols: any[];
  currentIndex: number = 0;

  gridData: ConcentratedData[];
  filteredData: ConcentratedData[];
  mainCategoryList: ConcentratedData[];
  categoryList: ConcentratedData[];
  productList: ConcentratedData[];


  selectedProductMain: any;
  selectedMainCategory: any;
  selectedCategory: any;
  selectedProduct: any;


  get producMainString(): string {

    if (this.selectedProductMain == undefined)
      return undefined;


    return (typeof this.selectedProductMain === "string" ?
      this.selectedProductMain : this.selectedProductMain.ProductLevel3).toLowerCase();
  }

  get productString(): string {

    if (this.selectedProduct == undefined)
      return undefined;

    return (typeof this.selectedProduct === "string" ?
      this.selectedProduct : this.selectedProduct.ProductLevel3).toLowerCase();
  }

  get mainCategoryString(): string {

    if (this.selectedMainCategory == undefined)
      return undefined;

    return (typeof this.selectedMainCategory === "string" ?
      this.selectedMainCategory : this.selectedMainCategory.ProductLevel1).toLowerCase();
  }


  get categoryString(): string {

    if (this.selectedCategory == undefined)
      return undefined;

    return (typeof this.selectedCategory === "string" ?
      this.selectedCategory : this.selectedCategory.ProductLevel2).toLowerCase();
  }



  constructor(private httpService: HttpService, private renderer: Renderer2) { }

 
  ngOnInit() {
    this.callService('https://shaarolami-query.customs.mof.gov.il/CustomspilotWeb/SystemTables/api/GetTableData?tableName=ConcentratedTaxesView&includeMetadata=true', 'GET').
      subscribe(response => { this.onSuccess(response) },
        error => { console.error(error) });

   
    // ];
    this.cols = [
      { field: 'ProductLevel1', header: 'קטגוריה ראשית' },
      { field: 'ProductLevel2', header: 'קטגוריה משנית' },
      { field: 'ProductLevel3', header: 'מוצר' },
      { field: 'Category1Taxes1', header: 'עד 75$' },
      { field: 'Category1Taxes2', header: 'מ76$ עד 500$' },
      { field: 'Category1Taxes3', header: 'מ501$ עד 1000$' },
      { field: 'Category1Taxes4', header: 'מעל 1000$' },

    ];


    
  }

  //-----------------------
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

  private onSuccess(data: any) {

    this.gridData = data['Table'].map(item =>
      new ConcentratedData(item.ID, item.ProductLevel1, item.ProductLevel2, item.ProductLevel3, item.Category1Taxes1, item.Category1Taxes2, item.Category1Taxes3, item.Category1Taxes4));

    this.initData();

  }
  
  //-----------------------

  ngAfterViewInit() {
    //הוספת קלאס של תהילה כיוון שאין אפשרות להוסיף לטבלה עצמה
    this.renderer.addClass(document.getElementsByTagName("table")[0], "table-bordered");
  }



  initData() {

    //מחיקת השורה הראשונה- אשר מכילה נתונים סיכומיים
    this.gridData = this.gridData.filter(item => item.ProductLevel1 != undefined);

    this.filteredData = this.gridData;

    //מיון הנתונים
    this.gridData
      .sort((a, b) => {
        return (a.ProductLevel1 < b.ProductLevel1) ? -1 : ((a.ProductLevel1 > b.ProductLevel1) ? 1 :
          ((a.ProductLevel2 < b.ProductLevel2) ? -1 : ((a.ProductLevel2 > b.ProductLevel2) ? 1 :
            ((a.ProductLevel3 < b.ProductLevel3) ? -1 : ((a.ProductLevel3 > b.ProductLevel3) ? 1 : 0)))));
      });


    this.initMainCategoryList(this.filteredData);
    this.initCategoryList(this.filteredData);
    this.initProductList(this.filteredData);

  }


  initMainCategoryList(list: ConcentratedData[], isAddFirstRow: boolean = true) {

    //הסרת רשומות כפולות
    this.mainCategoryList = list.filter((elem, index, self) => index === self.findIndex(i => i.ProductLevel1 == elem.ProductLevel1));

    //הוספת ערך:הכל
    if (isAddFirstRow) {
      this.mainCategoryList.splice(0, 0, new ConcentratedData(null, "הכל", null, null, null, null, null, null));
    }

  }


  initCategoryList(list: ConcentratedData[], isAddFirstRow: boolean = true) {

    //פילטור לפי קטגוריה ראשית נבחרת
    this.categoryList = list.filter(row => this.mainCategoryString == undefined || this.mainCategoryString == "הכל" || row.ProductLevel1.toLowerCase().indexOf(this.mainCategoryString) >= 0);


    //הסרת רשומות כפולות מרשימת הקטגוריות
    this.categoryList = this.categoryList.filter((elem, index, self) => index === self.findIndex(i => i.ProductLevel2 == elem.ProductLevel2));

    //הוספת ערך :הכל
    if (isAddFirstRow) {
      this.categoryList.splice(0, 0, new ConcentratedData(null, null, "הכל", null, null, null, null, null));
    }

  }


  initProductList(list: ConcentratedData[], isAddFirstRow: boolean = true) {

    //פילטור לפי קטגוריה נבחרת
    this.productList = list.filter(row => (this.mainCategoryString == undefined || this.mainCategoryString == "הכל" || row.ProductLevel1.toLowerCase().indexOf(this.mainCategoryString) >= 0) &&
      (this.categoryString == undefined || this.categoryString == "הכל" || row.ProductLevel2.toLowerCase().indexOf(this.categoryString) >= 0 && (!(this.selectedCategory instanceof ConcentratedData) || this.selectedCategory.ProductLevel2 == row.ProductLevel2)));


    //הסרת רשומות כפולות מרשימת המוצרים
    this.productList = this.productList.filter((elem, index, self) => index === self.findIndex(i => i.ProductLevel3 == elem.ProductLevel3));


    //הוספת ערך :הכל
    //if (isAddFirstRow) {
    this.productList.splice(0, 0, new ConcentratedData(null, null, "הכל", null, null, null, null, null));
    //}

  }



  searchMainCategory() {

    //ניקוי הפילטורים האחרים
    this.selectedCategory = null;
    this.selectedProduct = null;
    this.selectedProductMain = null;
    this.selectedMainCategory = this.mainCategoryString == undefined || this.mainCategoryString == "הכל" ? null : this.selectedMainCategory;

    this.searchData();

    this.initMainCategoryList(this.filteredData, false);
    //this.initCategoryList(this.filteredData);

  }


  searchSubCategory() {

    this.selectedProduct = null;
    this.selectedProductMain = null;
    this.selectedCategory = this.categoryString == undefined || this.categoryString == "הכל" ? null : this.selectedCategory;

    this.searchData();

    this.initCategoryList(this.filteredData, false);
    this.initProductList(this.filteredData, true);


  }


  searchSubProduct() {

    this.selectedProduct = this.productString == undefined || this.productString == "הכל" ? null : this.selectedProduct;


    this.searchData();


    this.initProductList(this.filteredData, true);


  }


  searchData() {

    let mainCategory = this.mainCategoryString;
    let category = this.categoryString;
    let product = this.productString;
    let mainProduct = this.producMainString;
    let sortPattern = this.productString == undefined ? this.producMainString : this.productString;


    //במידה וכל הפילטורים ריקים מאתחל את כל הנתונים בגריד
    if ((mainCategory == undefined || mainCategory.length == 0) &&
      (category == undefined || category.length == 0) &&
      (product == undefined || product.length == 0) && (mainProduct == undefined || mainProduct.length == 0)) {

      this.filteredData = this.gridData;

    }

    else {


      //חיפוש הנתונים
      this.filteredData = this.gridData

        .filter(row => (mainCategory == undefined || mainCategory == "הכל" || row.ProductLevel1.toLowerCase().indexOf(mainCategory) >= 0) &&
          (category == undefined || category == "הכל" || row.ProductLevel2.toLowerCase().indexOf(category) >= 0 && (!(this.selectedCategory instanceof ConcentratedData) || this.selectedCategory.ProductLevel2 == row.ProductLevel2)) &&
          (product == undefined || (row.ProductLevel3.toLowerCase().indexOf(product) >= 0)) && //(!(this.selectedProduct instanceof ConcentratedData) || this.selectedProduct.ID == row.ID)) &&
          (mainProduct == undefined || (row.ProductLevel3.toLowerCase().indexOf(mainProduct) >= 0) && (!(this.selectedProductMain instanceof ConcentratedData) || this.selectedProductMain.ID == row.ID)))


        //מיון לפי מוצר- או לפי טקסט חיפוש
        .sort((a, b) => {
          let aIndex = a.ProductLevel3.toLowerCase().indexOf(sortPattern);
          let bIndex = b.ProductLevel3.toLowerCase().indexOf(sortPattern);

          return (aIndex < bIndex) ? -1 : ((aIndex > bIndex) ? 1 : 0);
        });

    }

    //init paging
    this.resetPaging();

  }


  clearFilter() {
    this.selectedMainCategory = undefined;
    this.selectedCategory = undefined;
    this.selectedProduct = undefined;
  }



  @ViewChild('dt') table: Table;

  resetPaging() {
    this.currentIndex = 0;
    this.table.reset();
  }

}





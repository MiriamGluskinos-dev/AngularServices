import { Component, Injectable } from "@angular/core";
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer
} from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ConfigService } from "./services/config.service";
import { Title } from "@angular/platform-browser";


@Directive({
  selector: "[appHtmlreaderHeader]"
})
export class HtmlreaderDirectiveHeader {
  headerUrl: any;
  private data: any;
  constructor(
    el: ElementRef,
    renderer: Renderer,
    http: HttpClient,
    private configService: ConfigService
  ) {
    this.headerUrl = this.configService.getConfiguration().headerUrl;
    //console.log("this.headerUrl" + this.headerUrl);
    http.get(this.headerUrl, { responseType: "text" }).subscribe(res => {
      //console.log(res);
      this.data = res;
      renderer.setElementProperty(el.nativeElement, "innerHTML", this.data);
    });
  }
}


@Directive({
  selector: "[appHtmlreaderFooter]"
})
export class HtmlreaderDirectiveFooter {
  footerUrl: any;
  private data: any;
  constructor(
    el: ElementRef,
    renderer: Renderer,
    http: HttpClient,
    private configService: ConfigService
  ) {
    this.footerUrl = this.configService.getConfiguration().footerUrl;
    //console.log("this.headerUrl" + this.headerUrl);
    http.get(this.footerUrl, { responseType: "text" }).subscribe(res => {
      // console.log(res);
      this.data = res;
      renderer.setElementProperty(el.nativeElement, "innerHTML", this.data);
    });
  }
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {

  title: string;
  descriptionLines: string[];

  constructor(private titleService: Title) { }

  // title: string = "טבלת מסי  יבוא מרוכזים";
  // descriptionLines: string[] = ['טבלת עזר המציגה שיעורי מסים מרוכזים החלים ביבוא מוצרים לישראל. הטבלה מיועדת בעיקר לשימוש ביבוא אישי.',
  //   'מסים מרוכזים כוללים מע"מ, מכס ומס קנייה אם חלים.'];


  // title: string = "שאילתת שערי מטבע";
  // descriptionLines: string[] = ['הצגת שערי המכס שנקבעו למטבע הנבחר או כלל המטבעות על פי טווח תאריכים.'];


  //איתחול כותרת הקומפוננטה ותיאור בעת טעינה
  onActivate(event: any) {

    this.title = event.title;
    this.descriptionLines = event.descriptionLines;


    //שינוי הכותרת של הדף בדפדפן
    this.titleService.setTitle(event.title == undefined ? 'רשות המסים בישראל' : event.title);

  }



}

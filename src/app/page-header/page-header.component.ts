import { Component, OnInit, Input } from '@angular/core';
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  //על מנת לאתחל את הערכים בHTML
  @Input() pageTitle: string;
  @Input() descriptionLines: string[];


  constructor() { }

  ngOnInit() {


  }

}

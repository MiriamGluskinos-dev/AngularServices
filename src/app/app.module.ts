import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

/*prime ng component*/
import { TableModule } from "primeng/table";
import { AutoCompleteModule } from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {AccordionModule} from 'primeng/accordion';
import {RadioButtonModule} from 'primeng/radiobutton';
import {MessagesModule} from 'primeng/messages';
import {TabMenuModule} from 'primeng/tabmenu';



/*project Component*/
import {
  AppComponent, HtmlreaderDirectiveHeader,
  HtmlreaderDirectiveFooter
} from './app.component';
import { SearchTableComponent } from './search-table/search-table.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { CurrencyComponent } from './currency/currency.component';
import { NavigationPageComponent } from './navigation-page/navigation-page.component';
import { VendorComponent } from './vendor/vendor.component';


import { HttpService } from "./services/http.service";
import { ConfigService } from "./services/config.service";
import { ConfigLoader } from "./services/config-loader";
import { FromatIEDatePipe } from './pipes/fromat-ie-date.pipe';
import { SystemTableComponent } from './system-table/system-table.component';
import {MorningMessageComponent} from './morning-message/morning-message.component';
import { MessageService } from 'primeng/api';

import { DetectionManifestComponent } from './detection-manifest/detection-manifest.component';
import { SearchTableFinalComponent } from './search-table-final/search-table-final.component';
import {PaginatorModule} from 'primeng/paginator';
import { BusinessComponent } from './business/business.component';
import {CaptchaModule} from 'primeng/captcha';



@NgModule({
  declarations: [
    AppComponent,
    HtmlreaderDirectiveHeader,
    HtmlreaderDirectiveFooter,
    SearchTableComponent,
    PageHeaderComponent,
    CurrencyComponent,
    NavigationPageComponent,
    FromatIEDatePipe,
    SystemTableComponent,
    MorningMessageComponent,
    VendorComponent,
    DetectionManifestComponent,
    SearchTableFinalComponent,
    BusinessComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    TableModule,
    AutoCompleteModule,
    CalendarModule,
    AccordionModule,
    RadioButtonModule,
    PaginatorModule,
    MessagesModule,
    TabMenuModule,
    CaptchaModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    },
    HttpService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

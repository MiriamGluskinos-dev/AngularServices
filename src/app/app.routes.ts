import { Routes } from '@angular/router';

import { NavigationPageComponent } from './navigation-page/navigation-page.component';
import { SearchTableComponent } from './search-table/search-table.component';
import { CurrencyComponent } from './currency/currency.component';
import { SystemTableComponent } from './system-table/system-table.component';
import { VendorComponent } from './vendor/vendor.component';
//import { SystemTableComponent } from './system-table/system-table.component';


//הגדרת דפי האפליקציה- יש לרשום פה את כל הקומפוננטות/דפים שיש באפליקציה
export const rootRouterConfig: Routes = [

    //הגדרת הדף הראשון שיעלה באפליקציה
    //{ path: '', component: NavigationPageComponent, pathMatch: 'full' },//במידה ורוצים שדף הקישורים יעלה ראשון יש לבחור שורה זו



    // { path: '', component: SearchTableComponent, pathMatch: 'full' },//במידה ורוצים שטבלת מסים מרוכזים יעלה ראשון יש להשתמש בשורה זו
    //{ path: 'importTable', component: SearchTableComponent },// במידה ולא רוצים שזה יהיה הדף הראשי יש לבחור שורה זו ולהוריד את השורה הקודמת



    //  { path: '', component: CurrencyComponent, pathMatch: 'full' },//במידה ורוצים בששערי מטבע יעלה ראשון יש להשתמש בשורה זו
    //{ path: 'currencyGates', component: CurrencyComponent },// במידה ולא רוצים שזה יהיה הדף הראשי יש לבחור שורה זו ולהוריד את השורה הקודמת


       { path: '', component: SystemTableComponent, pathMatch: 'full' },
    // { path: 'systemTables', component: SystemTableComponent }
    
//    { path: '', component: VendorComponent, pathMatch: 'full' },
    // { path: 'systemTables', component: SystemTableComponent }
];

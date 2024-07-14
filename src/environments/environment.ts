// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  configFile: 'assets/settingfolder/setting.json',
  apiUrl:'https://shaarolami-query.customs.mof.gov.il/',
  ReCaptcha: {
    jsUrl: 'https://www.google.com/recaptcha/api.js?render=explicit', // default
    siteKey: '6LcsWN4UAAAAAHsiBVkGFzwYBBOY7NPjsXP2SLAG'
  }
};


/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
/**
 *  <!--  6Ldw1M0UAAAAAAL8daGkfa686odzbbC5hXbtAQ3T טסט --> 
      <!-- 6LcsWN4UAAAAAHsiBVkGFzwYBBOY7NPjsXP2SLAG  פרוד-->
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

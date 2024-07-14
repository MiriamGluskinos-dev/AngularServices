import { Pipe, PipeTransform } from '@angular/core';


//נכתב בעקבות אי תמיכת אינטרנט אקספלורר בפילטר של תאריכים
@Pipe({
  name: 'fromatIEDate'
})
export class FromatIEDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let dateString: string = `${value.substr(8, 2)}/${value.substr(5, 2)}/${value.substr(0, 4)}`;

    return dateString;
  }

}

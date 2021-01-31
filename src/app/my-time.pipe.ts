import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myTime'
})
export class MyTimePipe implements PipeTransform {

  transform(value: number): string {
    var result = "";
    // suppressions des chiffres après la virgule
    value = (Math.floor(value * 10)) / 10;
    var MyHour = (value - (value % 3600)) / 3600;
    if (MyHour > 0) { result = result + MyHour + ` h ` };
    var MyMinut = (Math.floor((value / 60) % 60) * 10) / 10;
    if (MyMinut > 0) { result = result + MyMinut + ` min ` };
    var MySecond = (Math.floor((value % 60) * 10)) / 10;
    if (MySecond > 0) { result = result + MySecond.toFixed(0) + ` s` };
    return result  }

}

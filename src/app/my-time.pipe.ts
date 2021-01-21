import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myTime'
})
export class MyTimePipe implements PipeTransform {

  transform(value: number): string {
    var result = "";
    // suppressions des chiffres après la virgule
    value = (Math.round(value * 10)) / 10;

    var MyMinut = (value - (value % 60)) / 60;
    if (MyMinut > 0) { result = result + MyMinut + ` ' ` };
    var MySecond = (Math.round((value % 60) * 10)) / 10;
    if (MySecond > 0) { result = result + MySecond.toFixed(0) + ` "` };
    return result  }

}

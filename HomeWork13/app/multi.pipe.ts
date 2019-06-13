import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multi'
})
export class MultiPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log();
    console.log(args);
    let arr = [];
    for(let i = 0;i<args;i++){
      arr.push(value);
    }
    return arr.join(" ");
  }

}

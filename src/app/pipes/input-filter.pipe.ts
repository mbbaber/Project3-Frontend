import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputFilter'
})
export class InputFilterPipe implements PipeTransform {

  transform(items: Array<any>, searchThing: string): Array<any> {

    return items.filter(item=> 
      item.name.toLowerCase()
      .includes(searchThing.toLowerCase()));
  }

}

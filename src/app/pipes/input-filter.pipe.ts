import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputFilter'
})
export class InputFilterPipe implements PipeTransform {

  transform(items: Array<any>, searchThing: string): Array<any> {
    if (!items) {
      return [];
    }
    
//TODOIF: if we have time, come back this and make it so keyword doesn't disappear while typing
  
    return items.filter(item=> 

      item.name.toLowerCase().includes(searchThing.toLowerCase()) ||
      (item.keywords 
        && item.keywords.find(k => k.toLowerCase().includes(searchThing.toLowerCase())))
    );
  }


}

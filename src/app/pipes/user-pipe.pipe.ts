import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userPipe'
})
export class UserPipePipe implements PipeTransform {

  transform(items: Array<any>, searchThing: string): Array<any> {

    return items.filter(item=> 

      item.username.toLowerCase().includes(searchThing.toLowerCase())
      // item.keywords.includes(searchThing.toLowerCase())
    );
  }

}

import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { CanActivate , Router} from '@angular/router';
import 'rxjs/operator/toPromise';
import { UserService, User } from './user.service';
import { SubjectsService } from './subjects.service';

@Injectable()
export class AdminAuthenticateService implements CanActivate{

  isLoggedIn = false;
  redirectUrl: string = "/";
  userData: User;
  admin: any;
  constructor(
    public userService: UserService,
    public subService: SubjectsService,
    public router: Router
  ) { }

  // getAdmin(admin){
  //   this.admin = admin;
  //   console.log(admin)
  // }

  canActivate() {
      if(this.userService.isLoggedIn === true ){
        // console.log("ssss")
        return true;
      }else{
        // this.router.navigateByUrl('/');
        return false;
      }
  }
}

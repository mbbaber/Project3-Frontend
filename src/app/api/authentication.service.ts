import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { CanActivate , Router} from '@angular/router';
import 'rxjs/operator/toPromise';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService implements CanActivate{

  isLoggedIn = false;
  redirectUrl: string = "/";

  constructor(
    public userService: UserService,
    public router: Router
  ) { }


  canActivate() {
    if(this.userService.isLoggedIn === true){
      return true;
    }else{
      this.router.navigateByUrl('/');
      return false;
    }
  }
}

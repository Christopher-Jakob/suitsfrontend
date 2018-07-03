/**
 * Created by rickus on 5/9/18.
 */
import {Observable} from 'rxjs';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {Injectable} from '@angular/core'
import {UserAuthorizationService} from "../userauthorizationservice/userauthorizationservice";
import {map} from "rxjs/internal/operators";


@Injectable()
export class ClientSuitsAdminSuperUserGuard implements CanActivate{
  constructor(private userservice: UserAuthorizationService, private router: Router){}
  user ={
    id: null,
    isclient: false,
    issuitsviewer: false,
    issuitsadministrator: false,
    issuitssuperuser: false,
    isvenueuser: false

  };

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | boolean {

    let token = this.userservice.checklocalfortoken();
    if(token == null){
      token = this.userservice.checksessionfortoken();
      if(token == null){
        this.router.navigate(['/signin']);
        return false;
      }
      return this.userservice.returnauthorizetoken(token)
        .pipe(map(
          (req: any)=>{
            this.user = req;
            if(this.user.isclient || this.user.issuitsadministrator || this.user.issuitssuperuser){
              return true;
            }else{
              this.router.navigate(['/401']);
              return false;
            }
          },
          error => {
            this.router.navigate(['/signin']);
            return false;
          }
        ));


    }else{
      console.log('doing the local check');
      return this.userservice.returnauthorizetoken(token)
        .pipe(map(
          (req: any)=>{
            this.user = req;
            console.log('got the user object from the local');
            console.log(this.user);
            if(this.user.isclient || this.user.issuitsadministrator || this.user.issuitssuperuser){
              console.log('user has permissions from the local');
              return true;
            }else{
              console.log('user does not have permissions from the local');
              this.router.navigate(['/401']);
              return false;
            }
          },
          error => {
            console.log('error from the local authorization');
            this.router.navigate(['/signin']);
            return false;
          }
        ));
    }
  }

}

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
import {Injectable} from '@angular/core';
import {UserAuthorizationService} from "../userauthorizationservice/userauthorizationservice";
import {map} from "rxjs/internal/operators";


@Injectable()
export class SuitsGuard implements CanActivate{
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
            if(this.user.issuitsviewer || this.user.issuitsadministrator || this.user.issuitssuperuser){
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
      return this.userservice.returnauthorizetoken(token)
        .pipe(map(
          (req: any)=>{
            this.user = req;
            if(this.user.issuitsviewer|| this.user.issuitsadministrator || this.user.issuitssuperuser){
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

    }
  }

}

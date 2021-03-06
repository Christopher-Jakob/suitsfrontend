/**
 * Created by rickus on 6/22/18.
 */

/**
 * Created by rickus on 5/10/18.
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
export class IsNotVenueUserGuard implements CanActivate{
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
        return true;
      }
      return this.userservice.returnauthorizetoken(token)
        .pipe(map(
          (req: any)=>{
            this.user = req;
            if(this.user.isvenueuser){
              this.router.navigate(['/401']);
              return false;

            }else{
              return true;
            }
          },
          (error)=>{
            return true;
          }
        ));

    }
  }

}



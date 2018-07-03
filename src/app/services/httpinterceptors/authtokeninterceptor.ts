/**
 * Created by rickus on 5/10/18.
 */

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {UserAuthorizationService} from "../userservice/userauthorizationservice/userauthorizationservice";
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private tokenservice: UserAuthorizationService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let token = this.tokenservice.checklocalfortoken();
    if(token == null){
      token = this.tokenservice.checksessionfortoken();
    }
    if(token != null){
      if(request.url != 'https://suitsandtablesmedia.s3.amazonaws.com/'){
        request = request.clone({
          setHeaders: {
            Authorization: 'JWT ' + token
          }
        });
      }
    }
    return next.handle(request);
  }

}


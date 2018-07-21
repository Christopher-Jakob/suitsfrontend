/**
 * Created by rickus on 12/15/17.
 */

import {Injectable} from '@angular/core';
import{HttpClient, HttpParams} from "@angular/common/http";
import {browsevenuesdependancy} from "../../../urls/dependancyurls/browsevenuesdependancyurl";
import {searchvenue} from "../../../urls/mainroot/venue/venueurls";
import {BehaviorSubject} from "rxjs/index";
import {Observable} from 'rxjs';


@Injectable()
export class BrowseVenueDependancyService{
  constructor(private http: HttpClient){}

  browsevenuesdependancy(city){
    const url = browsevenuesdependancy + '/' + String(city);
    return this.http.get(url);
  }

  browsesearch(city, search){
    const url = searchvenue + String(city);
    let params = new HttpParams().set('search', search);
    return this.http.get(url, {params: params});
  }

  private citypksubject = new BehaviorSubject(null);

  sendcitypk(pk){
    this.citypksubject.next(pk);
  }

  receivecitypk():Observable<any>{
    return this.citypksubject.asObservable();
  }

}

/**
 * Created by rickus on 12/15/17.
 */

import {Injectable} from '@angular/core';
import{HttpClient} from "@angular/common/http";
import {browsevenuesdependancy} from "../../../urls/dependancyurls/browsevenuesdependancyurl";


@Injectable()
export class BrowseVenueDependancyService{
  constructor(private http: HttpClient){}

  browsevenuesdependancy(city){
    const url = browsevenuesdependancy + '/' + String(city);
    return this.http.get(url);
  }


}

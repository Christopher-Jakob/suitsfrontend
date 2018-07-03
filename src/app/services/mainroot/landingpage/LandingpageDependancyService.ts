import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {citieslist} from "../../../urls/dependancyurls/main/cities";
/**
 * Created by rickus on 3/30/18.
 */

@Injectable()
export class LandingpageDependancyService{

  constructor(private http: HttpClient){}

  getsearchcitylist(){
    return this.http.get(citieslist);
  }
}

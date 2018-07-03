import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {getsuitsuser} from "../../../../urls/dependancyurls/suitsadmin/suitssuitsusers/suitadmin.suitsusers.dependancy.service.urls";
/**
 * Created by rickus on 2/19/18.
 */

@Injectable()
export class SuitsAdminSuitsusersDependancyService{

  constructor(private http: HttpClient){}

  suitsuserget(pk){
    const url = getsuitsuser + '/' + String(pk);
    return this.http.get(url);
  }
}



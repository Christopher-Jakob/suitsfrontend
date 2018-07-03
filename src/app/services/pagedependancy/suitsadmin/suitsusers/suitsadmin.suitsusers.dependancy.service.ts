import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {getallsuitsusers} from "../../../../urls/dependancyurls/suitsadmin/suitssuitsusers/suitadmin.suitsusers.dependancy.service.urls";
/**
 * Created by rickus on 2/18/18.
 */

@Injectable()
export class SuitsAdminSuitsUsersDependancyService{

  constructor(private http: HttpClient){}

  getsuitsuserslist(){
    this.http.get(getallsuitsusers);
  }
}

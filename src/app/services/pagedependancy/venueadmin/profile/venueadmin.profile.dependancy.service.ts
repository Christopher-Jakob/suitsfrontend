/**
 * Created by rickus on 2/2/18.
 */

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {settingsroot} from "../../../../urls/dependancyurls/suitsadmin/suitssettings/suitssettings.dependancy.urls";

@Injectable()
export class VenueAdminProfileDependancyService{

  constructor(private http: HttpClient){}

  getvenueattributeselections(){
    return this.http.get(settingsroot);
  }
}

/**
 * Created by rickus on 12/31/17.
 */

import {settingsroot
} from '../../../../urls/dependancyurls/suitsadmin/suitssettings/suitssettings.dependancy.urls';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class SuitsAdminDependancySettings{
  constructor(private http: HttpClient){}

  getallcityobjects(){
    return this.http.get(settingsroot);
  }
}

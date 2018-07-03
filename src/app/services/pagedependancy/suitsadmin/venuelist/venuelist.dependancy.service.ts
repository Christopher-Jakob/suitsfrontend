/**
 * Created by rickus on 2/3/18.
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {venuelist} from '../../../../urls/dependancyurls/suitsadmin/venuelist/venuelist.dependancy.urls';

@Injectable()
export class VenueListDependancyService{
  constructor(private httpclient: HttpClient){}

  //get venuelist
  getvenuelist(){
    return this.httpclient.get(venuelist);
  }
}

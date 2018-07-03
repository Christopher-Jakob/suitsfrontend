/**
 * Created by rickus on 12/18/17.
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {amenitiesdependancy, setuptypedependancy} from '../../../urls/dependancyurls/roompagedependancyurls';


@Injectable()
export class RoompageDependancyService{
  constructor(private httpclient: HttpClient){}

  // get list of all room amenities
  getallroomamenities(){
    return this.httpclient.get(amenitiesdependancy);
  }

  // get list of all room set up types
  getallsetuptypes(){
    return this.httpclient.get(setuptypedependancy);
  }
}

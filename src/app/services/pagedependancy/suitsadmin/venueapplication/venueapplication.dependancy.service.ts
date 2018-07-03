/**
 * Created by rickus on 1/26/18.
 */

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
  venueapplicationgetallvadr, venueapplicationgetallexperientialtypes,
  venueapplicationgetallcuisines
} from "../../../../urls/dependancyurls/suitsadmin/venueapplication/venueapplication.dependancy.urls";
import {suitscitiesandnestedneighborhoods} from "../../../../urls/dependancyurls/suitsadmin/suitssettings/suitssettings.dependancy.urls";
import {getandcreateneighborhoodsbycity} from "../../../../urls/suitsadmin/suitssettings/suitssettings.url";


@Injectable()
export class VenueapplicationDependancyService{
  constructor(private http: HttpClient){}

  // get all venue decline reasons
  getallvenuedecllinereasons(){
    return this.http.get(venueapplicationgetallvadr);
  }

  getcitiesandneighborhoods(){
    return this.http.get(suitscitiesandnestedneighborhoods);
  }

  getexperientialtypes(){
    return this.http.get(venueapplicationgetallexperientialtypes);
  }

  getneighborhoodsbycities(citypk){
    const url = getandcreateneighborhoodsbycity + '/' + String(citypk);
    return this.http.get(url);
  }

  getcuisines(){
    return this.http.get(venueapplicationgetallcuisines);
  }



}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {getvenueapplicaitonlisturl} from "../../../../urls/dependancyurls/suitsadmin/venueapplicationlist/venueapplicationlist.dependancy.urls";
/**
 * Created by rickus on 3/4/18.
 */


@Injectable()
export class VenueApplicationListDependancyService{

  constructor(private http: HttpClient){}

  getvenueapplicationlist(){
    return this.http.get(getvenueapplicaitonlisturl);
  }

}

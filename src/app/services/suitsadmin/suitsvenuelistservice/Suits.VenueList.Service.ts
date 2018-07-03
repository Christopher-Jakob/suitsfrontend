import {HttpClient} from "@angular/common/http";
import {venuelistroot} from "../../../urls/suitsadmin/suitsvenuelisturls/SuitsAdmin.VenueList.urls";
import {Injectable} from "@angular/core";
/**
 * Created by rickus on 2/19/18.
 */

@Injectable()
export class SuitsVenueListService{

  constructor(private http: HttpClient){}

  deactivatevenue(body, pk){
    const url = venuelistroot + '/' + String(pk);
    return this.http.put(url, body);
  }

  activatevenue(body, pk){
    const url = venuelistroot + '/' + String(pk);
    return this.http.put(url, body);
  }

  deletevenue(pk){
    const url = venuelistroot + '/' + String(pk);
    return this.http.delete(url);
  }
}

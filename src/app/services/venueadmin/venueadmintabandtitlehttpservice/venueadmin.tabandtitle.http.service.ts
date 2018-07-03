import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {updatevenuename} from '../../../urls/venueadmin/venueadmintableandtitlehttpserviceurls/venueadmin.tableandtitle.http.service.urls';
import {venuelistroot} from "../../../urls/suitsadmin/suitsvenuelisturls/SuitsAdmin.VenueList.urls";
/**
 * Created by rickus on 2/6/18.
 */

@Injectable()
export class VenueAdminTableandtitleHttpService{

  constructor(private http: HttpClient){}

  updatevenuename(payload, pk){
    const url = venuelistroot + '/' + String(pk);
    return this.http.put(url, payload);
  }
}

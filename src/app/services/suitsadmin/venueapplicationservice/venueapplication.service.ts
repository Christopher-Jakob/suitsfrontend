/**
 * Created by rickus on 1/25/18.
 */

import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {
  venuegetcoordinates, getvenueapplication, createnewvenue,
  editdeleteunapprovedvenue, declinevenueapplicationdeletedeclinedvenueapplication
} from '../../../urls/suitsadmin/venueapplication/venueapplication.url';


@Injectable()
export class VenueApplicationService{
  constructor(private http: HttpClient){}

  // take a venue application and turn it into a venue

  getvenueapplication(pk){
    const url = getvenueapplication + '/' + pk;
    return this.http.get(url);
  }

  createvenue(body){
    return this.http.post(createnewvenue, body);
  }

  approvevenueappliction(body, pk){
    const url = editdeleteunapprovedvenue + '/' + String(pk);
    return this.http.put(url, body);

  }

  getvenuecoordinates(body){
    return this.http.post(venuegetcoordinates, body);
  }

  declinevenueapplication(body, pk){
    const url = declinevenueapplicationdeletedeclinedvenueapplication + '/' + String(pk);
    return this.http.put(url, body);
  }


}


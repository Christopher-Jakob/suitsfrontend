import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {declineapplicationurl} from "../../../urls/suitsadmin/suitsdeclinedvenues/suitsdeclinevenue.urls";
/**
 * Created by rickus on 3/9/18.
 */

@Injectable()
export class DeclinedVenueService{

  constructor(private http: HttpClient){}

  deletedeclinedvenue(pk){
    const url = declineapplicationurl + '/' + String(pk);
    return this.http.delete(url);
  }

  restoredeclinedvenue(body, pk){
    const url = declineapplicationurl + '/' + String(pk);
    return this.http.put(url, body);
  }

  getdeclinedvenuedetail(pk){
    const url = declineapplicationurl + '/' + String(pk);
    return this.http.get(url);

  }
}

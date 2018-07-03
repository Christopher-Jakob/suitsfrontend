import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {
  amenitiesandseating, roomdetaildescription, roomdetailphoto, roomdetailtopparams
} from "../../../urls/venueadmin/venueadminvenueroomdetailurls/venueadmin.venueroom.detail.urls";
import {venueroomlist1, venueroomlist2} from "../../../urls/suitsadmin/venueadmin/venueadmin.urls";
/**
 * Created by rickus on 2/11/18.
 */

@Injectable()
export class VenueAdminVenueRoomDetailService{

  constructor(private http: HttpClient){}

  getroom(venuepk, roompk){
    const url = venueroomlist1 + '/' + String(venuepk) + venueroomlist2 + '/' + String(roompk);
    return this.http.get(url);
  }

  updateroom(payload, venuepk, roompk){
    const url = venueroomlist1 + '/' + String(venuepk) + venueroomlist2 + '/' + String(roompk);
    return this.http.put(url, payload);
 }

 deleteroom(venuepk, roompk){
    const url = venueroomlist1 + '/' + String(venuepk) + venueroomlist2 + '/' + String(roompk);
    return this.http.delete(url);
 }


}

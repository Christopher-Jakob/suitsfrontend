import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {
  addroomurl,
  venueadminroomlisturl
} from "../../../urls/venueadmin/venueadminroomlisturl/venueadmin.roomlist.url";
import {venueroomlist1, venueroomlist2} from "../../../urls/suitsadmin/venueadmin/venueadmin.urls";
/**
 * Created by rickus on 2/10/18.
 */

@Injectable()
export class VenueAdminRoomListService{

  constructor(private http: HttpClient){}

  deleteroom(vpk,rpk){
    const url = venueroomlist1 + '/' + String(vpk)  + venueroomlist2 + '/' + String(rpk);
    return this.http.delete(url);
  }


  addroom(venuepk){
    const url = venueroomlist1 + '/' + String(venuepk) + venueroomlist2;
    return this.http.post(url, venuepk);
  }

  roomlist(venuepk){
    const url = venueroomlist1 + '/' + String(venuepk) + venueroomlist2;
    return this.http.get(url);
  }
}

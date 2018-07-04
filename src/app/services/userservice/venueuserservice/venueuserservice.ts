/**
 * Created by rickus on 5/4/18.
 */

import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {venuelistbyuser, changepassword, venuepermission, venueroot, venueuserlist} from "../../../urls/user/venueuser/venueuser";
import {profilephotoinit, userroot} from "../../../urls/user/rootuserurl";


@Injectable()
export class VenueUserService{
  constructor(private http: HttpClient){}

  venueuserlist(){
    return this.http.get(venueuserlist);
  }

  updatevenueuser(venuepk, userpk){
    const url = venueroot + String(venuepk) + '/' + String(userpk);
    return this.http.get(url);
  }

  createvenueuser(payload){
    return this.http.post(venueroot, payload);
  }

  deletevenueuser(payload){
    return this.http.put(venueroot, payload);
  }

  getvenueusers(pk){
    const url = venuepermission + String(pk);
    return this.http.get(url);
  }

  getauthorizedvenues(){
    return this.http.get(venuelistbyuser);

  }

  getuser(pk){
    const url = userroot + String(pk);
    return this.http.get(url);
  }

  edituser(payload, pk){
    const url = userroot + String(pk);
    return this.http.put(url, payload);
  }

  deleteuser(pk){
    const url = userroot + String(pk);
    return this.http.delete(url);
  }

  photoinit(pk){
    const url = profilephotoinit + String(pk);
    return this.http.get(url);
  }

  changepassword(pk, payload){
    const url = changepassword + String(pk);
    return this.http.put(url, payload);
  }

}

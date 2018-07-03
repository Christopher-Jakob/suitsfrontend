import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {
  changepassword, editprofile, uploadphoto
} from "../../../urls/venueadmin/venueadminuserprofileurls/venueadmin.venueuserprofile.urls";
/**
 * Created by rickus on 2/14/18.
 */

@Injectable()
export class VenueUserProfileService{

  constructor(private http: HttpClient){}

  edituserprofile(payload){
    return this.http.put(editprofile,payload);
  }

  uploadprofileimage(payload){
    return this.http.post(uploadphoto, payload);
  }

  changeuserpassword(payload){
    return this.http.post(changepassword, payload, {observe:'response'});
  }
}

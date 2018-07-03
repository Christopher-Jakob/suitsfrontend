import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {
  changeuserpassword, uploadphoto, uploadprofileinformation
} from "../../../urls/suitsadmin/suitsuserprofile/suitsadmin.suitsuserprofile.url";
/**
 * Created by rickus on 2/19/18.
 */


@Injectable()
export class SuitsAdminSuitsUserProfileService{

  constructor(private http: HttpClient){}

  uploaduserprofileimage(payload){
    return this.http.post(uploadphoto, payload);
  }

  uploaduserprofileinformation(payload){
    return this.http.put(uploadprofileinformation, payload);

  }

  changepuserpassword(payload){
    return this.http.put(changeuserpassword, payload, {observe:'response'});
  }
}

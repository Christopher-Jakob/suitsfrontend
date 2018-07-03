import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
  groupphotoupload, masterrfpinfo,
  venueprofileinfo, venueusers
} from '../../../urls/venueadmin/venueadmincreateediturls/venueadmin.createedit.urls';
/**
 * Created by rickus on 2/7/18.
 */

@Injectable()
export class VenueAdminCreateEditService{

  constructor(private http: HttpClient){}

  uploadgroupimage(payload){
    return this.http.put(groupphotoupload, payload);
  }

  editvenueprofile(payload){
    return this.http.put(venueprofileinfo, payload);
  }

  editmasterrfpemail(payload){
    return this.http.put(masterrfpinfo, payload);
  }

  addnewvenueuser(payload){
    return this.http.put(venueusers, payload);
  }

  // is put request since you need payload to know which users to delete
  deletevenueusers(payload){
    return this.http.put(venueusers, payload, {observe: 'response'});
  }



}

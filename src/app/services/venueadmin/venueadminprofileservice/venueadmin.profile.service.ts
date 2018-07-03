/**
 * Created by rickus on 1/31/18.
 */
import {acceptedimagetypes} from '../../../constants/constants';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {venueprofileimageendpoint, venueprofiledescriptionendpoint, venueprofilehoursofoperation, venueprofilesamplemenupdfendpoint, venueprofileparkingoptions, venueprofileattributes} from '../../../urls/venueadmin/venueadminprofileurls/venueadmin.profile.urls';
import {venuelistroot} from "../../../urls/suitsadmin/suitsvenuelisturls/SuitsAdmin.VenueList.urls";

@Injectable()
export class VenueAdminProfileService{

  constructor(private http: HttpClient){}

  venuephotovalidcheck(imagefile){
    for(let at in acceptedimagetypes){
      if(imagefile.type === acceptedimagetypes[at]){
        return true;
      }
    }
    return false;
  }

  // post venue profile images to server
  uploadvenueprofileimages(imagefilesandpk){
    return this.http.post( venueprofileimageendpoint, imagefilesandpk, {observe:'response'});
  }


  postvenueprofiledescription(payload, pk){
    const url = venuelistroot + '/' + String(pk);
    return this.http.put(url, payload);
  }

  postvenueprofilehoursofoperation(payload, pk){
    const url = venuelistroot + '/' + String(pk);
    return this.http.put( url , payload);
  }

  uploadsamplemenupdf(pdffileandpk){
    return this.http.post( venueprofilesamplemenupdfendpoint, pdffileandpk, {observe: 'response'});
  }

  deletesamplemenupdf(pk){
    const url = venueprofilesamplemenupdfendpoint + '/' + String(pk);
    return this.http.delete(url, {observe: 'response'});
  }

  updatevenueprofileparking(body, pk){
    const url = venuelistroot + '/' + String(pk);
    return this.http.put(url, body);
  }

  updatevenueprofileattributes(body, pk){
    const url = venuelistroot + '/' + String(pk);
    return this.http.put(url, body);
  }

  // this will be the default service once i do clean up
  venueprofileupdate(body,pk){
    const url = venuelistroot + '/' + String(pk);
    return this.http.put(url, body);
  }

  deletevenueprofilephoto(pk){
    const url = venueprofileimageendpoint + '/' + String(pk);
    return this.http.delete(url, {observe: 'response'});
  }


}



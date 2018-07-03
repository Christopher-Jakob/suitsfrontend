import {BehaviorSubject, Observable} from "rxjs";
import {venuelistroot} from "../../../urls/suitsadmin/suitsvenuelisturls/SuitsAdmin.VenueList.urls";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
/**
 * Created by rickus on 2/16/18.
 */

@Injectable()
export class VenueAdminParentAdminService{

  constructor(private http: HttpClient){}

  // subject to send over and receive permission
  private permission = new BehaviorSubject(null);

  sendpermission(permission){
    this.permission.next(permission);
  }

  receivepermission():Observable<any>{
    return this.permission.asObservable();
  }

  // this will be the default service once i do clean up
  venueprofileupdate(body,pk){
    const url = venuelistroot + '/' + String(pk);
    return this.http.put(url, body);
  }
}

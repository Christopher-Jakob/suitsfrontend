import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {getclientobject, profileedit, profilephotoupload} from "../../../urls/mainroot/clientdashboard/mainroot.clientdashboard.urls";
import {BehaviorSubject, Observable} from "rxjs";
/**
 * Created by rickus on 2/12/18.
 */

@Injectable()
export class MainRootClientDashboardService{

  constructor(private http: HttpClient){}

  uploadimage(payload){
    return this.http.put(profilephotoupload, payload);
  }

  updateprofile(payload){
    return this.http.put(profileedit, payload);
  }

  private clientobject = new BehaviorSubject(null);

  sendclientobject(payload){
    this.clientobject.next(payload);

  }

  receiveclientobject():Observable<any>{
    return this.clientobject.asObservable();
  }

  getclientobject(pk){
    const url = getclientobject + String(pk);
    return this.http.get(url);
  }

  private clientpermission = new BehaviorSubject(null);

  sendclientpermission(payload){
    this.clientpermission.next(payload);
  }

  receiveclientpermission(){
    return this.clientpermission.asObservable();
  }

  deleteprofile(pk){
    return this.http.delete(profileedit + String(pk),  {observe: 'response'});
  }

}

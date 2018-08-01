/**
 * Created by rickus on 5/2/18.
 */
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {clientphotoinit, clientroot, clientuserlist, clientverify} from "../../../urls/user/clientuser/clientuserurls";
import {BehaviorSubject, Observable} from "rxjs/index";

@Injectable()
export class ClientUserService{
  constructor(private http: HttpClient){}

  createclientuser(payload){
    return this.http.post(clientroot, payload);
  }

  updateclientuser(pk, payload){
    const url = clientroot + String(pk);
    return this.http.put(url, payload);
  }

  clientuserlist(){
    return this.http.get(clientuserlist);
  }

  clientverify(payload){
    return this.http.post(clientverify, payload);
  }

  getclientuser(pk){
    const url = clientroot + String(pk);
    return this.http.get(url);
  }

  clientphotoinit(pk){
    const url = clientphotoinit + String(pk);
    return this.http.get(url);
  }

  editpassword( pk, payload){
    const url = clientroot + String(pk);
    return this.http.put(url, payload);
  }

  deleteprofile(pk){
    const url = clientroot + String(pk);
    return this.http.delete(url);
  }

  private clientpermission = new BehaviorSubject(null);

  sendclientpermission(permission){
    this.clientpermission.next(permission);
  }

  receiveclientpermission(): Observable<any>{
    return this.clientpermission.asObservable();
  }

  private clientobject = new BehaviorSubject(null);

  sendclientobject(object){
    this.clientobject.next(object);
  }

  receiveclientobject(): Observable<any>{
    return this.clientobject.asObservable();
  }


}

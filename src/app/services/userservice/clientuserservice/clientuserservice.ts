/**
 * Created by rickus on 5/2/18.
 */
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {clientroot, clientuserlist, clientverify} from "../../../urls/user/clientuser/clientuserurls";

@Injectable()
export class ClientUserService{
  constructor(private http: HttpClient){}

  createclientuser(payload){
    return this.http.post(clientroot, payload);
  }

  clientuserlist(){
    return this.http.get(clientuserlist);
  }

  clientverify(payload){
    return this.http.post(clientverify, payload);
  }
}

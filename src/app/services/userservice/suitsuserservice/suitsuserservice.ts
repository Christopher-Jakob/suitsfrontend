/**
 * Created by rickus on 5/3/18.
 */
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {suitsuserlist, suitsuserroot} from "../../../urls/user/suitsuser/suitsuserurls";

@Injectable()
export class SuitsUserService{
  constructor(private http: HttpClient){}

  createsuitsuser(payload){
    return this.http.post(suitsuserroot, payload);
  }

  suitsuserlist(){
    return this.http.get(suitsuserlist);
  }
}


import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {changeclientpassword} from "../../../urls/mainroot/clientdashboard/mainroot.clientdashboard.urls";
/**
 * Created by rickus on 2/16/18.
 */

@Injectable()
export class MainrootClientProfileService{

  constructor(private http:HttpClient){}

  editpassword(payload){
    return this.http.post(changeclientpassword, payload, {observe: 'response'});
  }
}

/**
 * Created by rickus on 5/12/18.
 */
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {forgotpasswordroot, forgotpasswordupdate} from "../../../urls/user/forgotpassword/forgotpasswordurls";

@Injectable()
export class ForgotPasswordService{
  constructor(private http: HttpClient){}

  forgotpassword(payload){
    return this.http.post(forgotpasswordroot, payload);
  }

  updatepassword(payload, passwordupdatestring){
    const url = forgotpasswordupdate + String(passwordupdatestring);
    return this.http.post(url, payload);
  }
}

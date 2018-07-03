/**
 * Created by rickus on 5/1/18.
 */
import {HttpClient} from "@angular/common/http";
import {uservalidate} from "../../../urls/user/validate/uservalidateurl";
import {userroot} from "../../../urls/user/rootuserurl";
import {Injectable} from "@angular/core";

@Injectable()
export class Userservice{
  constructor(private http: HttpClient){}

  getuserbyvalidationstring(usertype, validationstring){
    const url = userroot + String(usertype) + String(uservalidate) + String(validationstring);
    console.log('this is the verification string');
    console.log(url);
    return this.http.get(url);
  }

  setuuserpassword(usertype, validationstring, payload){
    const url = userroot + String(usertype) + String(uservalidate) + String(validationstring);
    return this.http.put(url, payload);
  }
}




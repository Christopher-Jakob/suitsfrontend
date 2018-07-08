import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {savedrfps, sendinitalrfp} from "../../urls/pagemixins/make-rfpurls";
/**
 * Created by rickus on 7/6/18.
 */

@Injectable()
export class RFPService{

  constructor(private http: HttpClient){}

  getsavedrfps(){
    return this.http.get(savedrfps);
  }

  emailrfp(payload, venueid){
    const url = sendinitalrfp + '/' + String(venueid);
    return this.http.post(url, payload);
  }

}

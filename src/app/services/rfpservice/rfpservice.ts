import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {savedrfps, sendinitalrfp, sentrfps} from "../../urls/pagemixins/make-rfpurls";
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

  getreceivedrfps(venuepk){
    const url = sentrfps + '/' + String(venuepk);
    return this.http.get(url);
  }

  getsendtrfps(){
    return this.http.get(sentrfps);
  }

}

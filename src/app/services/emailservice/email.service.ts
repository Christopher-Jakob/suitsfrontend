import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {rfpemailurl} from "../../urls/transmission/email/email.url";
/**
 * Created by rickus on 4/3/18.
 */
@Injectable()
export class EmailService{
  constructor(private Http: HttpClient) { }

  emailrfp(payload) {
    return this.Http.post(rfpemailurl , payload);
  }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {sendinitalrfp} from '../../urls/pagemixins/make-rfpurls';
/**
 * Created by rickus on 12/28/17.
 */

@Injectable()
export class Makerfpservice{
  constructor(private httpclient: HttpClient){}

  emailrfp(body, pk){
    const url = sendinitalrfp + '/' + String(pk);
    console.log('here it goes in the sending and the feeling');
    return this.httpclient.post(url, body);
  }
}

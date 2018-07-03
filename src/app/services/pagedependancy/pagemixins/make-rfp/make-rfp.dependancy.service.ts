
/**
 * Created by rickus on 12/28/17.
 */

import {HttpClient} from "@angular/common/http";
import {geteventpurposetypes} from '../../../../urls/dependancyurls/pagemixins/make-rfpdependancyurls';
import {Injectable} from "@angular/core";

@Injectable()
export class makerfpdependancyservice{
  constructor(private httpclient : HttpClient){}

  // get event purpose types
  geteventpurpose(){
    return this.httpclient.get(geteventpurposetypes);
  }
}

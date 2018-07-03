import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {suitssettingscuisine, suitssettingsexperientialtypes
} from "../../../urls/suitsadmin/suitssettings/suitssettings.url";
import {unapprovedvenuecreate} from "../../../urls/mainroot/venue/venueurls";
/**
 * Created by rickus on 3/7/18.
 */

@Injectable()
export class JoinModalService{

  constructor(private http: HttpClient){}


  getcuisines(){
    return this.http.get(suitssettingscuisine);
  }

  getexperientialtypes(){
    return this.http.get(suitssettingsexperientialtypes);
  }

}

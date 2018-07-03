import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {declinedvenuelist} from "../../../../urls/dependancyurls/suitsadmin/declinedvenues/declinedvenues.dependancy.url";
/**
 * Created by rickus on 3/8/18.
 */

@Injectable()
export class DeclinedVenueApplication{

  constructor(private http: HttpClient){}

  declinedvenueapplicationlist(){
    return this.http.get(declinedvenuelist);
  }
}

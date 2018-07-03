import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {venuelistroot} from "../../../urls/suitsadmin/suitsvenuelisturls/SuitsAdmin.VenueList.urls";
/**
 * Created by rickus on 2/6/18.
 */

@Injectable()
export class VenueAdminVolleyService{

  constructor(private http: HttpClient){}

  private volley = new BehaviorSubject(null);
  private roomvolley = new BehaviorSubject(null);
  private venueupdated = new BehaviorSubject(null);

  getvenueobject(pk){
    const url = venuelistroot + '/' + String(pk);
    return this.http.get(url);
  }

  sendobject(venueobject){
    this.volley.next(venueobject);
  }

  receiveobject(): Observable<any> {
    return this.volley.asObservable();
  }

  sendroom(room){
    this.roomvolley.next(room);
  }

  receiveroom(): Observable<any>{
    return this.roomvolley.asObservable();
  }

  sendupdated(){
    this.venueupdated.next(true);
  }

  receiveupdated() : Observable<any>{
    return this.venueupdated.asObservable();
  }

}

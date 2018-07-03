/**
 * Created by rickus on 2/5/18.
 */
import {Observable, BehaviorSubject} from "rxjs";

export class VenueAdminInceptionService{
  constructor(){}

  private venueinceptionparams = new BehaviorSubject(null);

  sendparams(payload){
    this.venueinceptionparams.next(payload);
  }

  recevieparams():Observable<any>{
    return this.venueinceptionparams.asObservable();

  }

  private tabtitletoggle = new BehaviorSubject(null);

  sendsignal(payload){
    this.tabtitletoggle.next(payload);
  }

  recevivesignal():Observable<any>{
    return this.tabtitletoggle.asObservable()
  }

}




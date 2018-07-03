/**
 * Created by rickus on 12/15/17.
 */

import {Observable, BehaviorSubject} from 'rxjs';

export class BrowsevenuescomponentcommService{
  constructor(){}

  //filtervenue subject
  private venuelistsubject = new BehaviorSubject(null);
  private selectedcitysubject = new BehaviorSubject(null);
  private statesubject = new BehaviorSubject(null);
  selectedcity;

  sendvenuelist(venueslist){
    this.venuelistsubject.next(venueslist);
  }

  recevivevenuelist():Observable<any>{
    return this.venuelistsubject.asObservable();
  }

  // used to send and receive selected cities between components

  sendselectedcity(city){
    this.selectedcitysubject.next(city);
  }

  receiveselectedcity():Observable<any>{
    return this.selectedcitysubject.asObservable();
  }


  setselectedcity(city){
    this.selectedcity = city;
    this.sendselectedcity(this.selectedcity);
  }

  // send a state of show, unshow.
  sendstate(state){
    this.statesubject.next(state);
  }

  receivestate(): Observable<any>{
    return this.statesubject.asObservable();
  }






}

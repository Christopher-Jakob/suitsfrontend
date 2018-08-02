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
  private loadstate = new BehaviorSubject(null);
  selectedcity;

  sendloadstate(state){
    this.loadstate.next(state);
  }

  receviveloadstate():Observable<any>{
    return this.loadstate.asObservable();
  }

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

  //used on to show loading circle or not







}

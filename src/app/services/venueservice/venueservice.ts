/**
 * Created by rickus on 12/15/17.
 */

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {browsevenuesroot, unapprovedvenuecreate} from '../../urls/mainroot/venue/venueurls';

import {Observable, Subject, BehaviorSubject} from 'rxjs';
import {getvenuebynameurl} from "../../urls/dependancyurls/main/venuepage/venuepageurls";

@Injectable()
export class VenueService{
  constructor(private http: HttpClient){}
  private venuesend = new BehaviorSubject(null);
  private roomsend = new Subject();

  // get all venues for a city
  browsevenues(city, queryparams){
    console.log('this is the queryparams');
    console.log(queryparams);
    let params = new HttpParams();
    if(queryparams != null){
      if(queryparams.neighborhoods != null){
        const neighborhoodqueryparam = queryparams.neighborhoods;
        for(const param of neighborhoodqueryparam){
          params = params.append('neighborhood', param);
        }
        if(queryparams.venuetypes != null){
          const venuetypesqueryparam = queryparams.venuetypes;
          for(const param of venuetypesqueryparam){
            params = params.append('venuetype', param);
          }
        }
        if(queryparams.privacy != null){
          const privacytypes = queryparams.privacy;
          for(const param of privacytypes){
            params = params.append('privacy', param);
          }
        }
        if(queryparams.experiential != null){
          const experientialqueryparam = queryparams.experiential;
          for(const param of experientialqueryparam){
            params = params.append('experiential', param);
          }
        }
        if(queryparams.cuisine != null){
          const cuisinequeryparam = queryparams.cuisine;
          for(const param of cuisinequeryparam){
            params = params.append('cuisine', param);
          }
        }
        if(queryparams.surroundsound != null){
          params = params.append('surroundsound', 'true');
        }
        if(queryparams.stage != null){
          params = params.append('stage', 'true');
        }
        if(queryparams.television != null){
          params =params.append('television', 'true');
        }
        if(queryparams.screenandprojector != null){
          params = params.append('screenandprojector', 'true');
        }
        if(queryparams.naturallight != null){
          params = params.append('naturallight', 'true');
        }
        if(queryparams.wifi != null){
          params = params.append('wifi','true');
        }
        if(queryparams.wheelchairaccessible != null){
          params = params.append('wheelchairaccessible', 'true');
        }
        if(queryparams.outdoorseating != null){
          params = params.append('outdoorseating', 'true');
        }
        if(queryparams.cocktailstanding != null){
          params = params.append('cocktailstanding','true');
        }
        if(queryparams.classroom != null){
          params = params.append('classroom', 'true');
        }
        if(queryparams.ushape != null){
          params = params.append('ushape', 'true');
        }
        if(queryparams.sixtyrounds != null){
          params = params.append('sixtyrounds', 'true');
        }
        if(queryparams.boardroom != null){
          params = params.append('boardroom', 'true');
        }
        if(queryparams.theater != null){
          params = params.append('theater', 'true');
        }
        if(queryparams.hallowsquare != null){
          params = params.append('hallowsquare', 'true');
        }
        if(queryparams.seatedcapacity != null){
          params = params.append('seatedcapacity', queryparams.seatedcapacity);
        }
        if(queryparams.standingcapacity != null){
          params = params.append('standingcapacity', queryparams.standingcapacity);
        }
        if(queryparams.minimumspend != null){
          params = params.append('minimumspend', queryparams.minimumspend);
        }

      }
    }
    const browseurl = browsevenuesroot + String(city);
    return this.http.get(browseurl, {params: params});
  }

  // send venue over to venue page


  sendVenue(venue){
    this.venuesend.next(venue);
  }

  receiveVenue(): Observable<any>{
    return this.venuesend.asObservable();

  }
  // end send venue over to venue page

  // start send venue room


  sendRoom(room){
    this.roomsend.next(room);

  }

  receiveRoom(): Observable<any>{
    return this.roomsend.asObservable();
  }
  // end send  venue room over to room page

  getvenuebyname(venuename, preview){
    let params = new HttpParams();
    if(preview){
      params = params.append('option', 'true');
    }
    const url = getvenuebynameurl + venuename;
    return this.http.get(url, {params: params});
  }

  submitapplication(body){
    return this.http.post(unapprovedvenuecreate,body);
  }

}

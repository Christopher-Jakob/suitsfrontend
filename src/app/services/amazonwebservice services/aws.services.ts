import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {
  roomimagepolicyandcreate, samplemenupolicyandcreate,
  venueimagepolicyandcreate, venueprofileimage, cuisineimagepolicy
} from "../../urls/amazonwebserviceurls/aws.urls";
/**
 * Created by rickus on 3/18/18.
 */

@Injectable()
export class AwsService {
  constructor(private http: HttpClient){}

  uploadtos3(url, payload){
    return this.http.post(url, payload);

  }

  samplemenucreateandpolicy(venuepk, payload){

    const url =  samplemenupolicyandcreate + '/' + String(venuepk);
    return this.http.post(url, payload);
  }

  updatesamplemenuinstance(samplemenupk, payload){
    const url = samplemenupolicyandcreate + '/' + String(samplemenupk);
    return this.http.put(url, payload);
  }

  deletesamplemenuinstace(samplemenupk){
    const url = samplemenupolicyandcreate + '/' + String(samplemenupk);
    return this.http.delete(url);
  }

  cuisineimagecreateandpolicy(venuepk, payload){
    const url = cuisineimagepolicy + '/' + String(venuepk);
    return this.http.post(url, payload);
  }

  cuisineimageupdate(cuisineimagepk, payload){
    const url = cuisineimagepolicy + '/' + String(cuisineimagepk);
    return this.http.put(url, payload);
  }

  cuisineimagedelete(cuisineimagepk){
    const url = cuisineimagepolicy + '/' + String(cuisineimagepk);
    return this.http.delete(url);
  }

  venuephotocreateandpolicy(venuepk, payload){
    const url = venueimagepolicyandcreate + '/' + String(venuepk);
    return this.http.post(url, payload);
  }

  updatevenuephotoinstance(venuephotopk, payload){
    const url = venueimagepolicyandcreate + '/' + String(venuephotopk);
    return  this.http.put(url, payload);
  }

  deletevenuephotoinstance(venuephotopk){
    const url = venueimagepolicyandcreate + '/' + String(venuephotopk);
    return this.http.delete(url);
  }

  roomphotocreateandpolicy(roompk,  payload){
    const url = roomimagepolicyandcreate + '/' + String(roompk);
    return this.http.post(url, payload);

  }
  updateroomphotoinstance(roomphotopk, payload){
    const url = roomimagepolicyandcreate + '/' + String(roomphotopk);
    return this.http.put(url, payload);

  }

  deleteroomphotoinstance(roomphotopk){
    const url = roomimagepolicyandcreate + '/' + String(roomphotopk);
    return this.http.delete(url);
  }

  venueprofilephotopolicy(payload){
    return this.http.post(venueprofileimage, payload);
  }
}

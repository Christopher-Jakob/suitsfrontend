import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {
  suitsettingscity, suitssettingscuisine, suitssettingsexperientialtypes, suitsettingsvadr,
  getandcreateneighborhoodsbycity, editdeleteneighborhood, suitssettingseventpurposetypes, suitssettingsvenuetype,
  suitssettingsstate, searchcity
} from '../../../urls/suitsadmin/suitssettings/suitssettings.url';
/**
 * Created by rickus on 12/31/17.
 */

@Injectable()
export class SuitsSettingsService{
  constructor(private http: HttpClient){}

  addstate(body){
    return this.http.post(suitssettingsstate, body);
  }

  editstate(body, pk){
    const url = suitssettingsstate + '/' + String(pk);
    return this.http.put(url, body);
  }

  deletestate(pk){
    const url = suitssettingsstate + '/' + String(pk);
    return this.http.delete(url);
  }

  getcitybystate(pk){
    const url = suitsettingscity + '/' + String(pk);
    return this.http.get(url);
  }

  deletecity(pk){
    return this.http.delete(searchcity + '/' +  String(pk) + '/');
  }

  addcity(body, statepk){
    const url = suitsettingscity + '/' + String(statepk);
    return this.http.post(url, body);
  }

  editcity(body, pk){
    const url = searchcity + '/' + pk + '/';
    return this.http.put(url, body);
  }


  getneighborhoodsbycity(citypk){
    const url =  getandcreateneighborhoodsbycity + '/' + String(citypk);
    return this.http.get(url);

  }

  addneighborhood(body, citypk){
    const url = getandcreateneighborhoodsbycity + '/' + String(citypk);
    return this.http.post(url, body);
  }

  editneighborhood(body, neighborhoodpk){
    const url = editdeleteneighborhood + '/' + String(neighborhoodpk);
    return this.http.put(url, body);
  }

  deleteneighborhood(pk){
    const url = editdeleteneighborhood + '/' + String(pk);
    return this.http.delete(url);
  }

  addvenuetype(body){
    return this.http.post(suitssettingsvenuetype, body);
  }

  editvenuetype(body, pk){
    const url = suitssettingsvenuetype + '/' + String(pk);
    return this.http.put(url , body);
  }

  deletevenuetype(pk){
    return this.http.delete(suitssettingsvenuetype + '/' + String(pk));
  }

  deletecuisine(pk){
    return this.http.delete(suitssettingscuisine + '/' + String(pk));
  }

  addcuisine(body){
    return  this.http.post(suitssettingscuisine, body);
  }

  editcuisine(body, pk){
    const url = suitssettingscuisine + '/' + pk;
    return this.http.put(url, body);
  }


  deleteexperientialtype(pk){
    return this.http.delete(suitssettingsexperientialtypes + '/'+ String(pk), {observe : 'response'});
  }

  addexperientialtype(body){
    return this.http.post(suitssettingsexperientialtypes, body);
  }

  editexperientialtype(body, pk){
    const url = suitssettingsexperientialtypes + '/' + String(pk);
    return this.http.put(url, body);
  }

  addeventpurposetype(body){
    return this.http.post(suitssettingseventpurposetypes, body);
  }

  editeventpurposetype(body, pk){
    const url = suitssettingseventpurposetypes + '/' + String(pk);
    return this.http.put(url, body);
  }

  deleteeventpurpose(pk){
    return this.http.delete(suitssettingseventpurposetypes + '/' + String(pk));
  }

  addvadr(body){
    return this.http.post(suitsettingsvadr, body);
  }

  editvadr(body, pk){
    const url = suitsettingsvadr + '/' + String(pk);
    return this.http.put(url, body,);
  }

  deletevadr(pk){
    return this.http.delete(suitsettingsvadr + '/' + String(pk));

  }

}

/**
 * Created by rickus on 12/29/17.
 */
import {Subject, Observable} from "rxjs";

export class ModalToggleService{
  constructor(){}

  //subject for toggling rfp modal in navbar
  private rfpmodalsubject = new Subject<any>();

  // rfpmodal

  togglerfpmodal(){
    this.rfpmodalsubject.next();
  }

  receviverfpmodaltoggle():Observable<any>{
    return this.rfpmodalsubject.asObservable();
  }
}

/**
 * Created by rickus on 5/7/18.
 */
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, BehaviorSubject} from "rxjs";
import {userauthorization} from "../../../urls/user/authorization/userauthorization";
import {userauthentication, userrefeshtoken} from "../../../urls/user/authentication/userauthentication";
import {ActivatedRoute, Router} from '@angular/router';


@Injectable()
export class UserAuthorizationService{

  constructor(private http: HttpClient, private router: Router, private currentroute: ActivatedRoute){}

  private user = {
    id: null,
    name: null,
    isclient: false,
    issuitsviewer: false,
    issuitsadministrator: false,
    issuitssuperuser: false,
    isvenueuser: false

  };


  // check if user has been set
  getuser(){
    if(this.user != null){
      return this.user;
    }
    return null;
  }

  // set user object and send to observers
  usersubject = new BehaviorSubject(null);
  setuser(user){
    this.user = user;
    this.senduser(user);
  }

  senduser(user){
    this.usersubject.next(user);
    this.sendvalid(true);
    if(user.isvenueuser){
      this.router.navigate(['/admin','venue','venue-list']);
    }

  }

  receiveuser(): Observable<any>{
    return this.usersubject.asObservable();

  }

  // send signin valid invalid to observers
  signinvalidsubject = new BehaviorSubject(null);
  sendvalid(state){
    this.signinvalidsubject.next(state);
  }
  receivesendvalid(): Observable<any>{
    return this.signinvalidsubject.asObservable();
  }



  // save token to local and also session
  savetokentolocal(token){
    localStorage.setItem('token', token);
    sessionStorage.setItem('token', token);

  }

  // check if local has token
  checklocalfortoken(){
    if(localStorage.length > 0){
      let token = localStorage.getItem('token');
      this.savetokentosession(token);
      return token;
    } else {
      return null;
    }
  }
  // save a token to a session
  savetokentosession(token){
    sessionStorage.setItem('token', token);
  }

  // check if a sessiontoken has been set
  checksessionfortoken() {
    if (sessionStorage.length > 0) {
      let token = sessionStorage.getItem('token');
      return token;
    } else {
      return null;
    }
  }

  // grab the permissions a user has and who they are by token
    authorizetoken(token){
      this.http.get(userauthorization)
        .subscribe(
        (req: any)=>{
          this.setuser(req);
        }
      );

    }

    // outside authorization service. Used for services that need to do work with returned value;
    returnauthorizetoken(token){
      return this.http.get(userauthorization);
    }

    // take username and password and get back a token
    gettoken(payload){
      const httppayload ={
        email: payload.email,
        password: payload.password
      };
      this.http.post(userauthentication, httppayload)
        .subscribe(
          (req: any)=>{
            if(payload.localstorage){
              this.savetokentolocal(req.token);
            }else{
              this.savetokentosession(req.token);
            }
            const sessiontoken = this.checksessionfortoken();
            if(sessiontoken != null){
              this.authorizetoken(sessiontoken);
            }
          },
          error => {
            this.sendvalid(false);
          }
        );
    }

    logout(){
      const user = {
        id: null,
        name: null,
        isclient: false,
        issuitsviewer: false,
        issuitsadministrator: false,
        issuitssuperuser: false,
        isvenueuser: false
      };
      localStorage.clear();
      sessionStorage.clear();
      this.setuser(user);
      this.router.navigate(['/']);

    }
  }







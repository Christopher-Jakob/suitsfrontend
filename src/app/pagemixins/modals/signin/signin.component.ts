import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {UserAuthorizationService} from "../../../services/userservice/userauthorizationservice/userauthorizationservice";
import {ForgotPasswordService} from "../../../services/userservice/forgotpasswordservice/forgotpasswordservice";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [ForgotPasswordService]
})
export class SigninComponent implements OnInit, OnDestroy {

  constructor(private http: HttpClient, private authservice: UserAuthorizationService, private forgotpasswordservice: ForgotPasswordService ) { }
  signinvalidsubscriptionvar;
  signinerror = false;

  @ViewChild('signinform') signinform: NgForm;
  signin(){
    const payload = {
      email: this.signinform.form.value.email,
      password: this.signinform.form.value.pwd,
      localstorage: this.signinform.form.value.remember
    };
    this.authservice.gettoken(payload);
  }

  resetsigninerror(){
    this.signinerror = false;
  }

  forgetpassword = false;
  toggleforgetpassword(){
    console.log('The toggle has passed');
    this.forgetpassword = !this.forgetpassword;
    console.log(this.forgetpassword);
  }
  passwordresetconfrim = false;
  @ViewChild('resetpassword') resetpassword:NgForm;
  passwordreset(){
    const payload ={
      email: this.resetpassword.form.value.forgotemail
    };
    this.forgotpasswordservice.forgotpassword(payload)
      .subscribe(
        (req: any)=>{
          this.passwordresetconfrim = true;
        },
        error => {
          this.passwordresetconfrim = true;
        }
      );


  }



  ngOnInit() {
    this.signinvalidsubscriptionvar = this.authservice.receivesendvalid()
      .subscribe(
        (req: any)=>{
          if(req != null){
            if(!req){
              this.signinerror = true;
            }
          }
        }
      );
  }
  ngOnDestroy(){
    this.signinvalidsubscriptionvar.unsubscribe();
  }



}

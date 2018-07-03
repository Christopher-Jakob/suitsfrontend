import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {NgForm} from "@angular/forms";
import {Userservice} from "../../services/userservice/validateservice/uservalidateservice";
import {Router} from "@angular/router";


@Component({
  selector: 'app-uservenueverificaiton',
  templateUrl: './uservenueverificaiton.component.html',
  styleUrls: ['./uservenueverificaiton.component.scss'],
  providers:[Userservice]
})
export class UservenueverificaitonComponent implements OnInit {
  passwordmismatch = false;
  validateonly = false;
  validated = false;
  notfound = false;
  userpk;
  usertype;
  verificationstring;

  constructor(private route: ActivatedRoute, private userservice: Userservice, private router: Router) { }

  resetpasswordmismatch(){
    this.passwordmismatch = false;
  }

  @ViewChild('passwordform') passwordform: NgForm;
  updatepassword(){
    const password1 = this.passwordform.form.value.password1;
    const password2 = this.passwordform.form.value.password2;
    if(password1 !== password2){
      this.passwordmismatch = true;
    }
    if(!this.passwordmismatch){
      const payload = {
        password: this.passwordform.form.value.password1
      };
      this.userservice.setuuserpassword(this.usertype, this.verificationstring, payload)
        .subscribe(
          (req: any)=>{
            this.validated = true;
          });
    }
  }

  navhomepage(){
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params)=>{
          this.usertype = params['type'];
          this.verificationstring = params['verificationstring'];
          this.userservice.getuserbyvalidationstring(this.usertype, this.verificationstring)
            .subscribe(
              (req: any)=>{
                console.log(req);
                this.validateonly = req.verifyonly;
                this.userpk = req.userpk;
                if(this.validateonly){
                  this.validated = true;
                }
              },
              error => {
                this.notfound = true;
              });
        });
  }

}

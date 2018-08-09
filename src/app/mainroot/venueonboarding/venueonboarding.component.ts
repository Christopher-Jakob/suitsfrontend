import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-venueonboarding',
  templateUrl: './venueonboarding.component.html',
  styleUrls: ['./venueonboarding.component.scss']
})
export class VenueonboardingComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  @ViewChild('passwordsetform')passwordsetform :NgForm;
  nopass = false;
  passwordset = false;
  user = {
    pk: null,
    name: null,
    onboardstring: null,
  };



  setpassword(){
    const payload = {
      password: this.passwordsetform.form.value.password
    };
    this.http.put('https://api-suitsandtables3.herokuapp.com/api/user/venue/setpassuseronboard/' + String(this.user.pk), payload)
      .subscribe(
        (req: any)=>{
          this.passwordset = true;
          setTimeout(()=>{
            this.router.navigate(['']);
          }, 3500);
        }
      );

  }

  passlength = false;
  passsame = false;
  passwordlength(){
    const length = this.passwordsetform.form.value.password;
    if(length.length < 8){
      this.nopass = true;
      this.passlength = true;

    }
    if(length.length > 7){
      this.nopass = false;
      this.passlength = false;
    }
  }

  passwordmatch(){
    const pass1 = this.passwordsetform.form.value.password;
    const pass2 = this.passwordsetform.form.value.passwordconfirm;
    if( pass1 !== pass2){
      this.nopass = true;
      this.passsame = true;
    }
    if(pass1 === pass2){
      this.nopass = false;
      this.passsame = false;
    }
  }

  ngOnInit() {
    let onboardstring = null;
    this.route.params
      .subscribe(
        (params:Params)=>{
          onboardstring = params['onboardstring'];
          this.http.get('https://api-suitsandtables3.herokuapp.com/api/user/venue/useronboard/' + String(onboardstring))
            .subscribe(
              (req: any)=>{
                this.user = req;
              }
            );

        }
      );
  }

}

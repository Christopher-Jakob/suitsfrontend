import { Component, OnInit , ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ForgotPasswordService} from "../../services/userservice/forgotpasswordservice/forgotpasswordservice"
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  providers: [ForgotPasswordService]
})
export class ResetpasswordComponent implements OnInit {

  constructor(private forgotpassword: ForgotPasswordService, private route: ActivatedRoute) { }

  updatesucess = false;
  passwordmismatch = false;
  passwordupdatestring;

  mismatchreset(){
    this.passwordmismatch = false;

  }
  @ViewChild('passwordresetform') passwordresetform: NgForm;
  passwordreset(){
    const password1 = this.passwordresetform.form.value.password1;
    const password2 = this.passwordresetform.form.value.password2;
    if(password1 === password2){
      const payload = {
        password: password1
      };
      this.forgotpassword.updatepassword(payload, this.passwordupdatestring)
        .subscribe(
          (req: any)=>{
            this.updatesucess = true;
          }
        );
    }else{
      this.passwordmismatch = true;
    }
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params)=>{
          this.passwordupdatestring = params['resetstring'];
        }
      );
  }

}

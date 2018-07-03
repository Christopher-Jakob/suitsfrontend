import { Component, OnInit } from '@angular/core';
import {ClientUserService} from "../../services/userservice/clientuserservice/clientuserservice";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-landingjoin',
  templateUrl: './landingjoin.component.html',
  styleUrls: ['./landingjoin.component.scss'],
  providers: [ClientUserService]
})
export class LandingjoinComponent implements OnInit {

  constructor(private clientservice: ClientUserService) { }

  //client signup
  clientsignupconfrim = false;
  passwordmismatch = false;
  emailmismatch = false;

  checkpassword(form:NgForm){
    this.passwordmismatch = false;
    if(form.value.clientpassword != form.value.clientconfrimpassword){
      this.passwordmismatch = true;
    }
  }

  checkemail(form:NgForm){
    this.emailmismatch = false;
    if(form.value.clientemail != form.value.clientemailconfrim){
      this.emailmismatch = true;
    }
  }
  clientsignup(form:NgForm){
    if(!this.passwordmismatch){
      if(!this.emailmismatch){
        const payload = {
          name: form.value.clientfirstname + ' ' + form.value.clientlastname,
          email: form.value.clientemail,
          password: form.value.clientpassword,
          company: form.value.clientcompany,
          phone: form.value.clientphonenumber,
          city: form.value.clientcity,
          state: form.value.clientstate,
          contactname: form.value.venuecontactname,

        };
        this.clientservice.createclientuser(payload)
          .subscribe(
            (req: any)=>{
              this.clientsignupconfrim = true;
            }
          );

      }
    }
  }

  ngOnInit() {
  }

}

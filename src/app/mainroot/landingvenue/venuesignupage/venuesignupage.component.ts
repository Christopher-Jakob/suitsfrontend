import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {VenueService} from "../../../services/venueservice/venueservice";
@Component({
  selector: 'app-venuesignupage',
  templateUrl: './venuesignupage.component.html',
  styleUrls: ['./venuesignupage.component.scss'],
  providers: [VenueService]
})
export class VenuesignupageComponent implements OnInit {
  constructor(private venueservice: VenueService) { }
  //venue signup

  hovertext = false;
  signupcompelete = false;

  togglehovertext(){
    this.hovertext = !this.hovertext;
  }

  createvenue(form:NgForm){
    let payload = {
      name: form.value.inputVenueName,
      streetaddress1: form.value.inputAddress1,
      streetaddress2: form.value.inputAddress2,
      city: form.value.inputCity,
      state: form.value.inputState,
      venuephone: form.value.inputPhone,
      venuecontactname: form.value.inputContactName,
      venuecontactjobtitle: form.value.inputJobTitle,
      venuecontactemail: form.value.inputEmail,
      phonenumber: form.value.inputPhone
    };

    if(form.valid){
      console.log('form is valid');
      this.venueservice.submitapplication(payload)
        .subscribe(
          (req: any)=>{
            console.log(req);
            this.signupcompelete = true;
          }
        );

    }
  }

  ngOnInit() {
  }

}

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
      name: form.value.venuename,
      streetaddress1: form.value.venueaddress1,
      streetaddress2: form.value.venueaddress2,
      city: form.value.city,
      state: form.value.venuestateselect,
      venuephone: form.value.venuephone,
      venuecontactname: form.value.venuecontactname,
      venuecontactjobtitle: form.value.venuejobtitle,
      venuecontactemail: form.value.venueemail,
      phonenumber: form.value.venuephone,
      hearaboutus: form.value.hearaboutus
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

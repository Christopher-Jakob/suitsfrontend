import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeclinedVenueService} from "../../services/suitsadmin/suitsdeclinedvenuesservice/suitsdeclinedvenue.service";

@Component({
  selector: 'app-suitsdeclinedapplicationdetail',
  templateUrl: './suitsdeclinedapplicationdetail.component.html',
  styleUrls: ['./suitsdeclinedapplicationdetail.component.scss'],
  providers: [DeclinedVenueService]
})
export class SuitsdeclinedapplicationdetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private declineservice:  DeclinedVenueService, private router: Router) { }

  declinedvenue;
  restoresucess = false;
  street2show = false;

  restorevenue(){
    const pk = this.declinedvenue.id;
    const payload = {
      declined: false,
      declineddate : null,
      declineddatestring: null,
      declinereason: null,
      declinetext: null,
      name: this.declinedvenue.name,
      city: this.declinedvenue.city,
      streetaddress1: this.declinedvenue.streetaddress1,
      state: this.declinedvenue.state,
      zipcode: this.declinedvenue.zipcode,
      phonenumber: this.declinedvenue.phonenumber,
      venuecontactname: this.declinedvenue.venuecontactname,
      venuecontactjobtitle: this.declinedvenue.venuecontactjobtitle,
      venuecontactemail: this.declinedvenue.venuecontactemail
    };
    this.declineservice.restoredeclinedvenue(payload, pk)
      .subscribe(
        (req: any)=>{
          this.restoresucess = true;
        }
      );
  }

  navigatetovenuelist(){
    this.router.navigate(['/suitsadmin']);
  }

  venuepk;
  ngOnInit() {
    window.scrollTo(0,0);
    this.route.params
      .subscribe(
        params =>{
          this.venuepk = params['pk'];
          this.declineservice.getdeclinedvenuedetail(this.venuepk)
            .subscribe(
              (req: any)=>{
                console.log(req);
                this.declinedvenue = req;
                if(this.declinedvenue.streetaddress2 !== null){
                  this.street2show = true;
                }
              }
            );

        }

      );
  }

}

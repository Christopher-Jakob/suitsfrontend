import { Component, OnInit } from '@angular/core';
import {VenueListDependancyService} from '../../services/pagedependancy/suitsadmin/venuelist/venuelist.dependancy.service';
import {Router} from "@angular/router";
import {SuitsVenueListService} from "../../services/suitsadmin/suitsvenuelistservice/Suits.VenueList.Service";

@Component({
  selector: 'app-suitsvenues',
  templateUrl: './suitsvenues.component.html',
  styleUrls: ['./suitsvenues.component.scss'],
  providers: [VenueListDependancyService, SuitsVenueListService]
})
export class SuitsvenuesComponent implements OnInit {

  constructor( private dependancyservice: VenueListDependancyService, private router: Router, private venuelistservice: SuitsVenueListService) { }

  //loading
  choicesload = true;

  // array of venue objects
  venues = [];

  // venue request code

  venuerequestactivatedindex = null;
  contactinfoshow = false;

  showcontactinfo(index){
    this.venuerequestactivatedindex = index;
    this.contactinfoshow = true;
  }

  unshowcontactinfo(){
    this.venuerequestactivatedindex = null;
    this.contactinfoshow = false;
  }





  navipush(index){
    const payload = {
      pk: this.venues[index].id,
      permission: 'suits',
      name: this.venues[index].name
    };
    payload.name = payload.name.replace(/ /g,'_');

    this.router.navigate(['/admin', payload.permission, 'venue-admin', payload.name, payload.pk]);
  }
  navigatetovenueapplication(){
    this.router.navigate(['/suitsadmin','venueapplication','create']);
  }

  activeindex = null;
  // activate deactivate venue code

  deactivatevenue(index){
    const venuepk =  this.venues[index].id;
    const payload = {
      name: this.venues[index].name,
      city: this.venues[index].city,
      streetaddress1: this.venues[index].streetaddress1,
      state: this.venues[index].state,
      zipcode: this.venues[index].zipcode,
      phonenumber: this.venues[index].phonenumber,
      venuecontactname: this.venues[index].venuecontactname,
      venuecontactjobtitle: this.venues[index].venuecontactjobtitle,
      venuecontactemail: this.venues[index].venuecontactemail,
      online: false

    };
    this.venuelistservice.deactivatevenue(payload,venuepk)
      .subscribe(
        (req:  any)=>{
          this.venues[index].online = false;
        }
      );
  }

  activatevenue(index){
    const venuepk = this.venues[index].id;
    const payload = {
      name: this.venues[index].name,
      city: this.venues[index].city,
      streetaddress1: this.venues[index].streetaddress1,
      state: this.venues[index].state,
      zipcode: this.venues[index].zipcode,
      phonenumber: this.venues[index].phonenumber,
      venuecontactname: this.venues[index].venuecontactname,
      venuecontactjobtitle: this.venues[index].venuecontactjobtitle,
      venuecontactemail: this.venues[index].venuecontactemail,
      online: true

    };
    this.venuelistservice.activatevenue(payload, venuepk)
      .subscribe(
        (req: any)=>{
          this.venues[index].online = true;
        }
      );
  }

  // delete confrim delete venue code

  deleteconfrimshow = false;

  showdeleteconfrim(index){
    this.deleteconfrimshow = true;
    this.activeindex = index;
  }

  unshowdeleteconfrim(){
    this.deleteconfrimshow = false;
    this.activeindex = null;
  }

  deletevenue(index){
    const pk = this.venues[index].id;
    this.venuelistservice.deletevenue(pk)
      .subscribe(
        (req: any)=>{
          this.venues.splice(+index,1);
          this.unshowdeleteconfrim();
        }
      );
  }



  ngOnInit() {
    this.dependancyservice.getvenuelist()
      .subscribe(
        (req: any)=>{
          this.choicesload = false;
          this.venues = req;
        }
      );


  }

}

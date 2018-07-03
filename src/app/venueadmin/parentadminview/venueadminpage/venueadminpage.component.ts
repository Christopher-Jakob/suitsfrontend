import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {VenueUserService} from "../../../services/userservice/venueuserservice/venueuserservice";
import {VenueAdminVolleyService} from "../../../services/venueadmin/venueadminvolleyservice/venueadmin.volley.service";

@Component({
  selector: 'app-venueadminpage',
  templateUrl: './venueadminpage.component.html',
  styleUrls: ['./venueadminpage.component.scss'],
  providers: [VenueUserService]
})
export class VenueadminpageComponent implements OnInit {

  constructor( private route: ActivatedRoute, private router: Router, private userservice: VenueUserService, private venuevolley : VenueAdminVolleyService) { }

  venues =[];



  navipush(index){

    const payload = {
      venueid: this.venues[index].venue.id,
      venuename: this.venues[index].venue.name,
      permission: 'venue'
    };
    payload.venuename = payload.venuename.replace(/ /g, '_');
    this.venuevolley.sendobject(this.venues[index].venue);
    this.router.navigate(['/admin',payload.permission,'venue-admin',payload.venuename, payload.venueid]);

  }

  // add venue code
  addrequestsucess = false;
  addvenueshow = false;
  showaddvenue(){
    this.addvenueshow = true;
  }

  closeaddvenue(){
    this.addvenueshow = false;
    this.addrequestsucess = false;
    this.showsecondcuisine = false;
    this.showcuisine = false;
    this.showexperiential = false;
  }


  @ViewChild('addvenueform') addvenueform:NgForm;

  // add venue code

  // venue type code

  showcuisine = false;
  showexperiential = false;
  experientialorcuisinechoose(){
    const value = this.addvenueform.form.value.venuetype;
    if(value === "experiential"){
      this.showcuisine = false;
      this.showexperiential = true;
    }
    else{
      this.showcuisine = true;
      this.showexperiential = false;
    }

  }

  // cuisine 1 before cuisine 2 code
  showsecondcuisine = false;
  cuisinechange(){
    const choice = this.addvenueform.form.value.cuisine1select;
    if(choice !== ''){
      this.showsecondcuisine = true;
    }
    else{
      this.showsecondcuisine = false;
    }

  }

  addvenue(){
    //todo
  }


  ngOnInit() {
    this.userservice.getauthorizedvenues()
      .subscribe(
        (req: any)=>{
          this.venues = req;
          console.log(this.venues);
        }
      );

  }

}

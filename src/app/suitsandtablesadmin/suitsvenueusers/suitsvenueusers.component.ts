import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {VenueUserService} from "../../services/userservice/venueuserservice/venueuserservice";

@Component({
  selector: 'app-suitsvenueusers',
  templateUrl: './suitsvenueusers.component.html',
  styleUrls: ['./suitsvenueusers.component.scss'],
  providers:[VenueUserService]
})
export class SuitsvenueusersComponent implements OnInit {
  choicesload = true;
  permission = 'suits';

  constructor(private router: Router, private venueuserservice: VenueUserService) { }

  userobjects = [
    {
      id: 1,
      name: 'Christopher Jakob',
      authorizedvenues: ['Gibbsons', 'fity50',  'American place', 'Nandos', 'Fried Chicken and such'],
      email: 'christopher.m.jakob@gmail.com',
      phone: 3125223599,
      venuepermissions_set: [{
        venue:{
          id: 1,
          name: 'temp'
        }
      }]
    },
  ];

  //navigate to user code
  navigatetouser(index){
    const pk =this.userobjects[index].id;
    this.router.navigate(['/admin', this.permission,'user-profile', String(pk)]);
  }

  navtovenueadmin(i, j){
    let venuename= this.userobjects[i].venuepermissions_set[j].venue.name;
    venuename = venuename.replace(/ /g, '_');
    const venuepk = this.userobjects[i].venuepermissions_set[j].venue.id;
    this.router.navigate(['/admin',this.permission, 'venue-admin',venuename, venuepk]);
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.venueuserservice.venueuserlist()
      .subscribe(
        (req: any)=>{
          this.choicesload = false;
          this.userobjects = req;
        }
      );
  }

}

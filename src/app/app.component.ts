import { Component, OnInit } from '@angular/core';
import {VenueAdminVolleyService} from "./services/venueadmin/venueadminvolleyservice/venueadmin.volley.service";
import {UserAuthorizationService} from "./services/userservice/userauthorizationservice/userauthorizationservice";
import {BrowsevenuescomponentcommService} from "./services/browsevenueservice/browsevenuescommservice/browsevenuescomponentcomm.service";

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[VenueAdminVolleyService, BrowsevenuescomponentcommService]
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private authservice: UserAuthorizationService){}



  ngOnInit(){
    let token = this.authservice.checklocalfortoken();
    if(token == null){
      token = this.authservice.checksessionfortoken();
    }
    if(token != null){
      this.authservice.authorizetoken(token);
    }

  }
}






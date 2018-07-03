import {Component, OnDestroy, OnInit} from '@angular/core';
import {VenueAdminParentAdminService} from "../../services/venueadmin/venueadminparentadminservice/venueadmin.parentadmin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VenueAdminInceptionService} from "../../services/venueadmin/venueadmininceptionservice/venueadmin.inception.service";


@Component({
  selector: 'app-parentadminview',
  templateUrl: './parentadminview.component.html',
  styleUrls: ['./parentadminview.component.scss'],
  providers: [VenueAdminInceptionService]
})
export class ParentadminviewComponent implements OnInit, OnDestroy {
  venueadmin = false;
  suitsadmin = false;

  constructor(private route: ActivatedRoute, private parentadminservice:  VenueAdminParentAdminService, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (req:any)=>{
          if(req.permission === 'venue'){
            this.venueadmin = true;
            this.suitsadmin = false;
            this.parentadminservice.sendpermission(req.permission);
            // temporary re direct while we build out the normal dashboard in the next release
            //router injection is temporary
            this.router.navigate(['venue-list'], {relativeTo: this.route});
          }
          if(req.permission === 'suits'){
            this.venueadmin = false;
            this.suitsadmin = true;
            this.parentadminservice.sendpermission(req.permission);
          }

        }


      );



  }

  ngOnDestroy(){

  }

}

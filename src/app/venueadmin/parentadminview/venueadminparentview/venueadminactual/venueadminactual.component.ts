import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VenueAdminInceptionService} from '../../../../services/venueadmin/venueadmininceptionservice/venueadmin.inception.service';
import {VenueAdminVolleyService} from "../../../../services/venueadmin/venueadminvolleyservice/venueadmin.volley.service";
import {VenueAdminParentAdminService} from "../../../../services/venueadmin/venueadminparentadminservice/venueadmin.parentadmin.service";

@Component({
  selector: 'app-venueadminactual',
  templateUrl: './venueadminactual.component.html',
  styleUrls: ['./venueadminactual.component.scss'],
})
export class VenueadminactualComponent implements OnInit {
  parentadminservicevar;
  permission;
  venueobject;
  constructor(private route: ActivatedRoute, private router:Router, private inceptionservice: VenueAdminInceptionService, private venuevolley: VenueAdminVolleyService, private parentadminservice: VenueAdminParentAdminService ) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.parentadminservicevar = this.parentadminservice.receivepermission()
      .subscribe(
        (req: any)=>{
          if(req !== null){
            this.permission = req;
          }
        });
    let routeparams = this.route.snapshot.params;
    let venuename = routeparams.venuename.replace(/_/g, ' ');
    const payload = {
      venueid: routeparams.pk,
      venuenamelinkready: venuename
    };


    this.inceptionservice.sendparams(payload);
    this.router.navigate(['profile'], {relativeTo: this.route});

  }

}

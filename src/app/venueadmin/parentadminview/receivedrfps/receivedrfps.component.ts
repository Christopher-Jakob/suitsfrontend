import { Component, OnInit } from '@angular/core';
import {RFPService} from "../../../services/rfpservice/rfpservice";
import {VenueAdminVolleyService} from "../../../services/venueadmin/venueadminvolleyservice/venueadmin.volley.service";

@Component({
  selector: 'app-receivedrfps',
  templateUrl: './receivedrfps.component.html',
  styleUrls: ['./receivedrfps.component.scss'],
  providers: [RFPService]
})
export class ReceivedrfpsComponent implements OnInit {

  constructor(private rfpservice: RFPService, private venuevolly: VenueAdminVolleyService) { }
  receviedrfps = [];
  venuevollyservicevar;
  venueobject;
  domain;

  ngOnInit() {
    this.venuevollyservicevar = this.venuevolly.receiveobject().subscribe(
        (req: any)=>{
          if(req !== null){
            this.venueobject = req;
            this.domain = '/venue/' + this.venueobject.name;
            this.rfpservice.getreceivedrfps(this.venueobject.id).subscribe(
                (req: any)=>{
                  this.receviedrfps = req;
                  console.log('this is the recevied rfps');
                  console.log(this.receviedrfps);
                }
              );
          }

        }
      );
  }

}

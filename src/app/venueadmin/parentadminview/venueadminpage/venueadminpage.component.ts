import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {VenueUserService} from "../../../services/userservice/venueuserservice/venueuserservice";
import {VenueAdminVolleyService} from "../../../services/venueadmin/venueadminvolleyservice/venueadmin.volley.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalToggleService} from "../../../services/pagemixins/modeltoggleservice/modaltoggle.service";
import {VenueService} from "../../../services/venueservice/venueservice";


@Component({
  selector: 'app-venueadminpage',
  templateUrl: './venueadminpage.component.html',
  styleUrls: ['./venueadminpage.component.scss'],
  providers: [VenueUserService, VenueService]
})
export class VenueadminpageComponent implements OnInit {

  constructor( private route: ActivatedRoute, private router: Router, private userservice: VenueUserService, private modalService: NgbModal, private venuevolley : VenueAdminVolleyService, private venueservice: VenueService) { }

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

  }

  closeResult: string;
  isCollapsed = true;

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  signupcompelete = false;
  addvenue(form:NgForm) {
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
      phonenumber: form.value.venuephone
    };
    if(form.valid) {
      this.venueservice.submitapplication(payload)
        .subscribe(
          (req: any) => {
            this.signupcompelete = true;
          }
        );
    }
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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {VenueAdminVolleyService} from "../../../../../services/venueadmin/venueadminvolleyservice/venueadmin.volley.service";
import {VenueAdminRoomListService} from "../../../../../services/venueadmin/venueadminroomlistservice/venueadmin.roomlist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VenueAdminInceptionService} from "../../../../../services/venueadmin/venueadmininceptionservice/venueadmin.inception.service";
import {VenueAdminParentAdminService} from "../../../../../services/venueadmin/venueadminparentadminservice/venueadmin.parentadmin.service";
import {VenueService} from "../../../../../services/venueservice/venueservice";

@Component({
  selector: 'app-venueadminroomlist',
  templateUrl: './venueadminroomlist.component.html',
  styleUrls: ['./venueadminroomlist.component.scss'],
  providers: [VenueAdminRoomListService, VenueService]
})
export class VenueadminroomlistComponent implements OnInit, OnDestroy {
  parentadminservicevar;
  venuevolleyservicevar;
  venueadmininceptionservicevar;

  constructor(private volleyservice: VenueAdminVolleyService,
              private roomlistservice: VenueAdminRoomListService,
              private router: Router, private route: ActivatedRoute,
              private inceptionservice: VenueAdminInceptionService,
              private parentadminservice: VenueAdminParentAdminService, private venueservice: VenueService) { }
  venueobject;
  venuerooms=[];

  //navigate to room code

  permission;
  venuenamelinkready;

  navigatetoroom(index){
    const roompk = this.venuerooms[+index].pk;
    const venueid = this.venueobject.id;
    this.router.navigate(['/admin',this.permission,'venue-admin',this.venuenamelinkready,venueid,'room',roompk]);
  }
  roomactiveindex = null;
  deleteroomconfirm(index){
    this.roomactiveindex = index;

  }
  canceldelete(){
    this.roomactiveindex = null;
  }

  //delete room code
  deleteroom(index){
    const venueid = this.venueobject.id;
    console.log('this is the roomid for deleting');

    const roomid = this.venueobject.room_set[+index].pk;
    console.log(roomid);
    this.roomlistservice.deleteroom(venueid, roomid)
      .subscribe(
        (req: any)=>{
          this.roomactiveindex = null;
          this.venueobject.room_set.splice(+index,1);
        }
      );
  }
  roomadded = false;
  addroom(){
    this.roomlistservice.addroom(this.venueobject.id)
      .subscribe(
        (req: any)=>{
          this.venueobject.room_set.push(req);
          this.roomadded = true;
          setTimeout(()=> {
            this.roomadded = false;
          }, 2500);
        });
    //this.navigatetoroom(index);
  }


  //full buy out code
  showfullbuyoutdeleteconfrim = false;
  fullbuyoutdeleteconfrim(){
    this.showfullbuyoutdeleteconfrim = true;
  }
  cancelfullbuyoutdelete(){
    this.showfullbuyoutdeleteconfrim = false;
  }

  fullbuyouttoggle(){
    let buyout = false;
    if(!this.venueobject.fullbuyout){
      buyout = true;
    }
    const pk = this.venueobject.id;
    const payload = {
      name: this.venueobject.name,
      city: this.venueobject.city,
      streetaddress1: this.venueobject.streetaddress1,
      state: this.venueobject.state,
      zipcode: this.venueobject.zipcode,
      phonenumber: this.venueobject.phonenumber,
      venuecontactname: this.venueobject.venuecontactname,
      venuecontactjobtitle: this.venueobject.venuecontactjobtitle,
      venuecontactemail: this.venueobject.venuecontactemail,
      fullbuyout: buyout,
      Online: false,
      fullbuyoutminspend: null,
      fullbuyoutseatedcapacity: null,
      fullbuyoutstandingcapacity: null,
      fullbuyoutdescription: null,
      fullbuyoutsurroundsoundamenity: false,
      fullbuyoutstageamenity: false,
      fullbuyouttelevisionamenity : false,
      fullbuyoutscreenprojectoramenity: false,
      fullbuyoutnaturallightamenity: false,
      fullbuyoutwifiamenity : false,
      fullbuyoutwheelchairaccessibleamenity: false,
      fullbuyoutcocktailstandingseatingoption: false,
      fullbuyoutclassroomseatingoption: false,
      fullbuyoutushapeseatingoption: false,
      fullbuyoutsixtyroundseatingoption: false,
      fullbuyoutboardroomseatingoption: false,
      fullbuyouttheaterseatingoption: false,
      fullbuyouthallowsquareseatingoption: false
    };
    this.parentadminservice.venueprofileupdate(payload, pk)
      .subscribe(
        (req:any)=>{
          this.venueobject = req;
          this.volleyservice.sendobject(this.venueobject);
        }
      );
  }

  navigatetofullbuyout(){
    console.log(this.venuenamelinkready);
    this.router.navigate(['/admin',this.permission, 'venue-admin',this.venuenamelinkready, this.venueobject.id,'room','fullbuyout']);
  }


  ngOnInit() {

    this.parentadminservicevar = this.parentadminservice.receivepermission()
      .subscribe(
        (req: any) => {
          if (req !== null) {
            this.permission = req;
          }
        }
      );

    this.venueadmininceptionservicevar = this.inceptionservice.recevieparams()
      .subscribe(
        (req: any) => {
          if (req != null) {
            this.venuenamelinkready = req.venuenamelinkready;
            this.venueservice.getvenuebyname(this.venuenamelinkready, false)
              .subscribe(
                (req: any) => {
                  this.venueobject = req.venue;
                  this.roomlistservice.roomlist(this.venueobject.id)
                    .subscribe(
                      (req: any) => {
                        console.log(this.venuerooms);
                        this.venuerooms = req;

                      });

                });
          }

        });



  }

  ngOnDestroy(){
    this.parentadminservicevar.unsubscribe();
    this.venueadmininceptionservicevar.unsubscribe();
  }

}

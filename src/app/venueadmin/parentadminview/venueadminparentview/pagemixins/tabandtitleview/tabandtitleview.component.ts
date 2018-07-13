import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {VenueAdminInceptionService} from "../../../../../services/venueadmin/venueadmininceptionservice/venueadmin.inception.service";
import {VenueAdminVolleyService} from "../../../../../services/venueadmin/venueadminvolleyservice/venueadmin.volley.service";
import {NgForm} from "@angular/forms";
import {VenueAdminTableandtitleHttpService} from "../../../../../services/venueadmin/venueadmintabandtitlehttpservice/venueadmin.tabandtitle.http.service";
import {VenueAdminParentAdminService} from "../../../../../services/venueadmin/venueadminparentadminservice/venueadmin.parentadmin.service";
import {SuitsVenueListService} from "../../../../../services/suitsadmin/suitsvenuelistservice/Suits.VenueList.Service";
import {Observable} from 'rxjs';
import {frontenddomain} from "../../../../../urls/rooturl";




@Component({
  selector: 'app-tabandtitleview',
  templateUrl: './tabandtitleview.component.html',
  styleUrls: ['./tabandtitleview.component.scss'],
  providers: [VenueAdminTableandtitleHttpService, SuitsVenueListService]
})
export class TabandtitleviewComponent implements OnInit, OnDestroy {
  parentadminservicevar;
  permission;
  venueid;
  venuename;
  venuenamelinkready;
  venueadmin = false;
  suitsadmin = false;
  onroompage = false;

  constructor( private router: Router, private inceptionservice: VenueAdminInceptionService, private venuevolly: VenueAdminVolleyService, private titleupdate: VenueAdminTableandtitleHttpService, private parentadminservice: VenueAdminParentAdminService, private venuevisibiltyservice: SuitsVenueListService){}
  inceptionservicevar;
  venuevollyservicevar;
  updatedvolleyvar;
  tabservicevar;
  showupdated = false;
  pushfail = false;

  unshowupdated(){
    this.showupdated = false;
  }

  venueobject ={
    id: 0,
    name: '',
    city: '',
    streetaddress1: '',
    state: '',
    online: false,
    zipcode: '',
    phonenumber: '',
    venuecontactname: '',
    venuecontactjobtitle : '',
    venuecontactemail: '',
    venuetype: '',
    description: '',
    sundayhop: false,
    sundayhopopen: '',
    sundayhopclose: '',
    mondayhop: false,
    mondayhopopen: '',
    mondayhopclose: '',
    tuesdayhop: false,
    tuesdayhopopen: '',
    tuesdayhopclose: '',
    wednesdayhop: false,
    wednesdayhopopen: '',
    wednesdayhopclose: '',
    thursdayhop: false,
    thursdayhopopen: '',
    thursdayhopclose: '',
    fridayhop: false,
    fridayhopopen: '',
    fridayhoplose: '',
    saturdayhop: false,
    saturdayhopopen: '',
    saturdayhopclose: '',
    venuesamplemenu_set: [],
    venueimage_set: [{
      id: null
    }],
    valetparking: false,
    valetparkingamount: '',
    onsiteparking: false,
    isexperiential: false,
    isrestaurant: false,
    cuisine1:'',
    cuisine2:'',
    experientialtype: ''
  };

  // for preview venue
  domain;

  navigatetovenuepage(){
    this.router.navigate(['/venue',this.venuenamelinkready], {queryParams : {option: this.permission}});
  }

  activateedittitle = false;

  showedittitle(){
    this.activateedittitle = true;
  }
  @ViewChild('venuenameform') venuenameform : NgForm;
  editvenuename(){
    const payload = {
      name: this.venuenameform.form.value.venuenameinput,
      city: this.venueobject.city,
      streetaddress1: this.venueobject.streetaddress1,
      state: this.venueobject.state,
      zipcode: this.venueobject.zipcode,
      phonenumber: this.venueobject.phonenumber,
      venuecontactname: this.venueobject.venuecontactname,
      venuecontactjobtitle: this.venueobject.venuecontactjobtitle,
      venuecontactemail: this.venueobject.venuecontactemail,
    };
    this.titleupdate.updatevenuename(payload, this.venueobject.id)
      .subscribe(
        (req: any)=>{
          this.venueobject = req;
          this.venuename = this.venueobject.name;
          this.activateedittitle = false;
        }
      );
  }

  canceledit(){
    this.activateedittitle = false;
  }

  // venue status and delete code and request delete code

  // delete
  deleteconfrimshow = false;

  showdeleteconfrim(){
    this.deleteconfrimshow = true;
  }

  unshowdeleteconfrim(){
    this.deleteconfrimshow = false;
  }

  deletevenue(){
    const pk = this.venueobject.id;
    this.venuevisibiltyservice.deletevenue(pk)
      .subscribe(
        (req: any)=>{
          this.router.navigate(['/suitsadmin','venues']);

        }
      );

  }

  //visiblilty


  changestatus(){
    const venuephotolength = this.venueobject.venueimage_set.length;
    if(venuephotolength < 1){
      this.pushfail = true;
      setTimeout(()=>{
        this.pushfail = false;
      }, 2500);
      return 0;
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
      online: !this.venueobject.online
    };
    this.venuevisibiltyservice.deactivatevenue(payload, pk)
      .subscribe(
        (req: any)=>{
          this.venueobject.online = !this.venueobject.online;
          console.log('online status');
          console.log(this.venueobject.online);
        }
      );

  }

  ngOnInit() {
    this.parentadminservicevar = this.parentadminservice.receivepermission()
      .subscribe(
        (req: any)=>{
          console.log(req);
          if(req !== null){
            if(req === 'venue'){
              this.venueadmin = true;
              this.suitsadmin = false;
              this.permission = 'venue';
            }
            if(req === 'suits'){
              this.venueadmin = false;
              this.suitsadmin = true;
              this.permission = 'suits';
            }
          }
        }
      );
    this.inceptionservicevar = this.inceptionservice.recevieparams()
      .subscribe(
        (payload: any)=>{
          if(payload !== null) {
            this.venueid = payload.venueid;
            this.venuenamelinkready = payload.venuenamelinkready;
            this.venuename = this.venuenamelinkready.replace(/_/g, ' ');
          }
        }
      );

    this.tabservicevar = this.inceptionservice.recevivesignal()
      .subscribe(
        (payload:any)=> {
          if (payload === 'roompage') {
            this.onroompage = true;
          }
          if (payload === 'venuepage') {
            this.onroompage = false;
          }
        });
    this.updatedvolleyvar = this.venuevolly.receiveupdated()
      .subscribe(
        (req: any)=>{
          if (req != null){
            this.showupdated = true;
            setTimeout(() =>{
              this.showupdated = false;
            }, 2500);
          }
        }
      );



    this.venuevollyservicevar = this.venuevolly.receiveobject()
      .subscribe(
        (req: any)=>{
          if(req !== null){
            this.venueobject = req;
            this.domain = '/venue/' + this.venueobject.name;
          }

        }
      );



  }

  ngOnDestroy(){
    this.inceptionservicevar.unsubscribe();
    this.venuevollyservicevar.unsubscribe();
    this.parentadminservicevar.unsubscribe();
    this.tabservicevar.unsubscribe();

  }


}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { VenueService } from "../../services/venueservice/venueservice";
import { ModalToggleService } from '../../services/pagemixins/modeltoggleservice/modaltoggle.service';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { VenueAdminParentAdminService } from "../../services/venueadmin/venueadminparentadminservice/venueadmin.parentadmin.service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SuitsAdminDependancySettings } from "../../services/pagedependancy/suitsadmin/suitssettings/suitssettings.dependancy.service";
import { DomSanitizer } from '@angular/platform-browser';
import {UserAuthorizationService} from "../../services/userservice/userauthorizationservice/userauthorizationservice";
import {NgForm} from "@angular/forms";
import {Makerfpservice} from "../../services/pagemixins/make-rfp.service";
import {ClientUserService} from "../../services/userservice/clientuserservice/clientuserservice";
import {BrowsevenuescomponentcommService} from "../../services/browsevenueservice/browsevenuescommservice/browsevenuescomponentcomm.service";

@Component({
  selector: 'app-venuepage',
  templateUrl: './venuepage.component.html',
  styleUrls: ['./venuepage.component.scss'],
  providers: [VenueService, SuitsAdminDependancySettings, Makerfpservice, ClientUserService]
})
export class VenuepageComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private venueservice: VenueService, private router: Router, private rfpmodaltoggle: ModalToggleService, private parentadminservice: VenueAdminParentAdminService, private modalService: NgbModal, private settingservice: SuitsAdminDependancySettings, public sanitizer: DomSanitizer, private authservice: UserAuthorizationService, private rfpservice: Makerfpservice, private clientservice: ClientUserService, private browsevenuescommservice:BrowsevenuescomponentcommService) { }

  // variable to hold venue name only needed if venue not send by venueservice
  rfpshow = false;
  venuename;
  venueadmin;
  option = false;
  permission;
  parentadminservicevar;
  userservicesubscription;
  user = null;
  // used for  event purpose dropdown on rfp
  eventpurpose;
  roomnames = [];



  // variable to hold venue object
  venue = {
    id: 0,
    name: '',
    fullbuyout: false,
    pricerating: null,
    venueimage_set: [
      {
        imageurl: '',
      },

    ],
    venuesamplemenu_set: [],
    cuisine1: '',
    cuisine2: '',
    description: '',
    latitude: '',
    longitude: '',
    experientialtype: '',
    onsiteparking: false,
    valetparking: false,
    valetparkingamount: '',
    room_set: [

    ]

  };

  savedevent = {
    date: '',
    programdate: '',
    dateflex: false,
    eventpurpose: '',
    roompreference: '',
    starttime: '',
    starttimeflex: false,
    endtime: '',
    endtimeflex: false,
    headcount: '',
    eventdetails: ''

  };
  loginorsignup = false;
  signup = false;
  invalidinfo = false;
  rfpsent =false;
  verifysignup = false;

  sendrfp(form:NgForm) {
    if (this.user == null) {
      this.savedevent.date = form.value.eventdate;
      this.savedevent.programdate = form.value.eventdate;
      this.savedevent.dateflex = form.value.dateflexcheckbox;
      this.savedevent.eventpurpose = form.value.eventpurpose;
      this.savedevent.starttime = form.value.starttime;
      this.savedevent.starttimeflex = form.value.starttimeflexcheckbox;
      this.savedevent.endtime = form.value.endtime;
      this.savedevent.endtimeflex = form.value.endtimeflexcheckbox;
      this.savedevent.roompreference = form.value.roomselect;
      this.savedevent.headcount = form.value.guestcount;
      this.savedevent.eventdetails = form.value.eventdetails;
      this.loginorsignup = true;
    }
    if(this.user != null){
      let payload = {
        eventdate: form.value.eventdate,
        programdate: form.value.eventdate,
        eventdateflex: form.value.dateflexcheckbox,
        eventpurpose: form.value.eventpurpose,
        startime: form.value.starttime,
        starttimeflex: form.value.starttimeflexcheckbox,
        endtime: form.value.endtime,
        endtimeflex: form.value.endtimecheckbox,
        roompreference : form.value.roomselect,
        guestcount: form.value.guestcount,
        eventdetails: form.value.eventdetails
      };
      payload.eventdate = this.datevaluetoname(payload.eventdate);
      this.rfpservice.emailrfp(payload, this.venue.id)
        .subscribe(
          (req: any) => {
            this.rfpsent = true;
          },
          (error)=>{
            if(error.status === 403){
              this.user = null;
              this.savedevent.date = form.value.eventdate;
              this.savedevent.programdate = form.value.eventdate;
              this.savedevent.dateflex = form.value.dateflexcheckbox;
              this.savedevent.eventpurpose = form.value.eventpurpose;
              this.savedevent.starttime = form.value.starttime;
              this.savedevent.starttimeflex = form.value.starttimeflexcheckbox;
              this.savedevent.endtime = form.value.endtime;
              this.savedevent.endtimeflex = form.value.endtimeflexcheckbox;
              this.savedevent.roompreference = form.value.roomselect,
                this.savedevent.headcount = form.value.guestcount;
              this.savedevent.eventdetails = form.value.eventdetails;
              this.loginorsignup = true;
            }
          }
        );

    }
  }

  useremail;
  userpassword;
  clientsignup(form:NgForm){
    let payload = {
      name: form.value.signupfirstname + ' ' + form.value.signuplastname,
      email: form.value.signupemail,
      password: form.value.signuppassword,
      companyname: form.value.companyname,
      phone: form.value.signupphoneinput,
      isclient: true,
      rfpsignup: true
    };
    this.useremail = payload.email;
    this.userpassword = payload.password;
    this.clientservice.createclientuser(payload)
      .subscribe(
        (req: any)=>{
          this.verifysignup = true;
        }
      );

  }

  login(form:NgForm){
    const payload = {
      email: form.value.loginemail,
      password: form.value.passwordlogin,
      localstorage: true
    };
    if(form.value.remembercheckbox == ''){
      payload.localstorage = false;
    }
    this.authservice.gettoken(payload);
  }

  // using password variable name in json as I am resuing password serializer on backend
  signupverify(form:NgForm){
    const payload ={
      password: form.value.signupverification
    };
    this.clientservice.clientverify(payload)
      .subscribe(
        (req: any)=>{
          const payload = {
            email: this.useremail,
            password: this.userpassword
          };
          this.authservice.gettoken(payload);


        }
      );

  }

  rfpusersignuptoggle(){
    this.signup = !this.signup;
  }


  // roomslideshowheight = '1rem';
  venueslideshowheight = '34rem';


  // variable to hold google maps object
  mapsurl = '';

  // spothero url for redirect to spot hero
  spotherourl ='';

  onclickrfpshow() {
    this.rfpshow = !this.rfpshow;
  }

  navtoroom(index) {
    let roomname = this.venue.room_set[index].name;
    roomname = roomname.replace(' ', '_');
    this.router.navigate([roomname], { relativeTo: this.route });

  }

  navfullbuyout() {
    this.router.navigate(['fullbuyout'], { relativeTo: this.route });
  }

  returntoadminpage() {
    let venuename = this.venue.name;
    venuename = venuename.replace(/ /g, '_');
    this.router.navigate(['/admin', this.permission, 'venue-admin', venuename, this.venue.id]);
  }

  // variable to hold venue service
  venueservicevar;

  // when rfp button is clicked toggle the modal to pop up from the navbar component
  togglerfpmodal() {
    this.rfpmodaltoggle.togglerfpmodal();
    this.venueservice.sendVenue(this.venue);
  }

  showrfpbuttons = false;
  rfpclick(){
    this.showrfpbuttons = !this.showrfpbuttons;
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

  // code for changing a date value to a date name
  datevaluetoname(eventdate){
    const spilteventdate = eventdate.split('-', 3);
    let eventdatename;
    const monthnumber = spilteventdate[1];
    if(monthnumber === '01'){
      eventdatename = 'January ';
    }
    else if(monthnumber === '02'){
      eventdatename = 'Febuary ';
    }
    else if(monthnumber === '03'){
      eventdatename = 'March ';
    }

    else if(monthnumber === '04'){
      eventdatename = 'April ';
    }

    else if(monthnumber === '05'){
      eventdatename = 'May ';
    }
    else if(monthnumber === '06'){
      eventdatename = 'June ';
    }
    else if(monthnumber === '07'){
      eventdatename = 'July ';
    }
    else if(monthnumber === '08'){
      eventdatename = 'August ';
    }
    else if(monthnumber === '09'){
      eventdatename = 'September ';
    }
    else if(monthnumber === '10'){
      eventdatename = 'October ';
    }
    else if(monthnumber === '11'){
      eventdatename = 'November ';
    }
    else {
      eventdatename = 'December';
    }
    eventdatename = eventdatename + spilteventdate[2] + ' ' + spilteventdate[0];
    return eventdatename;

  }

  ngOnInit() {
    this.browsevenuescommservice.sendstate('show');
    let cuisine;
    let experiential;

    this.venueadmin = this.route.snapshot.queryParams['option'] || null;
    if (this.venueadmin !== null) {
      this.option = true;
    }
    this.parentadminservicevar = this.parentadminservice.receivepermission()
      .subscribe(
        (req: any) => {
          if (req !== null) {
            this.permission = req;
          }
        });
    this.userservicesubscription = this.authservice.receiveuser()
      .subscribe(
        (req: any)=>{
          if(req == null){
            this.user = null;
          }
          if(req != null){
            this.user = req;
            this.loginorsignup = false;
          }
        });
    this.route.params
      .subscribe(
        (params: Params) => {
          this.venuename = params['name'];
          this.venuename = this.venuename.replace(/_/g, ' ');
          this.settingservice.getallcityobjects()
            .subscribe(
              (req: any) => {
                console.log(req);
                this.eventpurpose = req.eventpurpose;
                cuisine = req.cuisine;
                experiential = req.experientialtype;
                let preview = false;
                if(this.option){
                  preview = true;
                }

                this.venueservice.getvenuebyname(this.venuename, preview)
                  .subscribe(
                    (req: any) => {
                      console.log('this is the venue');
                      console.log(req);
                      this.venue = req.venue;
                      this.mapsurl = req.mapurl;
                      this.spotherourl = 'https://spothero.com/search?latitude=' + String(this.venue.latitude) + '&longitude=' + String(this.venue.longitude);
                      // add venue room names to room preference array.
                      // if fullbuyout equals true add full buy out option.
                      if(this.venue.fullbuyout){
                        this.roomnames.push('Full Buyout');
                      }
                      for(let room of this.venue.room_set){
                        this.roomnames.push(room.name);
                      }
                      for (let c of cuisine) {
                        if (this.venue.cuisine1 === c.pk) {
                          this.venue.cuisine1 = c.name;
                        }
                        if (this.venue.cuisine2 === c.pk) {
                          this.venue.cuisine2 = c.name;
                        }
                      }
                      for (let e of experiential) {
                        if (this.venue.experientialtype === e.pk) {
                          this.venue.experientialtype = e.type;
                        }
                      }
                      for (let image in this.venue.venueimage_set) {

                        this.venue.venueimage_set[+image] = this.venue.venueimage_set[+image].imageurl as any;
                      }
                      for (let room in this.venue.room_set) {
                        for (let image in this.venue.room_set[+room].roomimage_set) {
                          this.venue.room_set[+room].roomimage_set[+image] = this.venue.room_set[+room].roomimage_set[+image].imageurl as any;
                        }
                      }

                    });
              });
        });
  }

  ngOnDestroy() {
    this.browsevenuescommservice.sendstate('unshow');
    this.parentadminservicevar.unsubscribe();
  }

}

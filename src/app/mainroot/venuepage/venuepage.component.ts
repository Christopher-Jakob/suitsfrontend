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
import {RFPService} from "../../services/rfpservice/rfpservice";
declare var $: any;




@Component({
  selector: 'app-venuepage',
  templateUrl: './venuepage.component.html',
  styleUrls: ['./venuepage.component.scss'],
  providers: [VenueService, SuitsAdminDependancySettings, ClientUserService, RFPService]
})
export class VenuepageComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private venueservice: VenueService, private router: Router, private rfpmodaltoggle: ModalToggleService, private parentadminservice: VenueAdminParentAdminService, private modalService: NgbModal, private settingservice: SuitsAdminDependancySettings, public sanitizer: DomSanitizer, private authservice: UserAuthorizationService, private clientservice: ClientUserService, private browsevenuescommservice:BrowsevenuescomponentcommService, private rfpservice : RFPService) { }

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
        order: 0,
      },

    ],
    venuesamplemenu_set: [],
    cuisine1: '',
    cuisine2: '',
    description: '',
    latitude: '',
    longitude: '',
    searchneighborhood: '',
    experientialtype: '',
    onsiteparking: false,
    valetparking: false,
    valetparkingamount: '',
    room_set: [

    ]

  };

  savedevent = {
    name: '',
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
  invalidroom = false;



  sendrfp(form:NgForm) {
    this.invalidroom = false;
    if(form.value.roomselect === ''){
      this.invalidroom = true;
      return;
    }
    if (this.user == null) {
      this.savedevent.name = form.value.eventname;
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
    if (this.user != null) {
      let payload = {
        name: form.value.eventname,
        eventname: form.value.eventname,
        eventdate: form.value.eventdate,
        programdate: form.value.eventdate,
        eventdateflex: form.value.dateflexcheckbox,
        eventpurpose: form.value.eventpurpose,
        eventpurposepk: null,
        startime: form.value.starttime,
        starttimeflex: form.value.starttimeflexcheckbox,
        endtime: form.value.endtime,
        endtimeflex: form.value.endtimecheckbox,
        roompreference: form.value.roomselect,
        guestcount: form.value.guestcount,
        eventdetails: form.value.eventdetails
      };
      for (let p of this.eventpurpose) {
        if (p.purpose === payload.eventpurpose) {
          payload.eventpurposepk = p.pk;
        }
      }
      payload.eventdate = this.datevaluetoname(payload.eventdate);
      this.rfpservice.emailrfp(payload, this.venue.id)
        .subscribe(
          (req: any) => {
            this.rfpsent = true;
            form.reset();
            this.user = null;
          },
          (error) => {
            console.log(error);
            if (error.status === 401){
              this.savedevent.name = form.value.eventname;
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
            if (error.status === 403) {
              this.user = null;
              this.savedevent.name = form.value.eventname;
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

          });

    }

  }

  populaterfpfromsaved(index, create, prop){
    console.log('it fired to open the rfp modal');
    const scoperfp = this.savedrfps[index];
    this.savedevent.name = scoperfp.name;
    this.savedevent.date = scoperfp.eventdate;
    this.savedevent.programdate = scoperfp.programdate;
    this.savedevent.dateflex = scoperfp.dateflex;
    this.savedevent.eventpurpose = scoperfp.eventpurpose.purpose;
    this.savedevent.starttime = scoperfp.startime;
    this.savedevent.starttimeflex = scoperfp.starttimeflex;
    this.savedevent.endtime = scoperfp.endtime;
    this.savedevent.endtimeflex = scoperfp.endtimeflex;
    this.savedevent.headcount = scoperfp.guestcount;
    this.savedevent.eventdetails = scoperfp.eventdetails;
    this.createpropopen(prop);
    this.createsaveservice.close();


  }
  invalidsignup = false;
  emailnomatch = false;
  passwordnomatch = false;
  savedrfps = [];
  useremail;
  userpassword;
  clientsignup(form:NgForm){
    if(!form.valid){
      this.invalidsignup = true;
      setTimeout(()=>{
        this.invalidsignup = false;
      },3000);
      return 1;
    }
    let payload = {
      name: form.value.signupfirstname + ' ' + form.value.signuplastname,
      email: form.value.signupemail,
      password: form.value.signuppassword,
      permission: null,
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

  // variable used to reset rfp dropdown
  dropdownreset = "";
  // determine which rfp to send

  rfptoggle(form:NgForm, createnew, createsaved){
    if(form.value.rfpsendselect === 'n'){
      this.createpropopen(createnew);
      this.dropdownreset = 'n';
      this.dropdownreset = '';

    }
    if(form.value.rfpsendselect === 's'){
      this.createsaveopen(createsaved);
      this.dropdownreset = "s";
      this.dropdownreset = '';
    }

  }




  closeResult: string;
  isCollapsed = true;

  createpropservice;
  createsaveservice;

  createpropopen(content) {
    this.createpropservice = this.modalService.open(content);
    this.createpropservice.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

   createsaveopen(content){
    this.createsaveservice = this.modalService.open(content);
    this.createsaveservice.result.then((result) => {
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

  emailconfrim(form:NgForm){
    let form1 = form.value.signupemail;
    let form2 = form.value.signupemailconfrim;
    if(form1 !== form2){
      this.emailnomatch = true;
    }
    if(form1 === form2){
      this.emailnomatch = false;
    }
  }
  passwordconfirm(form:NgForm){
    let form1 = form.value.signuppassword;
    let form2 = form.value.signuppasswordconfrim;
    if(form1 !== form2){
      this.passwordnomatch = true;
    }
    if(form1 === form2){
      this.passwordnomatch = false;
    }
  }



  ngOnInit() {
    this.userservicesubscription = this.authservice.receiveuser()
      .subscribe(
        (req: any) => {
          if (req == null) {
            console.log('the user is set to null after logout');
            this.user = null;
            console.log(this.user);
          }
          if (req != null) {
            this.user = req;
            this.loginorsignup = false;
            this.rfpservice.getsavedrfps()
              .subscribe(
                (req: any)=>{
                  this.savedrfps = req;
                  console.log('this is the saved rfps');
                  console.log(this.savedrfps);
                }
              );
          }
        });

    window.scrollTo(0,0);
    this.browsevenuescommservice.sendstate('show');
    let cuisine;
    let experiential;
    let searchneighborhood;

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

    this.route.params
      .subscribe(
        (params: Params) => {
          this.venuename = params['name'];
          this.venuename = this.venuename.replace(/_/g, ' ');
          this.settingservice.getallcityobjects()
            .subscribe(
              (req: any) => {
                console.log('here are the settings objects');
                console.log(req);
                this.eventpurpose = req.eventpurpose;
                cuisine = req.cuisine;
                experiential = req.experientialtype;
                searchneighborhood = req.neighborhood;
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
                      for(let n of searchneighborhood ){
                        if(this.venue.searchneighborhood === n.pk){
                          console.log('the neighborhood got done');
                          this.venue.searchneighborhood = n.neighborhood;
                        }
                      }
                      this.venue.venueimage_set = this.venue.venueimage_set.sort((a, b) => ((a.order) < (b.order) ? -1 : ((a.order) > (b.order) ? 1 : 0)));
                      for (let image in this.venue.venueimage_set) {
                        this.venue.venueimage_set[+image] = this.venue.venueimage_set[+image].imageurl as any;
                      }
                      let onlinerooms = [];
                      for (let room in this.venue.room_set) {
                        if (this.venue.room_set[room].online) {
                          onlinerooms.push(this.venue.room_set[room]);
                        }
                      }
                      for(let room in onlinerooms){
                        let workingroomimages = onlinerooms[room].roomimage_set;
                        workingroomimages = workingroomimages.sort((a, b) => ((a.order) < (b.order) ? -1 : ((a.order) > (b.order) ? 1 : 0)));
                        for(let image in workingroomimages){
                          workingroomimages[image] = workingroomimages[image].imageurl as any;
                        }
                        onlinerooms[room].roomimage_set = workingroomimages;
                      }
                      this.venue.room_set = onlinerooms;


                    });
              });
        });



  }

  ngOnDestroy() {
    this.browsevenuescommservice.sendstate('unshow');
    this.parentadminservicevar.unsubscribe();
    this.userservicesubscription.unsubscribe();
    this.createpropservice = null;
    this.createsaveservice = null;
    this.user = null;
  }

}

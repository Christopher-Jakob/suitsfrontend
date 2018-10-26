import {Component, OnInit, OnDestroy} from '@angular/core';
import {VenueService} from "../../services/venueservice/venueservice";
import {NgForm} from "@angular/forms";
import {ModalToggleService} from '../../services/pagemixins/modeltoggleservice/modaltoggle.service';
import {RoompageDependancyService} from '../../services/pagedependancy/roompage/roompage.dependancy.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BrowsevenuescomponentcommService} from "../../services/browsevenueservice/browsevenuescommservice/browsevenuescomponentcomm.service";
import {RFPService} from "../../services/rfpservice/rfpservice";
import {ClientUserService} from "../../services/userservice/clientuserservice/clientuserservice";
import {UserAuthorizationService} from "../../services/userservice/userauthorizationservice/userauthorizationservice";
import {SuitsAdminDependancySettings} from "../../services/pagedependancy/suitsadmin/suitssettings/suitssettings.dependancy.service";

@Component({
  selector: 'app-roompage',
  templateUrl: './roompage.component.html',
  styleUrls: ['./roompage.component.scss'],
  providers:[RoompageDependancyService, RFPService, ClientUserService, SuitsAdminDependancySettings]
})
export class RoompageComponent implements OnInit, OnDestroy {

  constructor(private venueservice: VenueService, private route: ActivatedRoute, private roompagedependancyservice: RoompageDependancyService, private router: Router, private rfpmodaltoggle: ModalToggleService, private modalService: NgbModal, private browsevenuescommservice:BrowsevenuescomponentcommService, private rfpservice : RFPService, private clientservice: ClientUserService,  private authservice: UserAuthorizationService, private settingservice: SuitsAdminDependancySettings) {
  }

  eventpurpose;
  createpropservice;
  createsaveservice;
  signup =false;
  rfpshow = false;
  verifysignup = false;
  venuename;
  venueadmin;
  emailnomatch = false;
  passwordnomatch = false;
  option = false;
  permission;
  rfpsent = false;
  loginorsignup =false;
  parentadminservicevar;
  userservicesubscription;
  user = null;
  // used for  event purpose dropdown on rfp
  roomnames = [];

  // height
  roomheight = "30rem";

  // modal code
  makerfpmodal = false;

  showmakerfpmodal() {
    this.makerfpmodal = !this.makerfpmodal;
  }

  unshowmakerfpmodal() {
    this.makerfpmodal = false;
  }

  navigatetoroom(index) {
    let name;
    if (index === 'fullbuyout') {
      name = 'fullbuyout';
    } else {
      name = this.otherrooms[index].name;
      name = name.replace(/ /g, '_');
    }
    this.router.navigate(['/venue', this.linkvenuename, name]);
  }

  fullbuyoutroomactive = false;

  // venuename from route param name used for navigation
  venue = {
    id: null,
    name: '',
    venueimage_set: [],
    room_set:[],
    fullbuyoutonline: false,
    fullbuyoutminspend: null,
    venuefullbuyoutphoto_set: [],
    fullbuyoutstandingcapactiy: null,
    fullbuyoutseatedcapacity: null

  };
  room = {
    // things that you didn't put in
    privateroom: false,
    semiprivateroom: false,
    seatedcapacity: null,
    standingcapacity: null,
    minimumspend: null,
    surroundsoundamenity: false,
    classroomamenity: false,
    stageamenity: false,
    televisionamenity: false,
    screenprojectoramenity: false,
    naturallightamenity: false,
    wifiamenity:false,
    privatecoatcheck: false,
    privatewashroom: false,
    privatebar: false,
    wheelchairamenity:false,
    cocktailstandingseatingoption: false,
    classroomseatingoption: false,
    ushapeseatingoption: false,
    sixtyroundseatingoption: false,
    seventy2roundseatingoption : false,
    boardroomseatingoption: false,
    theaterseatingoption: false,
    hallowsquareseatingoption: false,
    roomimage_set: [],

  };
  otherrooms = [];
  roomname;
  linkvenuename;

  // receiveroom subject observable variable
  receiveroom;

  // receiveveue subject observable variable
  receivevenue;

  // all amenities
  allamenities = [];

  //room amenities
  roomamenities;
  roomamenitiesobjects = [];

  // all setuptypes
  allsetuptypes = [];

  //room setuptypes
  roomsetuptypes;
  roomsetuptypesobjects = [];

  //other rooms to be displayed
  closeResult: string;

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
  invalidroom = false;
  sendrfp(form: NgForm) {
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


  savedrfps =[];
  useremail;
  userpassword;
  clientsignup(form:NgForm){
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

  navigatetofullbuyout(){
    this.router.navigate(['/venue',this.venue.name,'fullbuyout']);
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
  choicesload = true;
  ngOnInit() {

    this.settingservice.getallcityobjects()
      .subscribe(
        (req: any) => {
          this.eventpurpose = req.eventpurpose;
        });

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

    this.browsevenuescommservice.sendstate('show');
    this.route.params
      .subscribe(
        (params: Params)=>{
          window.scrollTo(0,0);
          this.fullbuyoutroomactive = false;
          this.otherrooms = [];
          this.venue = null;
          this.room = null;
          this.venuename = params['name'];
          this.roomname = params['room'];
          this.linkvenuename = this.venuename;
          this.venuename = this.venuename.replace(/_/g, ' ');
          if(this.roomname === 'fullbuyout'){
            this.fullbuyoutroomactive = true;
          }
          if(this.roomname !== 'fullbuyout'){
            this.roomname = this.roomname.replace(/_/g, ' ');
          }
          // option is a hack to  allow venue admins to see their offline venues
          let option = false;

          this.venueservice.getvenuebyname(this.venuename, option )
            .subscribe(
              (req: any)=>{
                this.venue = req.venue;
                console.log("this is venue");
                console.log(this.venue);
                this.venue.venueimage_set = this.venue.venueimage_set = this.venue.venueimage_set.sort((a, b) => ((a.order) < (b.order) ? -1 : ((a.order) > (b.order) ? 1 : 0)));
                for(let image in this.venue.venueimage_set){
                  this.venue.venueimage_set[+image] = this.venue.venueimage_set[+image].imageurl as any;
                }
                this.venue.venuefullbuyoutphoto_set = this.venue.venuefullbuyoutphoto_set = this.venue.venuefullbuyoutphoto_set.sort((a, b) => ((a.order) < (b.order) ? -1 : ((a.order) > (b.order) ? 1 : 0)));
                for(let image in this.venue.venuefullbuyoutphoto_set){
                  this.venue.venuefullbuyoutphoto_set[+image] = this.venue.venuefullbuyoutphoto_set[+image].imageurl as any;
                }

                for(let r in this.venue.room_set) {
                  this.roomnames.push(this.venue.room_set[r].name);
                  if (this.venue.room_set[+r].name === this.roomname) {
                    this.room = this.venue.room_set[+r];

                    console.log("this is the room");

                    console.log(this.room);
                    let roomimageset = this.room.roomimage_set;
                    console.log('this is the roomset pre sort');
                    console.log(roomimageset);
                    roomimageset = roomimageset.sort((a, b) => ((a.order) < (b.order) ? -1 : ((a.order) > (b.order) ? 1 : 0)));
                    console.log('this is the roomset post sort');
                    console.log(roomimageset);
                    for (let image in roomimageset) {
                      roomimageset[+image] = roomimageset[+image].imageurl;
                    }
                    this.room.roomimage_set = roomimageset;
                  }
                  if (this.venue.room_set[+r].online && this.venue.room_set[+r].name !== this.roomname) {
                    let workingroom = this.venue.room_set[+r];
                    let images = workingroom.roomimage_set;
                    images = images.sort((a, b) => ((a.order) < (b.order) ? -1 : ((a.order) > (b.order) ? 1 : 0)));
                    for (let i in images) {
                      images[i] = images[i].imageurl;
                    }
                    workingroom.roomimage_set = images;
                    this.otherrooms.push(workingroom);
                  }
                }
                this.choicesload = false;

              });
        });
  }

  ngOnDestroy(){
    this.otherrooms =[];
    this.browsevenuescommservice.sendstate('unshow');

  }

}

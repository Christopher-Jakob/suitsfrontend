import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {VenueAdminVolleyService} from "../../../../../services/venueadmin/venueadminvolleyservice/venueadmin.volley.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {VenueAdminInceptionService} from "../../../../../services/venueadmin/venueadmininceptionservice/venueadmin.inception.service";
import {VenueAdminVenueRoomDetailService} from "../../../../../services/venueadmin/venueadminroomdetailservice/venueadmin.venueroom.detail.service";
import {VenueAdminProfileService} from "../../../../../services/venueadmin/venueadminprofileservice/venueadmin.profile.service";
import {VenueAdminParentAdminService} from "../../../../../services/venueadmin/venueadminparentadminservice/venueadmin.parentadmin.service";
import {AwsService} from "../../../../../services/amazonwebservice services/aws.services";


@Component({
  selector: 'app-venueroomadminpage',
  templateUrl: './venueroomadminpage.component.html',
  styleUrls: ['./venueroomadminpage.component.scss'],
  providers: [VenueAdminVenueRoomDetailService, VenueAdminProfileService]
})
export class VenueroomadminpageComponent implements OnInit, OnDestroy {
  volleyservicevar;
  permission;
  venueid;
  capacitytype;
  fullbuyoutedit = false;

  constructor(private volleyservice: VenueAdminVolleyService, private route: ActivatedRoute, private router: Router, private roomdetailservice: VenueAdminVenueRoomDetailService, private profileservice: VenueAdminProfileService, private permissionservice: VenueAdminParentAdminService, private inceptionservice: VenueAdminInceptionService, private awsservice: AwsService) {
  }

  //full buyout photos code
  showfullbuyoutphoto = false;
  showfullbuyoutuploadphoto = false;
  fullbuyoutphotoshow(){
    this.showfullbuyoutuploadphoto = true;
    this.showfullbuyoutphoto = false;
  }

  displayfullbuyoutphotos(){
    this.showfullbuyoutphoto =true;
    this.showfullbuyoutuploadphoto = false;
  }

  addfullbuyoutphoto(event, form:NgForm){
    let submittedimage = null;
    submittedimage = event.target.files[0];
    const payload = {};
    this.awsservice.venuefullbuyoutpolicycreate(payload, this.venueobject.id)
      .subscribe(
        (req: any)=>{
          const databasekey = req.fields.key;
          const databaseurl = req.uriroot + databasekey;
          const venuefullbuyoutimagepk = req.fullbuyoutimagepk;
          const venuepk = req.venuepk;
          let fd = new FormData();
          fd.append('acl', req.fields.acl);
          fd.append('key', req.fields.key);
          fd.append('content-type', req.fields['content-type']);
          fd.append('policy', req.fields.policy);
          fd.append('x-amz-algorithm', req.fields['x-amz-algorithm']);
          fd.append('x-amz-credential', req.fields['x-amz-credential']);
          fd.append('x-amz-date', req.fields['x-amz-date']);
          fd.append('x-amz-signature', req.fields['x-amz-signature']);
          fd.append('file', submittedimage);
          form.reset();
          this.awsservice.uploadtos3(req.url, fd)
            .subscribe(
              (req: any)=>{
                const payload = {
                  venue: venuepk,
                  order: this.venueobject.venuefullbuyoutphoto_set.length + 1,
                  key: databasekey,
                  imageurl: databaseurl

              };
                this.awsservice.updatevenuefullbuyoutphotoinstance(venuefullbuyoutimagepk, payload)
                  .subscribe(
                    (req: any)=>{
                      this.venueobject.venuefullbuyoutphoto_set.push(req);
                      this.displayfullbuyoutphotos();
                    }
                  );
              });

        });


  }

  // venue object is only used if this is a full buyout room
  // preview urls
  roomurl;
  fullbuyouturl;
  venueobject = {
    id: null,
    name: null,
    city: null,
    streetaddress1: null,
    state: null,
    zipcode: null,
    phonenumber: null,
    venueimage_set: [],
    venuecontactname: null,
    venuecontactjobtitle: null,
    venuecontactemail: null,
    fullbuyoutonline: null,
    venuefullbuyoutphoto_set: [],
  };
  roomobject = {
    pk: 1,
    id: 1,
    name: '',
    online: false,
    description: '',
    privateroom: false,
    semiprivateroom: false,
    seatedcapacity: '',
    standingcapacity: '',
    minimumspend: '',
    surroundsoundamenity: false,
    outdoorseatingamenity: false,
    stageamenity: false,
    televisionamenity: false,
    screenprojectoramenity: false,
    naturallightamenity: false,
    wifiamenity: false,
    wheelchairaccessibleamenity: false,
    cocktailstandingseatingoption: false,
    classroomseatingoption: false,
    ushapeseatingoption: false,
    sixtyroundseatingoption: false,
    boardroomseatingoption: false,
    theaterseatingoption: false,
    hallowsquareseatingoption: false,
    roomimage_set: []
  };

  // status bar code

  roomoffline() {
    if (!this.fullbuyoutedit) {
      const payload = {
        venue: this.venueobject.id,
        online: false
      };
      this.roomdetailservice.updateroom(payload, this.venueobject.id, this.roomobject.pk)
        .subscribe(
          (req: any) => {
            this.roomobject.online = false;
          }
        );
    }
    if (this.fullbuyoutedit) {
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
        fullbuyoutonline: false
      };
      this.profileservice.venueprofileupdate(payload, this.venueobject.id)
        .subscribe(
          (req: any) => {
            this.venueobject.fullbuyoutonline = false;
          }
        );

    }
  }

  fullbuyoutroompreview(){
    this.router.navigate(['/preview','venue',this.venueobject.name, 'fullbuyout']);
  }

  fullbuyoutnoonline = false;
  roomnoonline = false;
  roomonline() {
    if (!this.fullbuyoutedit) {
      const roomimagelength = this.roomobject.roomimage_set.length;
      if(roomimagelength < 1 && !this.roomobject.online){
        this.roomnoonline = true;
        setTimeout(()=>{
          this.roomnoonline = false;
        }, 5000);
        return 0;
      }
      const payload = {
        venue: this.venueobject.id,
        online: true
      };
      this.roomdetailservice.updateroom(payload, this.venueobject.id, this.roomobject.pk)
        .subscribe(
          (req: any) => {
            this.roomobject.online = true;
          }
        );
    }
    if (this.fullbuyoutedit) {
      const venueimagelength = this.venueobject.venueimage_set.length;
      if(venueimagelength < 1 && !this.venueobject.fullbuyoutonline){
        this.fullbuyoutnoonline = true;
        setTimeout(()=>{
          this.fullbuyoutnoonline = false;
        }, 5000);
        return 0;
      }
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
        fullbuyoutonline: true
      };
      this.profileservice.venueprofileupdate(payload, this.venueobject.id)
        .subscribe(
          (req: any) => {
            this.venueobject.fullbuyoutonline = true;
          }
        );

    }
  }


  @ViewChild('fullbuyouttopparmsform') fullbuyouttopparamsform: NgForm;
  @ViewChild('roomdescriptionfullbuyoutform') roomdescriptionfullbuyoutform: NgForm;
  @ViewChild('amenitiesfullbuyoutform') amenitiesfullbuyoutform:NgForm;
  fullbuyoutsave(){
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
      fullbuyoutmicrophoneamenity: this.amenitiesfullbuyoutform.form.value.microphonefullbuyout,
      fullbuyoutminspend : this.fullbuyouttopparamsform.form.value.minspendinputfullbuyout,
      fullbuyoutseatedcapacity : this.fullbuyouttopparamsform.form.value.seatedcapacityinputfullbuyout,
      fullbuyoutstandingcapactiy : this.fullbuyouttopparamsform.form.value.standingcapacityinputfullbuyout,
      fullbuyoutdescription : this.roomdescriptionfullbuyoutform.form.value.roomdescriptionfullbuyoutinput,
      fullbuyoutsurrondsoundamenity : this.amenitiesfullbuyoutform.form.value.surroundsoundcheckboxfullbuyout,
      fullbuyoutstageamenity : this.amenitiesfullbuyoutform.form.value.stagecheckboxfullbuyout,
      fullbuyoutoutdoorseatingamenity: this.amenitiesfullbuyoutform.form.value.outdoorseattingcheckboxfullbuyout,
      fullbuyouttelevisionamenity : this.amenitiesfullbuyoutform.form.value.televisioncheckboxfullbuyout,
      fullbuyoutscreenprojectoramenity : this.amenitiesfullbuyoutform.form.value.screenprojectorcheckboxfullbuyout,
      fullbuyoutnaturallightamenity : this.amenitiesfullbuyoutform.form.value.naturallightcheckboxfullbuyout,
      fullbuyoutwifiamenity : this.amenitiesfullbuyoutform.form.value.wificheckboxfullbuyout,
      fullbuyoutwheelchairaccessibleamenity : this.amenitiesfullbuyoutform.form.value.wheelchaircheckboxfullbuyout,
      fullbuyoutcocktailstandingseatingoption : this.amenitiesfullbuyoutform.form.value.cocktailstandingcheckboxfullbuyout,
      fullbuyoutclassroomseatingoption : this.amenitiesfullbuyoutform.form.value.classroomseatingcheckboxfullbuyout,
      fullbuyoutushapeseatingoption : this.amenitiesfullbuyoutform.form.value.ushapecheckboxfullbuyout,
      fullbuyoutsixtyroundseatingoption : this.amenitiesfullbuyoutform.form.value.sixtyinchroundscheckboxfullbuyout,
      fullbuyoutboardroomseatingoption :  this.amenitiesfullbuyoutform.form.value.boardroomcheckboxfullbuyout,
      fullbuyouttheaterseatingoption : this.amenitiesfullbuyoutform.form.value.theatercheckboxfullbuyout,
      fullbuyouthallowsquareseatingoption: this.amenitiesfullbuyoutform.form.value.hallowsquarecheckboxfullbuyout

    };
    this.profileservice.venueprofileupdate(payload, this.venueobject.id)
      .subscribe(
        (req: any)=>{
          this.venueobject = req;
          this.volleyservice.sendupdated();
          this.volleyservice.sendobject(this.venueobject);
        });
  }


  deleteconfrimshow = false;

  showdeleteconfrim(){
    this.deleteconfrimshow = true;
  }
  unshowdeleteroomconfrim(){
    this.deleteconfrimshow = false;
  }

  deleteroom(){
    this.roomdetailservice.deleteroom(this.venueobject.id, this.roomobject.pk)
      .subscribe(
        (req: any)=>{
          let name = this.venueobject.name;
          name = name.replace(/ /g, '_');
          this.router.navigate(['/admin',this.permission,'venue-admin',name,this.venueobject.id,'room','list']);
        }
      );
  }

  @ViewChild('topparamsform') topparamsform: NgForm;
  @ViewChild('roomdescriptionform') roomdescriptionform: NgForm;
  @ViewChild('amenitiesseatingform') amenitiesseatingform: NgForm;
  savevenueroom() {
    const venuepk = this.venueobject.id;
    let roompk = this.roomobject.pk;
    if(roompk == null){
      roompk = this.roomobject.id;
    }
    let payload = {
      name: this.topparamsform.form.value.roomnameinput,
      description: this.roomdescriptionform.form.value.roomdescriptioninput,
      privateroom: false,
      semiprivateroom: false,
      seatedcapacity: this.topparamsform.form.value.seatedcapacityinput,
      standingcapacity: this.topparamsform.form.value.standingcapacityinput,
      minimumspend: this.topparamsform.form.value.minspendinput,
      surroundsoundamenity: this.amenitiesseatingform.form.value.surroundsoundcheckbox,
      outdoorseatingamenity: this.amenitiesseatingform.form.value.outdoorseattingcheckbox,
      stageamenity: this.amenitiesseatingform.form.value.stagecheckbox,
      televisionamenity: this.amenitiesseatingform.form.value.televisioncheckbox,
      microphoneamenity: this.amenitiesseatingform.form.value.microphoneamenitycheckbox,
      screenprojectoramenity: this.amenitiesseatingform.form.value.screenprojectorcheckbox,
      naturallightamenity: this.amenitiesseatingform.form.value.naturallightcheckbox,
      wifiamenity: this.amenitiesseatingform.form.value.wificheckbox,
      wheelchairaccessibleamenity: this.amenitiesseatingform.form.value.wheelchaircheckbox,
      cocktailstandingseatingoption: this.amenitiesseatingform.form.value.cocktailstandingcheckbox,
      classroomseatingoption: this.amenitiesseatingform.form.value.classroomseatingcheckbox,
      ushapeseatingoption: this.amenitiesseatingform.form.value.ushapecheckbox,
      sixtyroundseatingoption:this.amenitiesseatingform.form.value.sixtyinchroundscheckbox,
      boardroomseatingoption: this.amenitiesseatingform.form.value.boardroomcheckbox,
      theaterseatingoption: this.amenitiesseatingform.form.value.theatercheckbox,
      hallowsquareseatingoption: this.amenitiesseatingform.form.value.hallowsquarecheckbox
    };
    if(this.topparamsform.form.value.privateroomcheckbox === 'privateroom'){
      payload.privateroom = true;
      payload.semiprivateroom = false;
    }

    if(this.topparamsform.form.value.privateroomcheckbox === 'semiprivate'){
      payload.privateroom = false;
      payload.semiprivateroom = true;
    }

    this.roomdetailservice.updateroom(payload, venuepk, roompk)
      .subscribe(
        (req: any)=>{
          this.roomobject = req;
          this.volleyservice.sendupdated();
          console.log(this.roomobject);

        }
      );
  }

  roompreview(){
    this.router.navigate(['/preview', 'venue',this.venueobject.name, this.roomobject.name]);
  }


  // add room photo  code
  showfileuploadform = false;
  hidecancelbutton = false;
  showphotos = false;

  activateshowfileuploadform(){
    this.showfileuploadform = true;
    this.showphotos = false;
  }

  deactivateshowfileuploadform(){
    this.showfileuploadform = false;
  }

  roomphotoshow() {
    this.showfileuploadform = false;
    this.showphotos = true;
  }

  addroomphoto(event) {
    const submittedimage = event.target.files[0];
    const payload = {};
    let roomid = this.roomobject.pk;
    console.log('here is the room id as pk');
    console.log(roomid);
    if(roomid == null){
      console.log('here is the room id as id');
      roomid = this.roomobject.id;
      console.log(roomid);
    }
    this.awsservice.roomphotocreateandpolicy(roomid, payload)
      .subscribe(
        (req: any)=>{
          const roomimagepk = req.roomimagepk;
          console.log('here is the roomimage pk from the create and policy api call');
          console.log(roomimagepk);
          const roompk = req.roompk;
          const databasekey = req.fields.key;
          const databaseurl = req.uriroot + databasekey;
          let fd = new FormData();
          fd.append('acl', req.fields.acl);
          fd.append('key', req.fields.key);
          fd.append('content-type', req.fields['content-type']);
          fd.append('policy', req.fields.policy);
          fd.append('x-amz-algorithm', req.fields['x-amz-algorithm']);
          fd.append('x-amz-credential', req.fields['x-amz-credential']);
          fd.append('x-amz-date', req.fields['x-amz-date']);
          fd.append('x-amz-signature', req.fields['x-amz-signature']);
          fd.append('file', submittedimage);
          this.awsservice.uploadtos3(req.url, fd)
            .subscribe(
              (req: any)=>{
                const payload = {
                  key: databasekey,
                  order: this.roomobject.roomimage_set.length+1,
                  imageurl: databaseurl
                };
                this.awsservice.updateroomphotoinstance(roomimagepk, payload)
                  .subscribe(
                    (req: any)=>{
                      this.showfileuploadform = false;
                      this.roomobject.roomimage_set.push(req);
                      console.log('this is the room object');
                      console.log(this.roomobject);
                      this.roomphotoshow();
                    });
              });
        });

  }


  ngOnInit() {
    this.inceptionservice.sendsignal('roompage');
    this.volleyservicevar = this.volleyservice.receiveobject()
      .subscribe(
        (req: any) => {
          this.venueobject = req;
          console.log('this is the venueobject');
          console.log(this.venueobject);
          this.route.params
            .subscribe(
              (params: any) => {
                let roompk;
                roompk = params['pk'];
                if (roompk === 'fullbuyout') {
                  this.fullbuyoutedit = true;
                }
                if (!this.fullbuyoutedit) {
                  this.roomdetailservice.getroom(this.venueobject.id, roompk)
                    .subscribe(
                      (req: any) => {
                        this.roomobject = req;
                        console.log('this is the room object');
                        console.log(this.roomobject);
                        this.volleyservice.sendroom(this.roomobject);
                        if (req.privateroom) {
                          this.capacitytype = 'privateroom';
                        }
                        if (req.semiprivateroom) {
                          this.capacitytype = 'semiprivate';
                        }
                        this.roomurl = '/venue/' + this.venueobject.name + '/' + this.roomobject.name;
                      });
                }
                this.fullbuyouturl = '/venue/' + this.venueobject.name + '/fullbuyout';
              });
        });
    this.permissionservice.receivepermission()
      .subscribe(
        (req: any)=>{
          this.permission = req;
        }
      );
  }
  ngOnDestroy(){
    this.volleyservicevar.unsubscribe();

  }

}

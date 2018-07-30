import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VenueAdminVolleyService} from "../../../../services/venueadmin/venueadminvolleyservice/venueadmin.volley.service";
import {acceptedimagetypes} from '../../../../constants/constants';
import {VenueAdminCreateEditService} from "../../../../services/venueadmin/venueadmincrediteditservice/venueadmin.createedit.service";
import {NgForm} from "@angular/forms";
import {VenueAdminParentAdminService} from "../../../../services/venueadmin/venueadminparentadminservice/venueadmin.parentadmin.service";
import {VenueAdminInceptionService} from "../../../../services/venueadmin/venueadmininceptionservice/venueadmin.inception.service";
import {AwsService} from "../../../../services/amazonwebservice services/aws.services";
import {VenueAdminProfileService} from "../../../../services/venueadmin/venueadminprofileservice/venueadmin.profile.service";
import {VenueUserService} from "../../../../services/userservice/venueuserservice/venueuserservice";
import {SuitsAdminDependancySettings} from "../../../../services/pagedependancy/suitsadmin/suitssettings/suitssettings.dependancy.service";
import {SuitsSettingsService} from "../../../../services/suitsadmin/suitssettingsservice/suitssettings.service";

@Component({
  selector: 'app-venuecreateedit',
  templateUrl: './venuecreateedit.component.html',
  styleUrls: ['./venuecreateedit.component.scss'],
  providers: [AwsService, VenueAdminProfileService, VenueUserService, SuitsAdminDependancySettings, SuitsSettingsService]
})
export class VenuecreateeditComponent implements OnInit, OnDestroy {
  constructor(private volleyservice: VenueAdminVolleyService, private parentadminservice: VenueAdminParentAdminService, private inceptionservice: VenueAdminInceptionService, private awsservice: AwsService, private profileservice: VenueAdminProfileService, private userservice: VenueUserService, private citydependancy: SuitsAdminDependancySettings, private neighborhooddependancy: SuitsSettingsService) {}
  parentadminservicevar;
  venuevolleyservicevar;
  permission;
  suitspermission = false;
  venuepermission = false;
  searchcitylist = [];
  searchneighborhoodlist = [];
  venueid;
  venueobject;
  venueusers =[];



  // group photo code
  showgroupphotoeditform = false;

  choicesload = false // <-- boolean for loading circle
  addgroupphoto(event){
    this.choicesload = true;
    let submittedimage = event.target.files[0];
    const payload = {};
    this.awsservice.venueprofilephotopolicy(payload)
      .subscribe(
        (req: any)=>{
          const databasekey = req.fields.key;
          const uriroot = req.uriroot;
          let fd = new FormData();
          fd.append('acl', req.fields.acl);
          fd.append('key', req.fields.key);
          fd.append('content-type', req.fields["content-type"]);
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
                  venue : this.venueobject.id,
                  name: this.venueobject.name,
                  venuelogo: uriroot + databasekey,
                  venuelogokey: databasekey,
                  city: this.venueobject.city,
                  streetaddress1: this.venueobject.streetaddress1,
                  state: this.venueobject.state,
                  zipcode: this.venueobject.zipcode,
                  phonenumber: this.venueobject.phonenumber,
                  venuecontactname: this.venueobject.venuecontactname,
                  venuecontactjobtitle: this.venueobject.venuecontactjobtitle,
                  venuecontactemail: this.venueobject.venuecontactemail
                };
                this.profileservice.venueprofileupdate(payload, this.venueobject.id)
                  .subscribe(
                    (req: any)=>{
                      this.venueobject = req;
                      this.showgroupphotoeditform = false;
                      this.volleyservice.sendobject(this.venueobject);
                      this.choicesload = false;
                    }
                  );
              });

        }
      );



  }
  improperphone = false;
  checkphone(form: NgForm){
    let input = form.value.newuserphoneinput;
    const re =  new RegExp('[0-9]{10}');
    let test =  re.test(input);
    if(!test){
      console.log('it is failing regex');
      this.improperphone = true;
    }
    if(test){
      console.log('it is passing regex');
      this.improperphone = false;
    }

  }

  showgroupeditform(){
    this.showgroupphotoeditform = true;
  }

  unshowgroupphotoeditform(){
    this.showgroupphotoeditform = false;
  }

  //venue profile code
  showvenueprofilesubmitbutton = false;
  activatevenueprofilesubmitbutton(){
    this.showvenueprofilesubmitbutton = true;
  }
  @ViewChild('venueprofileform') venueprofileform:NgForm;

  profileupdatesucess = false;
  editvenueprofile(){
    const pk = this.venueobject.id;
    const payload = {
      streetaddress1: this.venueprofileform.form.value.streetaddress1input,
      streetaddress2: this.venueprofileform.form.value.streetaddress2input,
      phonenumber: this.venueprofileform.form.value.phonenumberinput,
      city: this.venueprofileform.form.value.cityinput,
      state: this.venueprofileform.form.value.stateinput,
      zipcode: this.venueprofileform.form.value.zipinput,
      description: this.venueobject.description,
      name: this.venueobject.name,
      venuecontactname: this.venueobject.venuecontactname,
      venuecontactjobtitle: this.venueobject.venuecontactjobtitle,
      venuecontactemail: this.venueobject.venuecontactemail,
      searchcity: this.venueprofileform.form.value.selectcity,
      searchneighborhood: this.venueprofileform.form.value.searchneighborhood
    };
    this.parentadminservice.venueprofileupdate(payload, pk)
      .subscribe(
        (req:any)=>{
          this.venueobject = req;
          this.profileupdatesucess = true;
          this.volleyservice.sendobject(this.venueobject);
        });
  }

  // users code

  // delete user code
  deleteuserpklist =[];
  deleteUser(pk){
    let pkremoved = false;
    for(let userpk in this.deleteuserpklist){
      if(this.deleteuserpklist[userpk] === pk){
        this.deleteuserpklist.splice(+userpk,1);
        pkremoved = true;
      }
    }
    if(!pkremoved){
      this.deleteuserpklist.push(pk);
    }
  }

  commitdeleteuser(){
    for( let user of this.deleteuserpklist){
      const payload = {
        venueid: this.venueobject.id,
        usersfordeletion: user

      };
      this.userservice.deletevenueuser(payload)
        .subscribe(
          (req: any)=> {
            this.userservice.getvenueusers(this.venueobject.id)
              .subscribe(
                (req: any) => {
                  this.venueusers = req;
                  this.deleteuserpklist = [];
                  for (let user of this.venueusers) {
                    let contextpermission;
                    for (let set of user.venuepermissions_set) {
                      if (set.venue.id === this.venueobject.id) {
                        contextpermission = set;
                        user.venuepermissions_set = contextpermission;
                      }
                    }
                  }
                });
          },
          (error)=>{
            console.log(error);

          });

    }
  }

  // search city change code
  changesearchcity(){
    const pk = this.venueprofileform.form.value.selectcity;
    this.neighborhooddependancy.getneighborhoodsbycity(pk)
      .subscribe(
        (req: any) => {
          this.searchneighborhoodlist = req.neighborhoods;
        }
      );

  }
  wronguseofform = false;
  useralreadyonvenue = false;
  useralreadyexists = false;
  //create new user delete user code
  createdeleteuseractive = false;
  activatecreatedeleteuser(){
    this.createdeleteuseractive = true;
  }
  deactivatecreatedeleteuser(){
    this.createdeleteuseractive = false;
    this.deleteuserpklist = [];
  }

  newusercreate = true;
  existingbutton = true;
  newbutton = true;
  showcancel = false;
  showform = false;
  createnewuser(){
    this.newusercreate = true;
    this.existingbutton = false;
    this.newbutton = false;
    this.showform = true;
    this.showcancel = true;
  }

  addexistinguser(){
    this.newusercreate = false;
    this.newbutton = false;
    this.existingbutton = false;
    this.showform = true;
    this.showcancel = true;
  }

  cancelbutton(){
    this.showform = false;
    this.newbutton = true;
    this.existingbutton = true;
    this.showcancel = false;
  }


  // create new user code
  @ViewChild('addnewuserform') addnewuserform:NgForm;
  addnewuser(){
    let payload;
    if(this.newusercreate){
      payload = {
        venuepk: this.venueobject.id,
        email: this.addnewuserform.form.value.newuseremailinput,
        name: this.addnewuserform.form.value.newusernameinput,
        jobtitle: this.addnewuserform.form.value.newuserjobtitle,
        phone: this.addnewuserform.form.value.newuserphoneinput,
        permission: this.addnewuserform.form.value.newuserroleselect,
        rfpemail: this.addnewuserform.form.value.rfpreceiveemail,
        isvenueuser: true
      };
      if(payload.rfpemail != true){
        payload.rfpemail = false;
      }
    }
    if(!this.newusercreate){
      payload = {
        venuepk: this.venueobject.id,
        email: this.addnewuserform.form.value.newuseremailinput,
        permission: this.addnewuserform.form.value.newuserroleselect,
        rfpemail: this.addnewuserform.form.value.rfpreceiveemail,
      };
      if(payload.rfpemail != true){
        payload.rfpemail = false;
      }
    }
    this.userservice.createvenueuser(payload)
      .subscribe(
        (req: any)=>{
          let contextpermission;
          this.addnewuserform.reset();
          for(let set of req.venuepermissions_set){
            if(set.venue.id === this.venueobject.id){
              contextpermission = set;
              req.venuepermissions_set = contextpermission;
            }
          }
          this.venueusers.push(req);
          this.cancelbutton();
        },
        error=>{
          if(error.status === 403){
            this.addnewuserform.reset();
            this.cancelbutton();
            this.useralreadyexists = true;
            setTimeout(()=> {
              this.useralreadyexists = false;
            }, 5000);
          }
          if(error.status === 400){
            this.addnewuserform.reset();
            this.cancelbutton();
            this.useralreadyonvenue = true;
            setTimeout(()=> {
              this.useralreadyonvenue = false;
            }, 5000);

          }
          if(error.status === 406){
            this.addnewuserform.reset();
            this.cancelbutton();
            this.wronguseofform = true;
            setTimeout(()=> {
              this.wronguseofform = false;
            }, 5000);

          }
        }
      );

  }

  changerfpemail(index){
    const userpk = this.venueusers[index].id;
    const venuepk = this.venueobject.id;
    this.userservice.updatevenueuser(venuepk, userpk)
      .subscribe(
        (req: any)=>{
          this.volleyservice.sendupdated();
        }
      );

  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.inceptionservice.sendsignal('venuepage');
    this.parentadminservicevar = this.parentadminservice.receivepermission()
      .subscribe(
        (req: any) => {
          if (req !== null) {
            this.permission = req;
            if (this.permission === 'suits') {
              this.suitspermission = true;
              this.venuepermission = false;
            }
            if (this.permission === 'venue') {
              this.venuepermission = true;
              this.suitspermission = false;
            }
          }
        }
      );

    this.venuevolleyservicevar = this.volleyservice.receiveobject()
      .subscribe(
        (req: any) => {
          if (req !== null) {
            this.venueobject = req;
            this.citydependancy.getallcityobjects()
              .subscribe(
                (req: any) => {
                  this.searchcitylist = req.cities;
                  this.neighborhooddependancy.getneighborhoodsbycity(this.venueobject.searchcity)
                    .subscribe(
                      (req: any) => {
                        this.searchneighborhoodlist = req.neighborhoods;
                      }
                    );
                });
            this.userservice.getvenueusers(this.venueobject.id)
              .subscribe(
                (req: any) => {
                  this.venueusers = req;
                  console.log('this is the venueusers');
                  console.log(this.venueusers);
                  for (let user of this.venueusers) {
                    let contextpermission;
                    for (let set of user.venuepermissions_set) {
                      if (set.venue.id === this.venueobject.id) {
                        contextpermission = set;
                        user.venuepermissions_set = contextpermission;
                      }
                    }
                  }
                }
              );
          }
        });
  }

  ngOnDestroy(){
    this.venuevolleyservicevar.unsubscribe();
    this.parentadminservicevar.unsubscribe();
  }

}

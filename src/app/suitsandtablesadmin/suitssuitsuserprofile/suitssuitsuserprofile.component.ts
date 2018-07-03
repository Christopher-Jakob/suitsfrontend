import {Component, OnInit, ViewChild} from '@angular/core';
import {maximagesize} from "../../constants/constants";
import {VenueAdminProfileService} from "../../services/venueadmin/venueadminprofileservice/venueadmin.profile.service";
import {SuitsAdminSuitsUserProfileService} from "../../services/suitsadmin/suitsadminsuitsuserprofileservice/suitsadmin.suitsuserprofile.service";
import {NgForm} from "@angular/forms";
import {SuitsAdminSuitsusersDependancyService} from "../../services/pagedependancy/suitsadmin/suitsuserprofile/suitsadmin.suitsuserprofile.dependancy.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AwsService} from "../../services/amazonwebservice services/aws.services";
import {VenueUserService} from "../../services/userservice/venueuserservice/venueuserservice";
import {VenueUserProfileService} from "../../services/venueadmin/venueuserprofile/venueadmin.venueuserprofile.service";
import {VenueAdminParentAdminService} from "../../services/venueadmin/venueadminparentadminservice/venueadmin.parentadmin.service";

@Component({
  selector: 'app-suitssuitsuserprofile',
  templateUrl: './suitssuitsuserprofile.component.html',
  styleUrls: ['./suitssuitsuserprofile.component.scss'],
  providers: [VenueUserProfileService, VenueAdminProfileService, VenueUserService, AwsService]
})
export class SuitssuitsuserprofileComponent implements OnInit {

  constructor(private userprofileservice: VenueUserProfileService, private profileservice: VenueAdminProfileService, private route: ActivatedRoute, private parentvenueadminservice: VenueAdminParentAdminService, private router: Router,private userservice: VenueUserService, private awsservice: AwsService ) { }

  userobject = {
    pk: 1,
    name: 'Christopher Jakob',
    email: 'Christopher.m.jakob@gmail.com',
    phone: '3125223599',
    issuitsadministrator: false,
    issuitssuperuser: false,
    issuitsviewer: false,
    userphoto: null,
    role: 'System Architect',
    image: 'https://www.careerpoint.co.ke/wp-content/uploads/2016/03/Administrator-900x599.png'
  };



  // profile image code

  uploadphotoformshow = false;
  showuploadphotoform(){
    this.uploadphotoformshow = true;
  }

  unshowuploadphotoform(){
    this.uploadphotoformshow = false;
  }

  uploadphoto(event){
    let submittedimage = event.target.files;
    this.userservice.photoinit(this.userobject.pk)
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
                const payload ={
                  name: this.userobject.name,
                  email: this.userobject.email,
                  userphoto: uriroot + databasekey,
                  userphotokey: databasekey
                };
                this.userservice.edituser(payload, this.userobject.pk)
                  .subscribe(
                    (req: any)=> {
                      this.userobject = req;
                      this.unshowuploadphotoform();
                    });
              });
        });

  }


  // edit profile information code
  editprofileshow = false;

  showeditprofile(){
    this.editprofileshow = true;
    this.passwordchangeshow = false;
  }

  unshoweditprofile(){
    this.editprofileshow = false;
  }

  currentpermission;
  @ViewChild('editprofileinformationform') editprofileinformationform: NgForm;
  editprofileinformation(){
    const payload = {
      pk: this.userobject.pk,
      name: this.editprofileinformationform.form.value.profilenameinput,
      jobtitle: this.editprofileinformationform.form.value.profileroleinput,
      permission: this.editprofileinformationform.form.value.profilepermissionselect,
      email: this.editprofileinformationform.form.value.profileemailinput,
      phone: this.editprofileinformationform.form.value.profilephoneinput
    };
    this.userservice.edituser(payload, this.userobject.pk)
      .subscribe(
        (req: any)=> {
          this.userobject = req;
          this.unshoweditprofile();
        }
      );

  }

  // change password code
  passwordchangeshow = false;

  showpasswordchange(){
    this.passwordchangeshow = true;
    this.editprofileshow = false;
  }

  unshowpasswordchange(){
    this.passwordchangeshow = false;
  }

  nopasswordmatch = false;
  newpasswordmatch(){
    const password1 = this.changepasswordform.form.value.newpassword1input;
    const password2 = this.changepasswordform.form.value.newpassword2input;
    if(password1 !== password2){
      this.nopasswordmatch = true;
    }
    else{
      this.nopasswordmatch = false;
    }
  }

  passwordchangesucess = false;
  passworderror = false;
  @ViewChild('changepasswordform') changepasswordform: NgForm;
  /*
   changepassword(){
   const payload ={
   pk: this.userobject.pk,
   currentpassword: this.changepasswordform.form.value.currentpasswordinput,
   newpassword1: this.changepasswordform.form.value.newpassword1input,
   newpassword2: this.changepasswordform.form.value.newpassword2input
   };
   this.userprofileservice.changepuserpassword(payload)
   .subscribe(
   (req: any)=>{
   if(req.status === 200){
   this.passwordchangesucess = true;
   }
   if(req.status === 400){
   this.passworderror = true;
   }
   }
   );
   }
   */

  // determine user privilages code
  userisself = true;
  issuperuser = true;


  ngOnInit() {
    this.route.params
      .subscribe(
        (params:Params)=>{
          const userid = params['pk'];
          this.userservice.getuser(userid)
            .subscribe(
              (req: any)=>{
                this.userobject = req;
                console.log(this.userobject);
                if(this.userobject.issuitsadministrator){
                  this.currentpermission = 'admin';
                }
                if(this.userobject.issuitssuperuser) {
                  this.currentpermission = 'superuser';
                }

                if(this.userobject.issuitsviewer){
                  this.currentpermission = 'viewer';

                }


              }
            );
        }
      );
  }


}

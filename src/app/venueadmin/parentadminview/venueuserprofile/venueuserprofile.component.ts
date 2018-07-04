import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {VenueUserProfileService} from "../../../services/venueadmin/venueuserprofile/venueadmin.venueuserprofile.service";
import {maximagesize} from "../../../constants/constants";
import {VenueAdminProfileService} from "../../../services/venueadmin/venueadminprofileservice/venueadmin.profile.service";
import {VenueAdminParentAdminService} from "../../../services/venueadmin/venueadminparentadminservice/venueadmin.parentadmin.service";
import {VenueUserService} from "../../../services/userservice/venueuserservice/venueuserservice";
import {AwsService} from "../../../services/amazonwebservice services/aws.services";
import {UserAuthorizationService} from "../../../services/userservice/userauthorizationservice/userauthorizationservice";

@Component({
  selector: 'app-venueuserprofile',
  templateUrl: './venueuserprofile.component.html',
  styleUrls: ['./venueuserprofile.component.scss'],
  providers:[VenueUserProfileService, VenueAdminProfileService, VenueUserService, AwsService]
})
export class VenueuserprofileComponent implements OnInit {
  parentvenueadminservicevar;
  permission;
  venueadminpermission = false;
  suitsadminpermission = false;
  namelinkready;
  venuepk;

  constructor(private userprofileservice: VenueUserProfileService, private profileservice: VenueAdminProfileService, private route: ActivatedRoute, private parentvenueadminservice: VenueAdminParentAdminService, private router: Router, private userservice: VenueUserService, private awsservice: AwsService, private userauthservice: UserAuthorizationService ) { }

  userobject = {
    pk: 3,
    name: 'Christopher Jakob',
    email: 'Christopher.m.Jakob@gmail.com',
    phone: '3125223599',
    userphoto: 'https://exquisiteemmalisa.files.wordpress.com/2015/10/classic-lady.jpg?w=300&h=188',
  };

  // add edit profile photo

  uploadphotoform = false;
  showuploadphotoform(){
    this.uploadphotoform = true;
  }

  unshowuploadphotoform(){
    this.uploadphotoform = false;
  }

  uploadphoto(event){
    let submittedimage = event.target.files;
    this.userservice.photoinit(this.userobject.pk)
      .subscribe(
        (req: any)=>{
          console.log('the user service did it');
          const databasekey = req.fields.key;
          const uriroot = req.uriroot;
          let fd = new FormData();
          fd.append('acl', req.fields.acl);
          fd.append('key', req.fields.key);
          fd.append('content-type', req.fields['content-type']);
          fd.append('Policy', req.fields.policy);
          fd.append('x-amz-algorithm', req.fields['x-amz-algorithm']);
          fd.append('x-amz-credential', req.fields['x-amz-credential']);
          fd.append('x-amz-date', req.fields['x-amz-date']);
          fd.append('x-amz-signature', req.fields['x-amz-signature']);
          fd.append('file', submittedimage);
          this.awsservice.uploadtos3(req.url, fd)
            .subscribe(
              (req: any)=>{
                console.log('the aws upload did it');
                const payload ={
                  name: this.userobject.name,
                  email: this.userobject.email,
                  userphoto: uriroot + databasekey,
                  userphotokey: databasekey
                };
                this.userservice.edituser(payload, this.userobject.pk)
                  .subscribe(
                    (req: any)=> {
                      console.log('the user got updated and did it');
                      this.userobject = req;
                      this.unshowuploadphotoform();
                    });
              });
        });

  }

  // edit  personal information
  editform = false;
  showeditform(){
    this.editform = true;
  }

  unshoweditform(){
    this.editform = false;
  }

  @ViewChild('personalinfoform') personalinfoform:NgForm;
  editpersonalinfo(){
    const payload={
      pk: this.userobject.pk,
      name: this.personalinfoform.form.value.nameinput,
      email: this.personalinfoform.form.value.emailinput,
      phone: this.personalinfoform.form.value.phoneinput
    };
    this.userservice.edituser(payload, this.userobject.pk)
      .subscribe(
        (req: any)=> {
          this.userobject = req;
          this.unshoweditform();
        }
      );
  }

  // password code
  passwordupdatesucess = false;
  passwordincorrect = false;
  passwordform = false;
  showpasswordform(){
    this.passwordform = true;
  }
  unshowpasswordform(){
    this.passwordform = false;
    this.editform = false;
  }

  passwordsmatch = true;
  checkpassword(){
    const password = this.passwordinputform.form.value.newpassword1;
    const password2 = this.passwordinputform.form.value.newpassword2;
    if(password !== password2){
      this.passwordsmatch = false;
    }else{
      this.passwordsmatch = true;
    }
  }

  @ViewChild('passwordinputform') passwordinputform: NgForm;
  savepassword(){
    const payload ={
      password: this.passwordinputform.form.value.newpassword1
    };
    this.userservice.changepassword(this.userobject.pk, payload)
      .subscribe(
        (req: any)=>{
          this.passwordupdatesucess = true;
          this.passwordform = false;
          setTimeout(()=>{
            this.passwordupdatesucess = false;
            this.editform = false;
          }, 2500);
        }
      );

  }

  userisself = false;
  userauthservicevar;
  authuserobject;
  ngOnInit() {
    this.route.params
      .subscribe(
        (params:Params)=>{
          const userid = params['pk'];
          console.log('this is the gotten param');
          console.log(userid);
          this.userservice.getuser(userid)
            .subscribe(
              (req: any)=> {
                this.userobject = req;
                console.log(this.userobject);
                this.parentvenueadminservicevar = this.parentvenueadminservice.receivepermission()
                  .subscribe(
                    (req:any)=>{
                      if(req !==null){
                        this.permission = req;
                        if(req === 'venue'){
                          this.venueadminpermission = true;
                          this.suitsadminpermission = false;
                          this.userauthservicevar = this.userauthservice.receiveuser()
                            .subscribe(
                              (req: any)=>{
                                if(req != null){
                                  this.authuserobject = req;
                                  if(this.authuserobject.pk == userid){
                                    this.userisself = true;
                                  }
                                }
                              }
                            );

                        }
                        if(req === 'suits'){
                          this.venueadminpermission = false;
                          this.suitsadminpermission = true;
                        }
                      }
                    });
              });
        });


  }

}

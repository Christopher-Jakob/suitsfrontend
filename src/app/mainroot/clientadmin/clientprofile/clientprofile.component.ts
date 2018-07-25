import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ClientUserService} from "../../../services/userservice/clientuserservice/clientuserservice";
import {AwsService} from "../../../services/amazonwebservice services/aws.services";

@Component({
  selector: 'app-clientprofile',
  templateUrl: './clientprofile.component.html',
  styleUrls: ['./clientprofile.component.scss'],
  providers: [ClientUserService]
})
export class ClientprofileComponent implements OnInit, OnDestroy {

  constructor(private clientservice: ClientUserService,
              private router: Router, private route: ActivatedRoute, private awsservice: AwsService) { }
  suitsdeleted = false;
  permission = 'client';
  suitpermission = true;
  clientpermission = true;
  clientobjectservicevar;
  clientpermissionservicevar;

  clientobject = {
    pk: 251,
    name: 'Christopher',
    companyname: 'That one place',
    jobtitle: 'Dreamer',
    email: 'christopher.m.jakob@gmail.com',
    phone: '630-618-0712',
    photo: 'https://vignette.wikia.nocookie.net/thebiglebowski/images/7/7e/The_Dude.jpeg/revision/latest?cb=20111216183045',
  };

  // edit form code

  editprofileshow = false;
  showeditprofile(){
    this.editprofileshow = true;
  }

  unshoweditprofile(){
    this.editprofileshow = false;
  }

  @ViewChild('updateprofileform') updateprofileform:NgForm;
  updateprofile(){
    const payload = {
      name: this.updateprofileform.form.value.clientnameinput,
      companyname: this.updateprofileform.form.value.companynameinput,
      jobtitle: this.updateprofileform.form.value.jobtitleinput,
      email: this.updateprofileform.form.value.emailinput,
      phone: this.updateprofileform.form.value.phoneinput
    };
    this.clientservice.updateclientuser(this.clientobject.pk, payload)
      .subscribe(
        (req: any)=>{
          // since the whole object is being returned
          this.clientobject = req.body;
          this.clientservice.sendclientobject(this.clientobject)

        }
      );
  }

  // edit and add profile photo
  changephotoout = false;
  showprofilephotoform(){
    this.changephotoout = true;
  }

  unshowprofilephotoform(){
    this.changephotoout = false;
  }

  uploadphoto(event){
    let uploadedphoto = event.target.files[0];
    this.clientservice.clientphotoinit(this.clientobject.pk)
      .subscribe(
        (req: any)=>{
          let url = req.url;
          let fields = req.fields;
          let uriroot = req.uriroot;
          let photourl = uriroot + fields.key;
          let fd = new FormData();
          fd.append('acl', fields.acl);
          fd.append('key', fields.key);
          fd.append('content-type', fields['content-type']);
          fd.append('policy', fields.policy);
          fd.append('x-amz-algorithm', fields['x-amz-algorithm']);
          fd.append('x-amz-credential', fields['x-amz-credential']);
          fd.append('x-amz-date', fields['x-amz-date']);
          fd.append('x-amz-signature', fields['x-amz-signature']);
          fd.append('file', uploadedphoto);
          let payload = {

          };
          this.awsservice.uploadtos3(req.url, fd)
            .subscribe(
              (req: any)=>{
                this.clientservice.updateclientuser(this.clientobject.pk, payload)
                  .subscribe(
                    (req: any)=>{

                    }
                  );
              }
            );


        }
      );

  }

  //delete profile code
  deleteconfrim = false;

  showdeleteconfrim(){
    this.deleteconfrim = true;
  }

  unshowdeleteconfrim(){
    this.deleteconfrim = false;
  }

  profiledelete(){
    const pk = this.clientobject.pk;
    this.clientservice.deleteprofile(pk)
      .subscribe(
        (req: any)=>{
          if(req.status === 200){
            if(this.permission === 'client'){
              this.router.navigate(['/client-profile-deleted']);
            }
            if(this.permission === 'suits'){
              this.suitsdeleted = true;

            }

          }

        }
      );
  }

  // suits admin profile delete code
  navigatetosuitsclientusers(){
    this.router.navigate(['/suitsadmin','client-users']);
  }

  navigatetosuitsadminhome(){
    this.router.navigate(['/suitsadmin']);
  }

  // change password code
  passwordchangesucess = false;
  passwordchangefail = false;

  passwordform = false;
  showpasswordform(){
    this.passwordform = true;
    this.editprofileshow = false;
  }

  unshowpasswordform(){
    this.passwordform = false;
    this.editprofileshow = false;
  }

  @ViewChild('editpasswordform') editpasswordform: NgForm;
  editpassword(){
    const payload = {
      currentpassword: this.editpasswordform.form.value.currentpasswordinput,
      password1: this.editpasswordform.form.value.newpassword1,
      password2: this.editpasswordform.form.value.newpassword2
    };
    this.clientservice.editpassword(this.clientobject.pk, payload)
      .subscribe(
        (req: any)=>{
          if(req.status === 200){
            this.passwordchangesucess = true;
          }
          if(req.status === 400){
            this.passwordchangefail = true;
          }
        }
      );
  }

  passwordchangesucessoff(){
    this.passwordchangesucess = false;
  }

  passwordchangefailoff(){
    this.passwordchangefail = false;
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this. clientpermissionservicevar = this.clientservice.receiveclientpermission()
      .subscribe(
        (req: any)=>{
          console.log(req + 'this is the pure form');
          this.permission = req;
          if(req !== null){
            console.log('this is the permission ' + this.permission);
            if(this.permission === 'suits'){
              this.suitpermission = true;
              this.clientpermission = false;
            }
            if(this.permission === 'client'){
              this.suitpermission = false;
              this.clientpermission = true;
            }
          }
        }
      );
     this.clientobjectservicevar = this.clientservice.receiveclientobject()
     .subscribe(
     (req: any)=>{
     this.clientobject = req;
     console.log(this.clientobject);
     });


  }

  ngOnDestroy(){
    this.clientobjectservicevar.unsubscribe();
    this.clientpermissionservicevar.unsubscribe();
  }

}

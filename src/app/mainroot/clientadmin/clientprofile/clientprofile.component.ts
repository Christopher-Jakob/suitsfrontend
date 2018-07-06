import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {acceptedimagetypes} from "../../../constants/constants";
import {MainRootClientDashboardService} from "../../../services/mainroot/clientdashboard/mainroot.clientdashboard.service";
import {Router} from "@angular/router";
import {MainrootClientProfileService} from "../../../services/mainroot/mainrootclientprofile/mainroot.clientprofile.service";

@Component({
  selector: 'app-clientprofile',
  templateUrl: './clientprofile.component.html',
  styleUrls: ['./clientprofile.component.scss']
})
export class ClientprofileComponent implements OnInit, OnDestroy {

  constructor(private dashboardservice:  MainRootClientDashboardService, private clientservice: MainrootClientProfileService, private router: Router) { }
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
    this.dashboardservice.updateprofile(payload)
      .subscribe(
        (req: any)=>{
          // since the whole object is being returned
          this.clientobject = req.body;
          this.dashboardservice.sendclientobject(this.clientobject);
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
    let uploadedphotos = event.target.files;
    for(let photo in uploadedphotos){
      let remove = false;
      for(let image of acceptedimagetypes){
        if(uploadedphotos[+photo].type === image){
          remove = false;
          break;
        }
      }
      if(!remove){
        uploadedphotos.splice(+photo,1);
      }
    }
    const payload = {
      pk: this.clientobject.pk,
      images: uploadedphotos
    };

    this.dashboardservice.uploadimage(payload)
      .subscribe(
        (req: any)=>{
          this.clientobject.photo = req.body;
          this.dashboardservice.sendclientobject(this.clientobject);
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
    this.dashboardservice.deleteprofile(pk)
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
    this.clientservice.editpassword(payload)
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
    this. clientpermissionservicevar = this.dashboardservice.receiveclientpermission()
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

    /*
     this.clientobjectservicevar = this.dashboardservice.receiveclientobject()
     .subscribe(
     (req: any)=>{
     this.clientobject = req.body;
     }
     );
     */

  }

  ngOnDestroy(){
    // this.clientobjectservicevar.unsubscribe();
    // this.clientpermissionservicevar.unsubscribe();
  }

}

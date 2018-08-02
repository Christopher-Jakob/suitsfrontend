import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SuitsAdminSuitsUsersDependancyService} from "../../services/pagedependancy/suitsadmin/suitsusers/suitsadmin.suitsusers.dependancy.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {SuitsUserService} from "../../services/userservice/suitsuserservice/suitsuserservice";

@Component({
  selector: 'app-suitssuitstablesusers',
  templateUrl: './suitssuitstablesusers.component.html',
  styleUrls: ['./suitssuitstablesusers.component.scss'],
  providers: [SuitsAdminSuitsUsersDependancyService, SuitsUserService]
})
export class SuitssuitstablesusersComponent implements OnInit, OnDestroy {

  constructor(private dependancyservice: SuitsAdminSuitsUsersDependancyService, private router: Router, private route: ActivatedRoute, private suitsuserservice: SuitsUserService) { }

  choicesload = true;
  dependancyservicevar;
  showcreateuser = false;
  errormessage;

  createusertoggle(){
    this.showcreateuser = !this.showcreateuser;
  }

  deleteconfrim = false;
  deleteindex = null;
  deleteconfrimtoggle(index){
    this.deleteconfrim = !this.deleteconfrim;
    if(this.deleteconfrim){
      this.deleteindex = index;
    }
    if(!this.deleteconfrim){
      this.deleteindex = null;
    }
  }

  deleteuser(index){
    let user = this.suitsusers[index];
    this.suitsuserservice.deletesuitsuser(user.pk)
      .subscribe(
        (req: any)=>{
          this.suitsusers.splice(+index,1);
          this.deleteindex = null;
        }
      );
  }

  @ViewChild('createsuitsuserform')createsuitsuserform: NgForm;
  createsuitsuser(){
    const payload = {
      email: this.createsuitsuserform.form.value.email,
      name: this.createsuitsuserform.form.value.name,
      phone: this.createsuitsuserform.form.value.phone,
      jobtitle: this.createsuitsuserform.form.value.role,
      permission: this.createsuitsuserform.form.value.permission
    };
    this.suitsuserservice.createsuitsuser(payload)
      .subscribe(
        (req: any)=>{
          console.log(req);

          this.createusertoggle();
          this.suitsusers.push(req);
        },
        (error)=>{
          this.errormessage = error.email;
        }
      );

  }



  suitsusers=[
    {
      pk: 1,
      name: 'Christopher Jakob',
      role: 'System Architect ',
      permissions: 'Super User'
    },
  ];

  // navigate to profile code
  navigatetoprofile(index){
    this.router.navigate([this.suitsusers[index].pk], {relativeTo: this.route});
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.suitsuserservice.suitsuserlist()
      .subscribe(
        (req: any)=>{
          this.choicesload =false;
          this.suitsusers = req;
        }
      );

  }

  ngOnDestroy(){

  }

}

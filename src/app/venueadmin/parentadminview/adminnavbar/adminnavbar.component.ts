import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserAuthorizationService} from "../../../services/userservice/userauthorizationservice/userauthorizationservice";

@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.scss']
})
export class AdminnavbarComponent implements OnInit, OnDestroy {

  constructor(private userservice: UserAuthorizationService) { }
  usersubscriptionservicevar;
  user = {
    name: null
  };

  confrimlogout = false;
  logoutconfrim(){
    this.confrimlogout = !this.confrimlogout;
  }
  logout(){
    this.userservice.logout();

  }

  ngOnInit() {
    this.usersubscriptionservicevar = this.userservice.receiveuser()
      .subscribe(
        (req: any)=>{
          this.user = req;
        }
      );
  }

  ngOnDestroy(){
    this.usersubscriptionservicevar.unsubscribe();
  }

}

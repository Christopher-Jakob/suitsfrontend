import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserAuthorizationService} from "../../services/userservice/userauthorizationservice/userauthorizationservice";
import {Router} from "@angular/router";

@Component({
  selector: 'app-suitsnavbar',
  templateUrl: './suitsnavbar.component.html',
  styleUrls: ['./suitsnavbar.component.scss']
})
export class SuitsnavbarComponent implements OnInit, OnDestroy {

  constructor(private userservice: UserAuthorizationService, private router: Router) { }
  usersubscriptionvar;
  user = {
    name: null
  };

  confrimlogout = false;
  logoutconfrim(){
    this.confrimlogout = !this.confrimlogout;
  }

  logout(){
    this.userservice.logout();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.usersubscriptionvar = this.userservice.receiveuser()
      .subscribe(
        (req: any)=>{
          this.user = req;
        }
      );

  }

  ngOnDestroy(){
    this.usersubscriptionvar.unsubscribe();
  }

}

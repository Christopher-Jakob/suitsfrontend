import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserAuthorizationService} from "../../services/userservice/userauthorizationservice/userauthorizationservice";

@Component({
  selector: 'app-suitsnavigation',
  templateUrl: './suitsnavigation.component.html',
  styleUrls: ['./suitsnavigation.component.scss']
})
export class SuitsnavigationComponent implements OnInit, OnDestroy {
  userservicesubscription;
  user = {
    issuitsviewer: false,
    issuitsadministrator: false,
    issuitssuperuser: false
  };

  constructor(private userservice: UserAuthorizationService) { }

  ngOnInit() {
    this.userservicesubscription = this.userservice.receiveuser()
      .subscribe(
        (req: any)=>{
          this.user = req;
        }
      );
  }

  ngOnDestroy(){
    this.userservicesubscription.unsubscribe();
  }

}

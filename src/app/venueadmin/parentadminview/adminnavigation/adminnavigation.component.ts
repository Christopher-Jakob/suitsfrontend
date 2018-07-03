import { Component, OnInit } from '@angular/core';
import {UserAuthorizationService} from "../../../services/userservice/userauthorizationservice/userauthorizationservice";

@Component({
  selector: 'app-adminnavigation',
  templateUrl: './adminnavigation.component.html',
  styleUrls: ['./adminnavigation.component.scss']
})
export class AdminnavigationComponent implements OnInit {

  constructor(private userservice: UserAuthorizationService) { }
  userservicesub;
  user;

  ngOnInit() {
    this.userservicesub = this.userservice.receiveuser()
      .subscribe(
        (req: any)=>{
          if(req != null){
            this.user = req;
          }
        }
      );

  }

}

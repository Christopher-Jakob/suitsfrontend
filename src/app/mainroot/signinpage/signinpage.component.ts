import { Component, OnInit } from '@angular/core';
import {UserAuthorizationService} from "../../services/userservice/userauthorizationservice/userauthorizationservice";
import {Router} from '@angular/router';

@Component({
  selector: 'app-signinpage',
  templateUrl: './signinpage.component.html',
  styleUrls: ['./signinpage.component.scss']
})
export class SigninpageComponent implements OnInit {

  constructor(private userservice:  UserAuthorizationService, private router: Router) {}
  usersubscription;

  ngOnInit() {
    this.usersubscription = this.userservice.receiveuser()
      .subscribe(
        (req: any)=>{
          if(req != null){
            if(req.id != null){
              this.router.navigate(['/']);
            }
          }
        }
      );

  }

}

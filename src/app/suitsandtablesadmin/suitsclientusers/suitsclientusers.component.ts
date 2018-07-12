import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ClientUserService} from "../../services/userservice/clientuserservice/clientuserservice";

@Component({
  selector: 'app-suitsclientusers',
  templateUrl: './suitsclientusers.component.html',
  styleUrls: ['./suitsclientusers.component.scss'],
  providers: [ClientUserService]
})
export class SuitsclientusersComponent implements OnInit {
  choicesload = true;
  permission = 'suits';

  constructor(private router: Router, private clientuser: ClientUserService) { }

  clientobjects = [
    {
      pk: 1,
      name: 'Christopher Jakob',
      companyname: 'Bmo Harris Bank',
      jobtitle: 'Cheif Person Officer',
      email: 'Christopher.m.Jakob@gmail.com',
      phone: '8478880148'
    },
    {
      pk: 2,
      name: 'David Hady',
      companyname: 'Charles Barkley',
      jobtitle: 'Guy with the Idea',
      email: '123@abc.com',
      phone: '4444444444'
    }
  ];

  navigatetoclientuser(index){
    this.router.navigate(['/dashboard',this.permission,this.clientobjects[index].pk,'profile']);
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.clientuser.clientuserlist()
      .subscribe(
        (req: any)=>{
          this.choicesload = false;
          this.clientobjects = req;
        }
      );

  }

}

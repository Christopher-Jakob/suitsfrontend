import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-suitsvenueonboarding',
  templateUrl: './suitsvenueonboarding.component.html',
  styleUrls: ['./suitsvenueonboarding.component.scss']
})
export class SuitsvenueonboardingComponent implements OnInit {

  constructor(private http: HttpClient) { }
  users = [{
    pk: null,
    name: null,
    onboardstring: null
  }];

  linkshow = null;
  showlink(index){
    this.linkshow = index;
  }
  cancel(){
    this.linkshow = null;
  }

  emailsent(index){
    const userpk = this.users[index].pk;
    this.http.get('https://api-suitsandtables3.herokuapp.com/api/user/venue/onboarding/' + String(userpk))
      .subscribe(
        (req: any)=>{
          this.users.splice(+index,1);
        }
      );
  }

  ngOnInit() {
    this.http.get('https://api-suitsandtables3.herokuapp.com/api/user/venue/onboarding')
      .subscribe(
        (req:any)=>{
          this.users = req;
        }
      ):
  }

}

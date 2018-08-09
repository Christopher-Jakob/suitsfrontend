import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  TeamList = [];
  constructor() { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.TeamList = [
      {
        selfie: "assets/images/team/bobby.jpg",
        name: "Bobby Corsentino",
        title:"Founder and CEO"
      },
      {
        selfie: "assets/images/team/kathy.jpg",
        name: "Kathy Pirogova",
        title:"Director of Venue Relations"
      },
      {
        selfie: "assets/images/team/christopher.jpg",
        name: "Christopher Jakob",
        title:"Lead Software Engineer"
      },

     ];
  }

}

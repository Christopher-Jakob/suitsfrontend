import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingvenue',
  templateUrl: './landingvenue.component.html',
  styleUrls: ['./landingvenue.component.scss']
})
export class LandingvenueComponent implements OnInit {

  constructor() { }

  width;
  height;

  setwidthzero() {

  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.width = window.screen.width;
    this.height =window.screen.height;
  }

}

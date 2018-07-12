import { Component, OnInit } from '@angular/core';
import {RFPService} from "../../../services/rfpservice/rfpservice";

@Component({
  selector: 'app-sentrfps',
  templateUrl: './sentrfps.component.html',
  styleUrls: ['./sentrfps.component.scss'],
  providers:[RFPService]
})
export class SentrfpsComponent implements OnInit {

  constructor(private rfpservice: RFPService) { }
  sentrfps = [];

  ngOnInit() {
    window.scrollTo(0,0);
    this.rfpservice.getsendtrfps()
      .subscribe(
        (req:any)=>{
          this.sentrfps = req;
        }
      );

  }

}

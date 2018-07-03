import { Component, OnInit } from '@angular/core';
import {VenueApplicationListDependancyService} from "../../services/pagedependancy/suitsadmin/venueapplicationlist/VenueApplicationListDependancyService";

@Component({
  selector: 'app-suitsnewvenueapplications',
  templateUrl: './suitsnewvenueapplications.component.html',
  styleUrls: ['./suitsnewvenueapplications.component.scss'],
  providers: [VenueApplicationListDependancyService]
})
export class SuitsnewvenueapplicationsComponent implements OnInit {

  constructor(private applicationlistservice: VenueApplicationListDependancyService ) { }

  choicesload = true;
  newvenueapplications= [];



  ngOnInit() {
    this.applicationlistservice.getvenueapplicationlist()
      .subscribe(
        (req: any)=>{
          this.choicesload = false;
          this.newvenueapplications = req;
          console.log(this.newvenueapplications);
        }
      );
  }

}

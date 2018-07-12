import { Component, OnInit } from '@angular/core';
import {DeclinedVenueApplication} from "../../services/pagedependancy/suitsadmin/declinedvenueapplication/declinedvenueapplication.dependancy.service";
import {DeclinedVenueService} from "../../services/suitsadmin/suitsdeclinedvenuesservice/suitsdeclinedvenue.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-suitsdeclinedapplications',
  templateUrl: './suitsdeclinedapplications.component.html',
  styleUrls: ['./suitsdeclinedapplications.component.scss'],
  providers: [DeclinedVenueApplication, DeclinedVenueService]
})
export class SuitsdeclinedapplicationsComponent implements OnInit {

  constructor(private dependancyservice: DeclinedVenueApplication, private declinevenueservice: DeclinedVenueService, private router: Router) { }

  choicesload =true;
  declinedvenues =[];

  activedeleteindex = null;
  activatedelete(index){
    this.activedeleteindex = index;
  }
  deactivatedelete(){
    this.activedeleteindex = null;
  }

  navigatetodetail(pk){
    this.router.navigate(['/suitsadmin','declined-venues',pk]);
  }

  deletedeclinedvenue(index){
    const pk = this.declinedvenues[index].id;
    this.declinevenueservice.deletedeclinedvenue(pk)
      .subscribe(
        (req: any)=>{
          this.declinedvenues.splice(+index,1);
          this.deactivatedelete();
        }
      );
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.dependancyservice.declinedvenueapplicationlist()
      .subscribe(
        (req: any)=>{
          this.choicesload = false;
          this.declinedvenues = req;
        }
      );

  }

}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {BrowsevenuescomponentcommService} from "../../../services/browsevenueservice/browsevenuescommservice/browsevenuescomponentcomm.service";
import {VenueService} from "../../../services/venueservice/venueservice";
import {Router} from "@angular/router";

@Component({
  selector: 'app-venuelist',
  templateUrl: './venuelist.component.html',
  styleUrls: ['./venuelist.component.scss']
})
export class VenuelistComponent implements OnInit, OnDestroy {
  // list of venues

  venuelist = [
    {
      name: null,
      venueimage_set: ['temp'],
      room_set: {
        semiprivate: 0,
        privateroom: 0
      }
    }
  ];

  slideshowparams = {
    height: '250px',
    showdots: true,
  };

  // observable variables
  browsevenuecomm;
  constructor(private browsevenuescommservice: BrowsevenuescomponentcommService, private venueservice: VenueService, private router: Router) { }


  navigatetovenue(index){
    let venuename = this.venuelist[index].name;
    venuename = venuename.replace(/ /g, '_');
    this.router.navigate(['/venue', venuename]);
  }

  ngOnInit() {
    this.browsevenuecomm = this.browsevenuescommservice.recevivevenuelist()
      .subscribe(
        (req: any)=> {
          if (req != null) {
            this.venuelist = req;
            console.log('the venue list arrving to the venues list');
            console.log(this.venuelist);
          }
        });


  }

  ngOnDestroy(){
    this.browsevenuecomm.unsubscribe();

  }

}

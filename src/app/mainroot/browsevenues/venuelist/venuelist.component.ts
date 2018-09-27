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

  userablelist= [
    {
      name: null,
      venueimage_set: [
        {
          imageurl: '',
          order: 1,
          thumbnail: ''
        },

      ],
      room_set: {
        semiprivate: 0,
        privateroom: 0
      }
    }
  ];

  venuelist = [
    {
      name: null,
      tour360url: null,
      venueimage_set: [
        {
          imageurl: '',
          order: 1,
          thumbnail: ''
        },

      ],
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
  stateservice;
  constructor(private browsevenuescommservice: BrowsevenuescomponentcommService, private venueservice: VenueService, private router: Router) { }


  navigatetovenue(index){
    let venuename = this.venuelist[index].name;
    venuename = venuename.replace(/ /g, '_');
    this.router.navigate(['/venue', venuename]);
  }

  choicesload= false;
  ngOnInit() {
    this.browsevenuecomm = this.browsevenuescommservice.recevivevenuelist()
      .subscribe(
        (req: any)=> {
          if (req != null) {
            this.venuelist = req;
            this.venuelist = this.venuelist.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));
            for(let venue in this.venuelist){
              let images = this.venuelist[venue].venueimage_set;
              images = images.sort((a, b) => ((a.order) < (b.order) ? -1 : ((a.order) > (b.order) ? 1 : 0)));
              for(let image in images){
                images[image] = images[image].thumbnail as any;
              }
              this.venuelist[venue].venueimage_set = images;
              console.log('this is the venueimage_set');
              console.log(this.venuelist[venue].venueimage_set);

            }
            console.log('this is the userablelist');
            console.log(this.venuelist);
            this.browsevenuescommservice.sendloadstate(false);
          }
        });
    this.stateservice = this.browsevenuescommservice.receviveloadstate()
      .subscribe(
        (req: any)=>{
          this.choicesload = req;
        }
      );



  }

  ngOnDestroy(){
    this.browsevenuecomm.unsubscribe();
    this.stateservice.unsubscribe();

  }

}

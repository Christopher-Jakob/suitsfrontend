import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {LandingpageDependancyService} from "../../services/mainroot/landingpage/LandingpageDependancyService";
import {BrowsevenuescomponentcommService} from "../../services/browsevenueservice/browsevenuescommservice/browsevenuescomponentcomm.service";



@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
  providers:[LandingpageDependancyService]
})
export class LandingpageComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private landingpageservice: LandingpageDependancyService, private navcomm : BrowsevenuescomponentcommService) { }

  isLeftVisible = true;
  choicesload = true;

  @ViewChild('selectform') selectform : NgForm;
  loaded = false;
  selectedcity;
  cities =[
    // {city: 'Chicago'},

  ];

  browse(){
    this.selectedcity = this.selectform.value.cityselect;
    this.navcomm.setselectedcity(this.selectedcity);
    let citypk = null;
    for(let city in this.cities){
      if(this.cities[city].city === this.selectedcity){
        citypk = this.cities[city].pk;
      }
    }
    this.navcomm.sendselectedcity(citypk);
    this.router.navigate(['/browse', this.selectedcity]);

  }



  ngOnInit() {
    window.scrollTo(0,0);
    this.navcomm.sendstate('unshow');
    this.landingpageservice.getsearchcitylist()
      .subscribe(
        (req: any)=>{
          this.cities = req;
          console.log(req);
          this.loaded = true;
          this.cities.sort((a, b) => ((a.city) < (b.city) ? -1 : ((a.city) > (b.city) ? 1 : 0)));
          this.choicesload = false;
        }
      );


  }

  ngOnDestroy(){


  }

}

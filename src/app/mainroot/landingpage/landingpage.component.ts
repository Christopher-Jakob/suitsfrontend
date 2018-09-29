import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {LandingpageDependancyService} from "../../services/mainroot/landingpage/LandingpageDependancyService";
import {BrowsevenuescomponentcommService} from "../../services/browsevenueservice/browsevenuescommservice/browsevenuescomponentcomm.service";
import {VenueService} from "../../services/venueservice/venueservice";



@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
  providers:[LandingpageDependancyService, VenueService]
})
export class LandingpageComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private landingpageservice: LandingpageDependancyService, private navcomm: BrowsevenuescomponentcommService, private venueservice: VenueService) { }

  isLeftVisible = true;
  choicesload = true;
  signupcompelete = false;

  @ViewChild('selectform') selectform : NgForm;
  @ViewChild('selectformlarge') selectformlarge : NgForm;
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

  browselarge(){
    this.selectedcity = this.selectformlarge.value.cityselect;
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

  createvenue(form:NgForm){
    let payload = {
      name: form.value.venuename,
      streetaddress1: form.value.streetaddress1,
      streetaddress2: form.value.streetaddress2,
      city: form.value.city,
      state: form.value.venuestateselect,
      venuephone: form.value.phone,
      venuecontactname: form.value.contactname,
      venuecontactjobtitle: form.value.jobtitle,
      venuecontactemail: form.value.email,
      phonenumber: form.value.phone
    };

    if(form.valid){
      this.venueservice.submitapplication(payload)
        .subscribe(
          (req: any)=>{
            this.signupcompelete = true;
          }
        );
    }
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

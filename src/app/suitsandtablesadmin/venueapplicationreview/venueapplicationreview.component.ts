import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {VenueApplicationService} from '../../services/suitsadmin/venueapplicationservice/venueapplication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {VenueapplicationDependancyService} from "../../services/pagedependancy/suitsadmin/venueapplication/venueapplication.dependancy.service";


@Component({
  selector: 'app-venueapplicationreview',
  templateUrl: './venueapplicationreview.component.html',
  styleUrls: ['./venueapplicationreview.component.scss'],
  providers:[VenueApplicationService,  VenueapplicationDependancyService ]
})
export class VenueapplicationreviewComponent implements OnInit{

  constructor(private venueapplicationservice: VenueApplicationService, private venueapplicationdependancyservice:  VenueapplicationDependancyService, private router: Router, private route: ActivatedRoute) { }

  // if page navigated to from create venue code
  createvenue = false;

  // venueapplicationobject

  venueapplicationobject ={
    name: '',
    streetaddress1: '',
    streetaddress2: '',
    city: '',
    state: '',
    zipcode: '',
    phonenumber: '',
    venuecontactname: '',
    venuecontactjobtitle: '',
    venuecontactemail: '',
    isexperiential: '',
    isrestaurant: '',
    experientialtype: '',
    cuisine1: '',
    cuisine2: '',
    eventplannerstaff: false

  };

  // get search cities and neighborhoods
  @ViewChild('stinputsform') stinputsform : NgForm;
  @ViewChild('venueinputedform') venueinputedform :NgForm;

  searchcities =[];
  searchneighborhoods=[];

  populateneighborhoodlist(){
    if(this.receivedlongnitude === null){
      this.getcoordinates();
    }
    const citypk = this.stinputsform.form.value.searchcityselect;
    for( const city of this.searchcities){
      if(city.pk === +citypk){
        this.venueapplicationdependancyservice.getneighborhoodsbycities(citypk)
          .subscribe(
            (req: any)=>{
              this.searchneighborhoods = req.neighborhoods;
            }
          );
      }
    }

  }

  // get coordinates code
  // error message for coordinates
  receivedlongnitude = null;
  receivedlatitude = null;
  coordinatesfail = false;

  getcoordinates(){
    const address={
      street: this.venueinputedform.form.value.streetaddress1input,
      city: this.venueinputedform.form.value.cityinput,
      state: this.venueinputedform.form.value.stateinput,
    };
    if(address.street !== ''){
      if(address.city !== ''){
        if(address.state !== ''){
          this.venueapplicationservice.getvenuecoordinates(address)
            .subscribe(
              (req: any)=>{
                this.coordinatesfail = false;
                this.receivedlongnitude = req.lng;
                this.receivedlatitude = req.lat;
              },
              error =>{
                this.coordinatesfail = true;
              });
        }
      }
    }
  }

  // add venue code
  addsucess = false;

  showexperientialtypeselect = false;
  showcuisinetypeselect = false;

  addvenue() {
    let venueapplicationsubmission = {
      pk: +this.venueapplicationpk,
      name: this.venueinputedform.form.value.venuenameinput,
      streetaddress1: this.venueinputedform.form.value.streetaddress1input,
      streetaddress2: this.venueinputedform.form.value.streetaddress2input,
      approved: true,
      city: this.venueinputedform.form.value.cityinput,
      state: this.venueinputedform.form.value.stateinput,
      zipcode: this.venueinputedform.form.value.zipcodeinput,
      phonenumber: this.venueinputedform.form.value.phonenumberinput,
      venuecontactname: this.venueinputedform.form.value.contactnameinput,
      venuecontactjobtitle: this.venueinputedform.form.value.titleinput,
      venuecontactemail: this.venueinputedform.form.value.emailinput,
      isexperiential: false,
      isrestaurant: false,
      experientialtype: this.venueinputedform.form.value.experientialtypeselect,
      cuisine1 : this.venueinputedform.form.value.cuisine1select,
      cuisine2: this.venueinputedform.form.value.cuisine2select,
      website: this.stinputsform.form.value.websiteinput,
      googlerating: this.stinputsform.form.value.googleratinginput,
      yelprating: this.stinputsform.form.value.yelpratinginput,
      searchcity: this.stinputsform.form.value.searchcityselect,
      searchneighborhood: this.stinputsform.form.value.searchneighborhoodselect,
      longitude: this.receivedlongnitude,
      latitude: this.receivedlatitude,
    };
    if(this.venueinputedform.form.value.experientialvenuecheckbox === true){
      venueapplicationsubmission.isexperiential = true;
    }
    if(this.venueinputedform.form.value.restaurantvenuecheckbox === true){
      venueapplicationsubmission.isrestaurant = true;
    }
    if (venueapplicationsubmission.longitude !== this.coordinatesfail || venueapplicationsubmission.longitude !== ''){
      if(this.createvenue){
        this.venueapplicationservice.createvenue(venueapplicationsubmission)
          .subscribe(
            (req: any) => {
              this.addsucess = true;
            });
      }
      if(!this.createvenue){
        this.venueapplicationservice.approvevenueappliction(venueapplicationsubmission, this.venueapplicationpk)
          .subscribe(
            (req: any)=>{
              this.addsucess = true;
            });
      }
    }
  }

  navigatetovenuelist(){
    this.addsucess = false;
    this.router.navigate(['/suitsadmin', 'venues']);
  }

  returntovenueapplications(){
    this.addsucess = false;
    this.router.navigate(['/suitsadmin']);
  }

  navigatetodeclinedvenueslist(){
    this.addsucess = false;
    this.router.navigate(['/suitsadmin', 'declined-venues']);
  }

  // decline venue code
  @ViewChild('declinevenueform') declinevenueform : NgForm;
  displaydeclinemodal = false;
  declinesucess = false;


  activatedeclinemodal(){
    this.displaydeclinemodal = true;
  }

  deactivatedeclinedmodal(){
    this.displaydeclinemodal = false;
  }

  declinevenue(){
    const payload={
      city: this.venueinputedform.form.value.cityinput,
      name: this.venueinputedform.form.value.venuenameinput,
      streetaddress1: this.venueinputedform.form.value.streetaddress1input,
      state: this.venueinputedform.form.value.stateinput,
      venuecontactemail: this.venueinputedform.form.value.emailinput,
      venuecontactname: this.venueinputedform.form.value.contactnameinput,
      zipcode: this.venueinputedform.form.value.zipcodeinput,
      phonenumber: this.venueinputedform.form.value.phonenumberinput,
      declined: true,
      declinereason: this.declinevenueform.form.value.declinechoice,
      declinetext: this.declinevenueform.form.value.declinetext
    };
    this.venueapplicationservice.declinevenueapplication(payload, this.venueapplicationpk )
      .subscribe(
        (req: any)=>{
          this.declinesucess = true;
        });
  }

  // decline reasons gotten from database
  venuedeclinereasons =[];


  // experiential types
  experientialtypes = [];

  showcuisine2 = false;
  checkcuisineonefiled(){
    const cuisine1 = this.venueinputedform.form.value.cuisine1select;
    if(cuisine1 !== ''){
      this.showcuisine2 = true;
    }
    else{
      this.showcuisine2 = false;
    }
  }

  experientialcheckboxclick(){
    this.showexperientialtypeselect = !this.showexperientialtypeselect;
  }
  restaurantcheckboxclick(){
    this.showcuisinetypeselect = !this.showcuisinetypeselect;
  }

  //cuisines gotten from database
  cuisines=[];
  venueapplicationpk;
  ngOnInit() {
    window.scrollTo(0,0);
    //get pk from route for venueapplication object get
    this.route.params
      .subscribe(
        params =>{
          this.venueapplicationpk = params['pk'];
          if(this.venueapplicationpk === 'create'){
            this.createvenue = true;
          }
          if(!this.createvenue){
            this.venueapplicationservice.getvenueapplication(this.venueapplicationpk)
              .subscribe(
                (req: any)=>{
                  this.venueapplicationobject = req;
                  if(this.venueapplicationobject.isexperiential){
                    this.showexperientialtypeselect = true;
                  }
                  if(this.venueapplicationobject.isrestaurant){
                    this.showcuisinetypeselect = true;
                    this.showcuisine2 = true;
                  }
                }
              );
          }
        });



    // dependancy services
    // venue application decline reasons
    this.venueapplicationdependancyservice.getallvenuedecllinereasons()
      .subscribe(
        (req: any)=>{
          this.venuedeclinereasons = req;
        });

    // venue search city and neighborhoods get
    this.venueapplicationdependancyservice.getcitiesandneighborhoods()
      .subscribe(
        (req: any)=>{
          this.searchcities = req;
          console.log(this.searchcities);
        }
      );

    // experiential type get
    this.venueapplicationdependancyservice.getexperientialtypes()
      .subscribe(
        (req: any)=>{
          this.experientialtypes = req;
        }
      );

    // cuisines get
    this.venueapplicationdependancyservice.getcuisines()
      .subscribe(
        (req: any)=>{
          this.cuisines = req;
        }
      );


  }

}

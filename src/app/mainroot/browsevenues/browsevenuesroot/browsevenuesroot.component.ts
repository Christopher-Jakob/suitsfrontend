import {Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {NgForm} from "@angular/forms";
import {BrowseVenueDependancyService} from "../../../services/pagedependancy/browsevenues/browsevenues.dependancy.service";
import {VenueService} from '../../../services/venueservice/venueservice';
import {BrowsevenuescomponentcommService} from "../../../services/browsevenueservice/browsevenuescommservice/browsevenuescomponentcomm.service";
import {LandingpageDependancyService} from "../../../services/mainroot/landingpage/LandingpageDependancyService";

@Component({
  selector: 'app-browsevenuesroot',
  templateUrl: './browsevenuesroot.component.html',
  styleUrls: ['./browsevenuesroot.component.scss'],
  providers: [BrowseVenueDependancyService, LandingpageDependancyService]


})
export class BrowsevenuesrootComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private browsevenuedependancyservice: BrowseVenueDependancyService,  private landingpageservice: LandingpageDependancyService,
              private venueservice: VenueService, private browsevenuescommservice: BrowsevenuescomponentcommService, private cd: ChangeDetectorRef) { }
  choicesload = true;
  selectedcity;
  filteredvenueslength;
  citypkreceivevar;
  citypk;

  // Settings configuration for neighborhood dropdown
  neighborhooddropdownsettings = {
    singleSelection: false,
    idField: 'neighborhood',
    textField: 'neighborhood',
    enableCheckAll: false,
    allowSearchFilter: false,
    itemsShowLimit: 1,
  };
  neighborhoodmodel =[];
  neighborhoodchoices = [];
  neighborhoodchoices2 = [];

  // settings confriguration for venuetype dropdown

  venuetypedropdownsettings = {
    singleSelection: false,
    idField: 'type',
    textField: 'type',
    enableCheckAll: false,
    allowSearchFilter: false,
    itemsShowLimit: 1,

  };

  venuetypemodel=[];
  venuetypechoices = [];
  venuetypechoices2 = [];

  // settings confriuration for privacy types dropdown
  privacydropdownsettings ={
    singleSelection: false,
    idField: 'value',
    textField: 'name',
    enableCheckAll: false,
    allowSearchFilter: false,
    itemsShowLimit: 1,

  };

  privacytypemodel = [];
  privacytypechoices = [];
  privacytypechoices2 = [];

  // price code
  pricedropdownsettings = {
    singleSelection: false,
    idField: 'value',
    textField: 'type',
    enableCheckAll: false,
    allowSearchFilter: false,
    itemsShowLimit: 1
  };

  pricemodel = [];
  pricechoices = [
    {value: 1, type: '$ 30 and under'},
    {value: 2, type: '$ 31 to $ 50'},
    {value: 3, type: '$ 51 and over'}
  ];

  // secondary filters

  //cuisine multi dropdown select
  cuisinedropdownsettings = {
    singleSelection: false,
    idField: 'name',
    textField: 'name',
    enableCheckAll: false,
    allowSearchFilter: false,
    itemsShowLimit: 1,

  };

  cuisinemodel=[];
  cuisinechoices = [];

  //experiential multi dropdown select

  experientialdropdownsettings = {
    singleSelection: false,
    idField: 'type',
    textField: 'type',
    enableCheckAll: false,
    allowSearchFilter: false,
    itemsShowLimit: 1,

  };

  experientialmodel=[];
  experientialchoices = [];


  // ammenities multi dropdown select

  ammenitiesdropdownsettings = {
    singleSelection: false,
    idField: 'name',
    textField: 'name',
    enableCheckAll: false,
    allowSearchFilter: false,
    itemsShowLimit: 1,

  };

  ammenitiesmodel=[];
  ammenitieschoices = [];

  // seating option multi dropdown select

  seatingtypesdropdownsettings = {
    singleSelection: false,
    idField: 'name',
    textField: 'name',
    enableCheckAll: false,
    allowSearchFilter: false,
    itemsShowLimit: 1,

  };

  seatingtypesmodel=[];
  seatingtypeschoices = [];
  filteredvenues=[];

  // add filters code
  filterdropdown = false;
  showfiltertoggle(){
    this.filterdropdown = !this.filterdropdown;

  }
  capacityformreset = '';
  clearfilters(){
    this.neighborhoodmodel = [];
    this.venuetypemodel = [];
    this.privacytypemodel = [];
    this.cuisinemodel=[];
    this.experientialmodel=[];
    this.ammenitiesmodel=[];
    this.seatingtypesmodel=[];
    this.capacityform.reset();
    this.minspendform.reset();
    this.disablecapacityinput = true;
    this.capacityformreset = '';
    this.applyfilters();
    this.searchform.reset();

  }

  @ViewChild('capacityform') capacityform: NgForm;
  @ViewChild('minspendform') minspendform: NgForm;
  @ViewChild('searchform') searchform: NgForm;

  disablecapacityinput = true;
  enablecapinput(){
    console.log('this is the enable push');
    console.log(this.capacityform.form.value);
    if(this.capacityform.form.value.capacityselectinput !== ''){
      this.disablecapacityinput = false;
    }
    if(this.capacityform.form.value.capacityselectinput === ''){
      this.disablecapacityinput = true;
    }
  }

  searchvenue(){
    const query = this.searchform.form.value.searchinput;
    this.browsevenuedependancyservice.browsesearch(this.citypk, query)
      .subscribe(
        (req: any)=>{
          this.filteredvenues = req;
          console.log('this is the filtered venues');
          console.log(this.filteredvenues);
          for(let venue in this.filteredvenues){
            let images = this.filteredvenues[venue].venueimage_set;
            console.log('this is the venue images before ordering');
            console.log(images);
            images = images.sort((a, b) => ((a.order) < (b.order) ? -1 : ((a.order) > (b.order) ? 1 : 0)));
            console.log('this is the venue images after ordering');
            console.log(images);
            for(let image in images){
              images[image] = images[image].imageurl;
            }
            this.filteredvenues[venue].venueimage_set = images;
            let semiprivaterooms = 0;
            let privaterooms = 0;
            if(this.filteredvenues[venue].fullbuyout){
              privaterooms ++;
            }
            let rooms = this.filteredvenues[venue].room_set;
            for(const room of rooms){
              if(room.privateroom){
                privaterooms ++;
              }
              if(room.semiprivateroom){
                semiprivaterooms ++;
              }
            }
            const roomsets = {
              semiprivate: semiprivaterooms,
              privateroom: privaterooms
            };
            this.filteredvenues[venue].room_set = roomsets;

            if(this.filteredvenues[venue].cuisine1 != null){
              for(const cuisine of this.cuisinechoices){
                if(this.filteredvenues[venue].cuisine1 == cuisine.pk){
                  this.filteredvenues[venue].cuisine1 = cuisine.name;

                }
                if(this.filteredvenues[venue].cuisine2 == cuisine.pk){
                  this.filteredvenues[venue].cuisine2 = cuisine.name;
                }
              }

            }

            for(const neighborhood of this.neighborhoodchoices){
              if(this.filteredvenues[venue].searchneighborhood === neighborhood.pk){
                this.filteredvenues[venue].searchneighborhood = neighborhood.neighborhood;
              }
            }
            for(const choice of this.experientialchoices){
              if(this.filteredvenues[venue].experientialtype === choice.pk){
                this.filteredvenues[venue].experientialtype = choice.type;
              }
            }
          }
          this.filteredvenueslength = this.filteredvenues.length;


          this.browsevenuescommservice.sendvenuelist(this.filteredvenues);

          this.venuetypechoices2 = this.venuetypechoices.sort((a, b) => ((a.type) < (b.type) ? -1 : ((a.type) > (b.type) ? 1 : 0)));
          this.privacytypechoices2 = this.privacytypechoices.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));
          this.neighborhoodchoices2 = this.neighborhoodchoices.sort((a, b) => ((a.neighborhood) < (b.neighborhood) ? -1 : ((a.neighborhood) > (b.neighborhood) ? 1 : 0)));
          this.experientialchoices.sort((a, b) => ((a.type) < (b.type) ? -1 : ((a.type) > (b.type) ? 1 : 0)));
          this.cuisinechoices.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));
          this.ammenitieschoices.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));

        });

  }


  applyfilters(){
    this.searchform.reset();
    let queryparams ={
      neighborhoods: null,
      venuetypes: null,
      privacy: null,
      seatedcapacity: null,
      standingcapacity: null,
      cuisine: null,
      experiential: null,
      surroundsound: null,
      stage: null,
      television: null,
      screenandprojector: null,
      naturallight: null,
      wifi: null,
      wheelchairaccessible: null,
      outdoorseating: null,
      cocktailstanding: null,
      classroom: null,
      ushape: null,
      sixtyrounds: null,
      boardroom: null,
      theater: null,
      hallowsquare: null,
      minimumspend: null

    };
    if(this.neighborhoodmodel != null){
      let neighborhoodslist = [];
      for(const neighborhood of this.neighborhoodmodel){
        neighborhoodslist.push(neighborhood);

      }
      queryparams.neighborhoods = neighborhoodslist;
    }
    if(this.venuetypemodel != null){
      let venuetypelist = [];
      for(const venuetype of this.venuetypemodel){
        venuetypelist.push(venuetype);
      }
      queryparams.venuetypes = venuetypelist;
    }
    if(this.privacytypemodel != null){
      let privacylist = [];
      for(const privacy of  this.privacytypemodel){
        privacylist.push(privacy.value);
      }
      queryparams.privacy = privacylist;
    }
    if(this.capacityform != null) {
      if (this.capacityform.form.value.capacityselectinput != null) {
        const capacityselect = this.capacityform.form.value.capacityselectinput;
        if (this.capacityform.form.value.groupnumberinput != null) {
          const groupnumberinput = this.capacityform.form.value.groupnumberinput
          console.log('this is the group number input');
          console.log(groupnumberinput);
          if (capacityselect === 'seated') {
            if(groupnumberinput != ''){
              queryparams.seatedcapacity = groupnumberinput;
            }

          }
          if (capacityselect === 'standing') {
            if(groupnumberinput != ''){
              queryparams.standingcapacity = groupnumberinput;
            }

          }
        }
      }
    }
    if(this.cuisinemodel != null){
      let cuisinetypelist = [];
      for(const cuisine of this.cuisinemodel){
        cuisinetypelist.push(cuisine);
      }
      queryparams.cuisine = cuisinetypelist;
      console.log('this is the query param cuisine');
      console.log(queryparams.cuisine);
    }
    if(this.experientialmodel != null) {
      let experientiallist = [];
      for (const experiential of this.experientialmodel) {
        experientiallist.push(experiential);
      }
    }
    if(this.ammenitiesmodel != null){
      for(const ammenity of this.ammenitiesmodel){
        if(ammenity === 'Stage'){
          queryparams.stage = true;
        }
        if(ammenity === 'Surround Sound'){
          queryparams.surroundsound = true;
        }
        if(ammenity === 'Television'){
          queryparams.television = true;
        }
        if(ammenity === 'Screen + Projector'){
          queryparams.screenandprojector = true;
        }
        if(ammenity === 'Natural Light'){
          queryparams.screenandprojector = true;
        }
        if(ammenity === 'Wifi'){
          queryparams.wifi = true;
        }
        if(ammenity === 'Wheelchair Accessible'){
          queryparams.wheelchairaccessible = true;
        }
        if(ammenity === 'Outdoor Seating'){
          queryparams.outdoorseating = true;
        }
      }
    }
    if(this.seatingtypesmodel != null){
      for(const seating of this.seatingtypesmodel){
        if(seating === 'Cocktail/Standing'){
          queryparams.cocktailstanding = true;
        }
        if(seating === 'Classroom'){
          queryparams.classroom = true;
        }
        if(seating === 'U-Shape'){
          queryparams.ushape = true;
        }
        if(seating === "60' Rounds"){
          queryparams.sixtyrounds = true;
        }
        if(seating === 'Boardroom'){
          queryparams.boardroom = true;
        }
        if(seating === 'Theater') {
          queryparams.theater = true;
        }
        if(seating === 'Hallow Square'){
          queryparams.hallowsquare = true;
        }
      }
    }
    if(this.minspendform != null){
      if(this.minspendform.form.value.minimumspendinput != ''){
        queryparams.minimumspend = this.minspendform.form.value.minimumspendinput;
      }
    }
    this.venueservice.browsevenues(this.selectedcity, queryparams)
      .subscribe(
        (req: any)=>{
          console.log('this is the request from browse');
          this.filteredvenues = req;
          for(let venue in this.filteredvenues){
            for(const cuisine in this.cuisinechoices){
              if(this.filteredvenues[venue].cuisine1 === this.cuisinechoices[cuisine].pk){
                this.filteredvenues[venue].cuisine1 = this.cuisinechoices[cuisine].name;
              }
              if(this.filteredvenues[venue].cuisine2 === this.cuisinechoices[cuisine].pk){
                this.filteredvenues[venue].cuisine2 = this.cuisinechoices[cuisine].name;
              }
            }
            for(const neighborhood of this.neighborhoodchoices){
              if(this.filteredvenues[venue].searchneighborhood === neighborhood.pk){
                this.filteredvenues[venue].searchneighborhood = neighborhood.neighborhood;
              }
            }
            for(const choice of this.experientialchoices){
              if(this.filteredvenues[venue].experientialtype === choice.pk){
                this.filteredvenues[venue].experientialtype = choice.type;
              }
            }
            let semiprivaterooms = 0;
            let privaterooms = 0;
            if(this.filteredvenues[venue].fullbuyout){
              privaterooms ++;
            }
            let rooms = this.filteredvenues[venue].room_set;
            for(const room of rooms){
              if(room.privateroom){
                privaterooms ++;
              }
              if(room.semiprivateroom){
                semiprivaterooms ++;
              }
            }
            const roomsets = {
              semiprivate: semiprivaterooms,
              privateroom: privaterooms
            };
            this.filteredvenues[venue].room_set = roomsets;

            let images = this.filteredvenues[venue].venueimage_set;
            for(let image in images){
              images[image] = images[image].imageurl;
            }
            this.filteredvenues[venue].venueimage_set = images;

          }
          this.filteredvenueslength = this.filteredvenues.length;
          this.browsevenuescommservice.sendvenuelist(this.filteredvenues);
        }
      );
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.browsevenuescommservice.sendstate('show');

    // grab the inputed city from the route params then grab the neighbhorhoods for that particular city.
    this.route.params
      .subscribe(
        (params: Params) =>{
          this.selectedcity = params['city'];
          this.browsevenuescommservice.sendselectedcity(this.selectedcity);
          this.citypkreceivevar = this.browsevenuescommservice.receiveselectedcity()
            .subscribe(
              (req: any)=>{
                if(req != null){
                  this.citypk = req;
                }
              }
            );
          this.browsevenuedependancyservice.browsevenuesdependancy(this.selectedcity)
            .subscribe(
              (req: any)=>{
                this.neighborhoodchoices = req.neighborhoods;
                this.venuetypechoices = req.venuetypes;
                this.privacytypechoices = req.privacytypes;
                this.cuisinechoices = req.cuisines;
                this.experientialchoices = req.experientialtypes;
                this.ammenitieschoices = req.amenities;
                this.seatingtypeschoices = req.seatingoptions;
                this.choicesload = false;
                this.venueservice.browsevenues(this.selectedcity, null)
                  .subscribe(
                    (req: any)=>{
                      this.filteredvenues = req;
                      console.log('this is the filtered venues');
                      console.log(this.filteredvenues);
                      for(let venue in this.filteredvenues){
                        let images = this.filteredvenues[venue].venueimage_set;
                        console.log('this is the venue images before ordering');
                        console.log(images);
                        images = images.sort((a, b) => ((a.order) < (b.order) ? -1 : ((a.order) > (b.order) ? 1 : 0)));
                        console.log('this is the venue images after ordering');
                        console.log(images);
                        for(let image in images){
                          images[image] = images[image].imageurl;
                        }
                        this.filteredvenues[venue].venueimage_set = images;
                        let semiprivaterooms = 0;
                        let privaterooms = 0;
                        if(this.filteredvenues[venue].fullbuyout){
                          privaterooms ++;
                        }
                        let rooms = this.filteredvenues[venue].room_set;
                        for(const room of rooms){
                          if(room.privateroom){
                            privaterooms ++;
                          }
                          if(room.semiprivateroom){
                            semiprivaterooms ++;
                          }
                        }
                        const roomsets = {
                          semiprivate: semiprivaterooms,
                          privateroom: privaterooms
                        };
                        this.filteredvenues[venue].room_set = roomsets;

                        if(this.filteredvenues[venue].cuisine1 != null){
                          for(const cuisine of this.cuisinechoices){
                            if(this.filteredvenues[venue].cuisine1 == cuisine.pk){
                              this.filteredvenues[venue].cuisine1 = cuisine.name;

                            }
                            if(this.filteredvenues[venue].cuisine2 == cuisine.pk){
                              this.filteredvenues[venue].cuisine2 = cuisine.name;
                            }
                          }

                        }

                        for(const neighborhood of this.neighborhoodchoices){
                          if(this.filteredvenues[venue].searchneighborhood === neighborhood.pk){
                            this.filteredvenues[venue].searchneighborhood = neighborhood.neighborhood;
                          }
                        }
                        for(const choice of this.experientialchoices){
                          if(this.filteredvenues[venue].experientialtype === choice.pk){
                            this.filteredvenues[venue].experientialtype = choice.type;
                          }
                        }
                      }
                      this.filteredvenueslength = this.filteredvenues.length;


                      this.browsevenuescommservice.sendvenuelist(this.filteredvenues);

                      this.venuetypechoices2 = this.venuetypechoices.sort((a, b) => ((a.type) < (b.type) ? -1 : ((a.type) > (b.type) ? 1 : 0)));
                      this.privacytypechoices2 = this.privacytypechoices.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));
                      this.neighborhoodchoices2 = this.neighborhoodchoices.sort((a, b) => ((a.neighborhood) < (b.neighborhood) ? -1 : ((a.neighborhood) > (b.neighborhood) ? 1 : 0)));
                      this.experientialchoices.sort((a, b) => ((a.type) < (b.type) ? -1 : ((a.type) > (b.type) ? 1 : 0)));
                      this.cuisinechoices.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));
                      this.ammenitieschoices.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));

                    });
              });
          let cities = [];
          if(this.citypk != null){
            this.landingpageservice.getsearchcitylist()
              .subscribe(
                (req: any)=> {
                  cities = req;
                  for(let c in cities){
                    if(cities[c].city === this.selectedcity){
                      this.citypk = cities[c].pk;

                    }
                  }
                });
          }

        });

  }

  ngOnDestroy(){

  }



}


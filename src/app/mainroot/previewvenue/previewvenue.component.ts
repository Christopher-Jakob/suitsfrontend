import { Component, OnInit, OnDestroy } from '@angular/core';
import { VenueService } from "../../services/venueservice/venueservice";
import { ModalToggleService } from '../../services/pagemixins/modeltoggleservice/modaltoggle.service';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { VenueAdminParentAdminService } from "../../services/venueadmin/venueadminparentadminservice/venueadmin.parentadmin.service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SuitsAdminDependancySettings } from "../../services/pagedependancy/suitsadmin/suitssettings/suitssettings.dependancy.service";
import { DomSanitizer } from '@angular/platform-browser';
import {UserAuthorizationService} from "../../services/userservice/userauthorizationservice/userauthorizationservice";
import {NgForm} from "@angular/forms";
import {Makerfpservice} from "../../services/pagemixins/make-rfp.service";
import {ClientUserService} from "../../services/userservice/clientuserservice/clientuserservice";
import {BrowsevenuescomponentcommService} from "../../services/browsevenueservice/browsevenuescommservice/browsevenuescomponentcomm.service";
import {RFPService} from "../../services/rfpservice/rfpservice";
import $ from "jquery";

@Component({
  selector: 'app-previewvenue',
  templateUrl: './previewvenue.component.html',
  styleUrls: ['./previewvenue.component.scss'],
  providers: [VenueService, SuitsAdminDependancySettings, ClientUserService, RFPService]
})
export class PreviewvenueComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private venueservice: VenueService, private router: Router, private rfpmodaltoggle: ModalToggleService, private parentadminservice: VenueAdminParentAdminService, private modalService: NgbModal, private settingservice: SuitsAdminDependancySettings, public sanitizer: DomSanitizer, private authservice: UserAuthorizationService, private clientservice: ClientUserService, private browsevenuescommservice:BrowsevenuescomponentcommService, private rfpservice : RFPService) { }

  // variable to hold venue name only needed if venue not send by venueservice
  rfpshow = false;
  venuename;
  venueadmin;
  option = false;
  permission;
  parentadminservicevar;
  userservicesubscription;
  user = null;
  // used for  event purpose dropdown on rfp
  eventpurpose;
  roomnames = [];

  //food carousel settings
  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "arrows": false,
    "pauseOnDotsHover": true,
    "autoplay": true,
    "dots": true,
    "centerMode": true,
  };




  // variable to hold venue object
  venue = {
    id: 0,
    name: '',
    fullbuyout: false,
    venuefullbuyoutphoto_set: [],
    fullbuyoutseatedcapacity: 0,
    fullbuyoutstandingcapactiy: 0,
    tour360url: '',
    cuisineimage_set: [],

    fullbuyoutminspend: 0,
    pricerating: null,
    venueimage_set: [
      {
        imageurl: '',
        order: 0,
      },

    ],
    venuesamplemenu_set: [],
    cuisine1: '',
    cuisine2: '',
    description: '',
    latitude: '',
    longitude: '',
    searchneighborhood: '',
    experientialtype: '',
    onsiteparking: false,
    valetparking: false,
    valetparkingamount: '',
    room_set: [

    ]

  };


  loginorsignup = false;
  signup = false;
  invalidinfo = false;
  rfpsent =false;
  verifysignup = false;


  // roomslideshowheight = '1rem';
  venueslideshowheight = '34rem';


  // variable to hold google maps object
  mapsurl = '';

  // spothero url for redirect to spot hero
  spotherourl ='';


  navtoroom(index) {
    let roomname = this.venue.room_set[index].name;
    this.router.navigate(['/preview', 'venue', this.venue.name, roomname]);

  }

  navfullbuyout() {
    this.router.navigate(['/preview','venue',this.venue.name, 'fullbuyout']);
  }

  returntoadminpage() {
    let venuename = this.venue.name;
    venuename = venuename.replace(/ /g, '_');
    this.router.navigate(['/admin', this.permission, 'venue-admin', venuename, this.venue.id]);
  }


  ngOnInit() {
    window.scrollTo(0, 0);
    this.browsevenuescommservice.sendstate('show');
    let cuisine;
    let experiential;
    let searchneighborhood;

    this.venueadmin = this.route.snapshot.queryParams['option'] || null;
    if (this.venueadmin !== null) {
      this.option = true;
    }
    this.parentadminservicevar = this.parentadminservice.receivepermission()
      .subscribe(
        (req: any) => {
          if (req != null) {
            this.permission = req;
          }
        });
    this.userservicesubscription = this.authservice.receiveuser()
      .subscribe(
        (req: any) => {
          if (req == null) {
            this.user = null;
          }
          if (req != null) {
            this.user = req;
            this.loginorsignup = false;
          }
        });
    this.route.params
      .subscribe(
        (params: Params) => {
          this.venuename = params['name'];
          this.venuename = this.venuename.replace(/_/g, ' ');
          this.settingservice.getallcityobjects()
            .subscribe(
              (req: any) => {
                console.log('here are the settings objects');
                console.log(req);
                this.eventpurpose = req.eventpurpose;
                cuisine = req.cuisine;
                experiential = req.experientialtype;
                searchneighborhood = req.neighborhood;
                let preview = false;
                if (this.option) {
                  preview = true;
                }

                this.venueservice.getvenuebyname(this.venuename, preview)
                  .subscribe(
                    (req: any) => {
                      console.log('this is the venue');
                      console.log(req);
                      this.venue = req.venue;
                      this.mapsurl = req.mapurl;
                      this.spotherourl = 'https://spothero.com/search?latitude=' + String(this.venue.latitude) + '&longitude=' + String(this.venue.longitude);
                      // add venue room names to room preference array.
                      // if fullbuyout equals true add full buy out option.
                      if (this.venue.fullbuyout) {
                        this.roomnames.push('Full Buyout');
                      }
                      for (let room of this.venue.room_set) {
                        this.roomnames.push(room.name);
                      }
                      for (let c of cuisine) {
                        if (this.venue.cuisine1 === c.pk) {
                          this.venue.cuisine1 = c.name;
                        }
                        if (this.venue.cuisine2 === c.pk) {
                          this.venue.cuisine2 = c.name;
                        }
                      }
                      for (let e of experiential) {
                        if (this.venue.experientialtype === e.pk) {
                          this.venue.experientialtype = e.type;
                        }
                      }
                      for (let n of searchneighborhood) {
                        if (this.venue.searchneighborhood === n.pk) {
                          console.log('the neighborhood got done');
                          this.venue.searchneighborhood = n.neighborhood;
                        }
                      }
                      this.venue.venueimage_set = this.venue.venueimage_set.sort((a, b) => ((a.order) < (b.order) ? -1 : ((a.order) > (b.order) ? 1 : 0)));
                      for (let image in this.venue.venueimage_set) {
                        this.venue.venueimage_set[+image] = this.venue.venueimage_set[+image].imageurl as any;
                      }
                      let onlinerooms = [];
                      for (let room in this.venue.room_set) {
                        if (this.venue.room_set[room].online) {
                          onlinerooms.push(this.venue.room_set[room]);
                        }
                      }
                      for (let room in onlinerooms) {
                        let workingroomimages = onlinerooms[room].roomimage_set;
                        workingroomimages = workingroomimages.sort((a, b) => ((a.order) < (b.order) ? -1 : ((a.order) > (b.order) ? 1 : 0)));
                        for (let image in workingroomimages) {
                          workingroomimages[image] = workingroomimages[image].imageurl as any;
                        }
                        onlinerooms[room].roomimage_set = workingroomimages;
                      }
                      this.venue.room_set = onlinerooms;


                    });
              });
        });

  }
  ngOnDestroy() {
    this.browsevenuescommservice.sendstate('unshow');
    this.parentadminservicevar.unsubscribe();
  }

}

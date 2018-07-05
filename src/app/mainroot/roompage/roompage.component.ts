import {Component, OnInit, OnDestroy} from '@angular/core';
import {VenueService} from "../../services/venueservice/venueservice";
import {ModalToggleService} from '../../services/pagemixins/modeltoggleservice/modaltoggle.service';
import {RoompageDependancyService} from '../../services/pagedependancy/roompage/roompage.dependancy.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BrowsevenuescomponentcommService} from "../../services/browsevenueservice/browsevenuescommservice/browsevenuescomponentcomm.service";

@Component({
  selector: 'app-roompage',
  templateUrl: './roompage.component.html',
  styleUrls: ['./roompage.component.scss'],
  providers:[RoompageDependancyService]
})
export class RoompageComponent implements OnInit, OnDestroy {

  constructor(private venueservice: VenueService, private route: ActivatedRoute, private roompagedependancyservice: RoompageDependancyService, private router: Router, private rfpmodaltoggle: ModalToggleService, private modalService: NgbModal, private browsevenuescommservice:BrowsevenuescomponentcommService) {
  }

  // height
  roomheight = "30rem";

  // modal code
  makerfpmodal = false;

  showmakerfpmodal() {
    this.makerfpmodal = !this.makerfpmodal;
  }

  unshowmakerfpmodal() {
    this.makerfpmodal = false;
  }

  navigatetoroom(index) {
    let name;
    if (index === 'fullbuyout') {
      name = 'fullbuyout';
    } else {
      name = this.otherrooms[index].name;
      name = name.replace(/ /g, '_');
    }
    this.router.navigate(['/venue', this.linkvenuename, name]);
  }

  fullbuyoutroomactive = false;

  // venuename from route param name used for navigation
  venue;
  room = {
    // things that you didn't put in
    privateroom: false,
    semiprivateroom: false,
    seatedcapacity: null,
    standingcapacity: null,


    surroundsoundamenity: false,
    classroomamenity: false,
    stageamenity: false,
    televisionamenity: false,
    screenprojectoramenity: false,
    naturallightamenity: false,
    wifiamenity:false,
    wheelchairamenity:false,
    cocktailstandingseatingoption: false,
    classroomseatingoption: false,
    ushapeseatingoption: false,
    sixtyroundseatingoption: false,
    seventy2roundseatingoption : false,
    boardroomseatingoption: false,
    theaterseatingoption: false,
    hallowsquareseatingoption: false,
    roomimage_set: [],

  };
  otherrooms = [];
  venuename;
  roomname;
  linkvenuename;

  // receiveroom subject observable variable
  receiveroom;

  // receiveveue subject observable variable
  receivevenue;

  // all amenities
  allamenities = [];

  //room amenities
  roomamenities;
  roomamenitiesobjects = [];

  // all setuptypes
  allsetuptypes = [];

  //room setuptypes
  roomsetuptypes;
  roomsetuptypesobjects = [];

  //other rooms to be displayed
  closeResult: string;

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  ngOnInit() {
    this.browsevenuescommservice.sendstate('show');
    this.route.params
      .subscribe(
        (params: Params)=>{
          this.fullbuyoutroomactive = false;
          this.otherrooms = [];
          this.venuename = params['name'];
          this.roomname = params['room'];
          this.linkvenuename = this.venuename;
          this.venuename = this.venuename.replace(/_/g, ' ');
          if(this.roomname === 'fullbuyout'){
            this.fullbuyoutroomactive = true;
          }else{
            this.roomname = this.roomname.replace(/_/g, ' ');
          }
          // option is a hack to  allow venue admins to see their offline venues
          let option = false;

          this.venueservice.getvenuebyname(this.venuename, option )
            .subscribe(
              (req: any)=>{
                this.venue = req.venue;
                console.log("this is venue");
                console.log(this.venue);

                for(let image in this.venue.venueimage_set){
                  this.venue.venueimage_set[+image] = this.venue.venueimage_set[+image].imageurl as any;
                }

                for(let r in this.venue.room_set) {
                  if (this.venue.room_set[+r].name === this.roomname && this.venue.room_set[+r].online) {
                    this.room = this.venue.room_set[+r];

                    console.log("this is the room");

                    console.log(this.room);
                    let roomimageset = this.room.roomimage_set;
                    for (let image in roomimageset) {
                      roomimageset[+image] = roomimageset[+image].imageurl;
                    }
                    this.room.roomimage_set = roomimageset;
                  }
                  if (this.venue.room_set[+r].online && this.venue.room_set[+r].name !== this.roomname) {
                    let workingroom = this.venue.room_set[+r];
                    let images = workingroom.roomimage_set;
                    for (let i in images) {
                      images[i] = images[i].imageurl;
                    }
                    workingroom.roomimage_set = images;
                    this.otherrooms.push(workingroom);
                  }
                }
                console.log('this is the other rooms');
                console.log(this.otherrooms);
              });
        });
  }

  ngOnDestroy(){
    this.browsevenuescommservice.sendstate('unshow');

  }

}

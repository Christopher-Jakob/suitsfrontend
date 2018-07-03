import { Component, OnInit } from '@angular/core';
import { SortEvent } from '../../../../../../draggable/sortable-list.directive';
import {VenueAdminVolleyService} from "../../../../../../services/venueadmin/venueadminvolleyservice/venueadmin.volley.service";
import {AwsService} from "../../../../../../services/amazonwebservice services/aws.services";
import {VenueAdminVenueRoomDetailService} from "../../../../../../services/venueadmin/venueadminroomdetailservice/venueadmin.venueroom.detail.service";


@Component({
  selector: 'app-venueroomshowphotos',
  templateUrl: './venueroomshowphotos.component.html',
  styleUrls: ['./venueroomshowphotos.component.scss']
})
export class VenueroomshowphotosComponent implements OnInit {

  venueobject;

  roomobject = {
    pk: 1,
    name: '',
    online: false,
    description: '',
    privateroom: false,
    semiprivateroom: false,
    seatedcapacity: '',
    standingcapacity: '',
    minimumspend: '',
    surroundsoundamenity: false,
    outdoorseatingamenity: false,
    stageamenity: false,
    televisionamenity: false,
    screenprojectoramenity: false,
    naturallightamenity: false,
    wifiamenity: false,
    wheelchairaccessibleamenity: false,
    cocktailstandingseatingoption: false,
    classroomseatingoption: false,
    ushapeseatingoption: false,
    sixtyroundseatingoption: false,
    boardroomseatingoption: false,
    theaterseatingoption: false,
    hallowsquareseatingoption: false,
    roomimage_set: [{
      pk: null,
      room: null,
      key: '',
      order: null,
      imageurl: ''
    }]
  };

  constructor(private volleyservice: VenueAdminVolleyService, private awsservice: AwsService, private roomdetailservice: VenueAdminVenueRoomDetailService) { }

  volleyservicevar;
  roomvolleyservicevar;

  // delete image code
  activatedindex = null;

  showdeleteconfirm(index){
    this.activatedindex = index;
  }

  unshowdeleteconfrim(){
    this.activatedindex = null;
  }

  deleteimage(index){
    const pk = this.roomobject.roomimage_set[index].pk;
    this.awsservice.deleteroomphotoinstance(pk)
      .subscribe(
        (req: any)=>{
          this.roomobject.roomimage_set.splice(+index, 1);
          this.activatedindex = null;
          this.orderfunction();
        });
  }

  // sort the photos
  sort(event: SortEvent) {
    // items to be swapped
    const current = this.roomobject.roomimage_set[event.currentIndex];
    const swapWith = this.roomobject.roomimage_set[event.newIndex];

    // swapping items when moved over each other
    this.roomobject.roomimage_set[event.newIndex] = current;
    this.roomobject.roomimage_set[event.currentIndex] = swapWith;

    this.orderfunction();

  }

  orderfunction() {
    let imagearray = [];
    for (let image in this.roomobject.roomimage_set){
      this.roomobject.roomimage_set[image].order = +image+1;
      const imagepk = this.roomobject.roomimage_set[image].pk;
      const payload = {
        imageurl: this.roomobject.roomimage_set[image].imageurl,
        room: this.roomobject.roomimage_set[image].room,
        key: this.roomobject.roomimage_set[image].key,
        order: this.roomobject.roomimage_set[image].order
      };
      this.awsservice.updateroomphotoinstance(imagepk, payload)
        .subscribe(
          (req: any)=>{
          });
    }

    for(let room in this.venueobject.room_set){
      if(this.venueobject.room_set[room].pk === this.roomobject.pk){
        this.venueobject.room_set[room] = this.roomobject;
        this.volleyservice.sendobject(this.venueobject);
      }
    }

  }

  ngOnInit() {
    this.volleyservicevar = this.volleyservice.receiveobject()
      .subscribe(
        (req: any)=> {
          if(req !== null){
            this.venueobject = req;
            this.roomvolleyservicevar = this.volleyservice.receiveroom()
              .subscribe(
                (req: any)=>{
                  if(req !== null){
                    this.roomobject = req;
                    console.log('this is the room object');
                    console.log(this.roomobject);

                    // sort by order(numeric value) value in ascending order
                    this.roomobject.roomimage_set.sort((a, b) => (a.order) - (b.order));
                  }
                }
              );
          }
        });



  }

  ngOnDestroy() {
    this.volleyservicevar.unsubscribe();
  }

}

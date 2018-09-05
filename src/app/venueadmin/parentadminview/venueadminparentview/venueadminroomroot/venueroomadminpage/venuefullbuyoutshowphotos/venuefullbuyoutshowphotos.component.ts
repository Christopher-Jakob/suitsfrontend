import { Component, OnInit } from '@angular/core';
import { SortEvent } from '../../../../../../draggable/sortable-list.directive';
import {VenueAdminVolleyService} from "../../../../../../services/venueadmin/venueadminvolleyservice/venueadmin.volley.service";
import {AwsService} from "../../../../../../services/amazonwebservice services/aws.services";
import {VenueAdminVenueRoomDetailService} from "../../../../../../services/venueadmin/venueadminroomdetailservice/venueadmin.venueroom.detail.service";


@Component({
  selector: 'app-venuefullbuyoutshowphotos',
  templateUrl: './venuefullbuyoutshowphotos.component.html',
  styleUrls: ['./venuefullbuyoutshowphotos.component.scss']
})
export class VenuefullbuyoutshowphotosComponent implements OnInit {

  venueobject;

  constructor(private volleyservice: VenueAdminVolleyService, private awsservice: AwsService) { }

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
    const pk = this.venueobject.venuefullbuyoutphoto_set[index].pk;
    this.awsservice.deletevenuefullbuyoutphotoinstance(pk)
      .subscribe(
        (req: any)=>{
          this.venueobject.venuefullbuyoutphoto_set.splice(+index, 1);
          this.activatedindex = null;
          this.orderfunction();
        });
  }

  // sort the photos
  sort(event: SortEvent) {
    // items to be swapped
    const current = this.venueobject.venuefullbuyoutphoto_set[event.currentIndex];
    const swapWith = this.venueobject.venuefullbuyoutphoto_set[event.newIndex];

    // swapping items when moved over each other
    this.venueobject.venuefullbuyoutphoto_set[event.newIndex] = current;
    this.venueobject.venuefullbuyoutphoto_set[event.currentIndex] = swapWith;

    this.orderfunction();

  }

  orderfunction() {
    let imagearray = [];
    for (let image in this.venueobject.venuefullbuyoutphoto_set){
      this.venueobject.venuefullbuyoutphoto_set[image].order = +image+1;
      const imagepk = this.venueobject.venuefullbuyoutphoto_set[image].pk;
      const payload = {
        imageurl: this.venueobject.venuefullbuyoutphoto_set[image].imageurl,
        venue: this.venueobject.id,
        key: this.venueobject.venuefullbuyoutphoto_set[image].key,
        order: this.venueobject.venuefullbuyoutphoto_set[image].order
      };
      this.awsservice.updatevenuefullbuyoutphotoinstance(imagepk, payload)
        .subscribe(
          (req: any)=>{
          });
    }
    this.volleyservice.sendobject(this.venueobject);
  }

  ngOnInit() {
    this.volleyservicevar = this.volleyservice.receiveobject()
      .subscribe(
        (req: any)=> {
          if(req !== null){
            this.venueobject = req;
            this.venueobject.venuefullbuyoutphoto_set.sort((a, b) => (a.order) - (b.order));

          }
        });

  }

  ngOnDestroy() {
    this.volleyservicevar.unsubscribe();
  }

}

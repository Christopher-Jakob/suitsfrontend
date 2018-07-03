import { Component, OnInit, OnDestroy } from '@angular/core';
import { SortEvent } from '../../../../../draggable/sortable-list.directive';
import {VenueAdminVolleyService} from "../../../../../services/venueadmin/venueadminvolleyservice/venueadmin.volley.service";
import {AwsService} from "../../../../../services/amazonwebservice services/aws.services";
import {VenueprofileComponent} from "../venueprofile.component";

@Component({
  selector: 'app-venueshowphotos',
  templateUrl: './venueshowphotos.component.html',
  styleUrls: ['./venueshowphotos.component.scss'],
})
export class VenueshowphotosComponent implements OnInit, OnDestroy {

  venuevolleyservicevar;

  // venueobject used to render page
  venueobject = {
    id: 0,
    name: '',
    city: '',
    streetaddress1: '',
    state: '',
    online: false,
    zipcode: '',
    phonenumber: '',
    venuecontactname: '',
    venuecontactjobtitle : '',
    venuecontactemail: '',
    venuetype: '',
    description: '',
    sundayhop: false,
    sundayhopopen: '',
    sundayhopclose: '',
    mondayhop: false,
    mondayhopopen: '',
    mondayhopclose: '',
    tuesdayhop: false,
    tuesdayhopopen: '',
    tuesdayhopclose: '',
    wednesdayhop: false,
    wednesdayhopopen: '',
    wednesdayhopclose: '',
    thursdayhop: false,
    thursdayhopopen: '',
    thursdayhopclose: '',
    fridayhop: false,
    fridayhopopen: '',
    fridayhopclose: '',
    saturdayhop: false,
    saturdayhopopen: '',
    saturdayhopclose: '',
    venuesamplemenu_set: [],
    venueimage_set: [{
      pk: null,
      imageurl: '',
      venue: null,
      key: '',
      order: null
    }],
    valetparking: false,
    valetparkingamount: '',
    onsiteparking: false,
    isexperiential: false,
    isrestaurant: false,
    cuisine1:'',
    cuisine2:'',
    experientialtype: ''
  };

  constructor( private awsservice: AwsService, private venuevollyservice: VenueAdminVolleyService, private vp: VenueprofileComponent) { }

  activevenueimageindex = null;
  showvenueimagedeleteconfrim = false;

  activatedeleteimageconfrim(index){
    this.activevenueimageindex = index;
    this.showvenueimagedeleteconfrim = true;
  }

  deactivatedeleteimageconfrim(){
    this.showvenueimagedeleteconfrim = false;
    this.activevenueimageindex = null;
  }

  //delete photo code

  deletevenuephoto(index){
    const id = this.venueobject.venueimage_set[index].pk;
    this.awsservice.deletevenuephotoinstance(id)
      .subscribe(
        (req: any)=>{
          this.deactivatedeleteimageconfrim();
          this.venueobject.venueimage_set.splice(+index, 1);
          this.orderfunction();
        }
      );
    console.log("Image " + (+index+1) + " was deleted");
    console.log(this.venueobject.venueimage_set);
  }

  // sort the photos
  sort(event: SortEvent) {
    // items to be swapped
    const current = this.venueobject.venueimage_set[event.currentIndex];
    const swapWith = this.venueobject.venueimage_set[event.newIndex];

    // swapping items when moved over each other
    this.venueobject.venueimage_set[event.newIndex] = current;
    this.venueobject.venueimage_set[event.currentIndex] = swapWith;

    this.orderfunction();

    console.log("Image " + current.order + " was swapped with Image " + swapWith.order);
    console.log(this.venueobject.venueimage_set);
  }

  // update order value when a photo is added or deleted
  orderfunction() {
    let imagearray = [];
    for (let image in this.venueobject.venueimage_set){
      this.venueobject.venueimage_set[image].order = +image+1;
      const imagepk = this.venueobject.venueimage_set[image].pk;
      const payload = {
        imageurl: this.venueobject.venueimage_set[image].imageurl,
        venue: this.venueobject.venueimage_set[image].venue,
        key: this.venueobject.venueimage_set[image].key,
        order: this.venueobject.venueimage_set[image].order
      }
      this.awsservice.updatevenuephotoinstance(imagepk, payload)
        .subscribe(
          (req: any)=>{
            // console.log(req);
            // imagearray.push(req);
          });
    }
    // this.venueobject.venueimage_set = imagearray;
    this.venuevollyservice.sendobject(this.venueobject);
  }


  ngOnInit() {
    this.venuevolleyservicevar = this.venuevollyservice.receiveobject()
      .subscribe(
        (req: any)=> {
          if(req !== null){
            this.venueobject = req;
          }
        });

    console.log(this.venueobject.venueimage_set);

    // sort by order(numeric value) value in ascending order
    this.venueobject.venueimage_set.sort((a, b) => (a.order) - (b.order));

    // sort by key(string value) value in ascending order
    // this.venueobject.venueimage_set.sort((a, b) => ((a.key) < (b.key) ? -1 : ((a.key) > (b.key) ? 1 : 0)));

  }

  ngOnDestroy() {
    this.venuevolleyservicevar.unsubscribe();
  }

}

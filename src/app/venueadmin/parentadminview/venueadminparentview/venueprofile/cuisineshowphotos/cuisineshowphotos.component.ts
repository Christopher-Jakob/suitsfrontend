import { Component, OnInit, OnDestroy } from '@angular/core';
import { SortEvent } from '../../../../../draggable/sortable-list.directive';
import {VenueAdminVolleyService} from "../../../../../services/venueadmin/venueadminvolleyservice/venueadmin.volley.service";
import {AwsService} from "../../../../../services/amazonwebservice services/aws.services";
import {VenueprofileComponent} from "../venueprofile.component";

@Component({
  selector: 'app-cuisineshowphotos',
  templateUrl: './cuisineshowphotos.component.html',
  styleUrls: ['./cuisineshowphotos.component.scss']
})
export class CuisineshowphotosComponent implements OnInit, OnDestroy {

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
    cuisineimage_set: [{
      id: null,
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
    const id = this.venueobject.cuisineimage_set[index].id;
    this.awsservice.cuisineimagedelete(id)
      .subscribe(
        (req: any)=>{
          this.deactivatedeleteimageconfrim();
          this.venueobject.cuisineimage_set.splice(+index, 1);
          this.orderfunction();
        }
      );
  }

  // sort the photos
  sort(event: SortEvent) {
    // items to be swapped
    const current = this.venueobject.cuisineimage_set[event.currentIndex];
    const swapWith = this.venueobject.cuisineimage_set[event.newIndex];

    // swapping items when moved over each other
    this.venueobject.cuisineimage_set[event.newIndex] = current;
    this.venueobject.cuisineimage_set[event.currentIndex] = swapWith;

    this.orderfunction();

    console.log("Image " + current.order + " was swapped with Image " + swapWith.order);
    console.log(this.venueobject.cuisineimage_set);
  }

  // update order value when a photo is added or deleted
  orderfunction() {
    let imagearray = [];
    for (let image in this.venueobject.cuisineimage_set){
      this.venueobject.cuisineimage_set[image].order = +image+1;
      const imagepk = this.venueobject.cuisineimage_set[image].id;
      const payload = {
        imageurl: this.venueobject.cuisineimage_set[image].imageurl,
        venue: this.venueobject.cuisineimage_set[image].venue,
        key: this.venueobject.cuisineimage_set[image].key,
        order: this.venueobject.cuisineimage_set[image].order
      };
      this.awsservice.cuisineimageupdate(imagepk, payload)
        .subscribe(
          (req: any)=>{
            this.venuevollyservice.sendobject(this.venueobject);
          });
    }

  }


  ngOnInit() {
    this.venuevolleyservicevar = this.venuevollyservice.receiveobject()
      .subscribe(
        (req: any)=> {
          if(req !== null){
            this.venueobject = req;
          }
        });

    // sort by order(numeric value) value in ascending order
    this.venueobject.cuisineimage_set.sort((a, b) => (a.order) - (b.order));

    // sort by key(string value) value in ascending order
    // this.venueobject.venueimage_set.sort((a, b) => ((a.key) < (b.key) ? -1 : ((a.key) > (b.key) ? 1 : 0)));

  }

  ngOnDestroy() {
    this.venuevolleyservicevar.unsubscribe();
  }

}

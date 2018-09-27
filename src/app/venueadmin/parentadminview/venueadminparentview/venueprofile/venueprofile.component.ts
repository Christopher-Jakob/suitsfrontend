import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VenueAdminProfileService} from '../../../../services/venueadmin/venueadminprofileservice/venueadmin.profile.service';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {VenueAdminProfileDependancyService} from '../../../../services/pagedependancy/venueadmin/profile/venueadmin.profile.dependancy.service';
import {VenueAdminVolleyService} from "../../../../services/venueadmin/venueadminvolleyservice/venueadmin.volley.service";
import {VenueAdminParentAdminService} from "../../../../services/venueadmin/venueadminparentadminservice/venueadmin.parentadmin.service";
import {VenueAdminInceptionService} from "../../../../services/venueadmin/venueadmininceptionservice/venueadmin.inception.service";
import {AwsService} from "../../../../services/amazonwebservice services/aws.services";
import {EmailService} from "../../../../services/emailservice/email.service";


@Component({
  selector: 'app-venueprofile',
  templateUrl: './venueprofile.component.html',
  styleUrls: ['./venueprofile.component.scss'],
  providers: [VenueAdminProfileService, VenueAdminProfileDependancyService, EmailService],
})
export class VenueprofileComponent implements OnInit, OnDestroy {
  parentadminservicevar;
  venuevolleyservicevar;
  permission = null;
  venueid = null;
  venuename = null;
  venueupdatesucess = false;
  venueattributes = {
    venuetype: [],
    cuisine: [],
    experientialtype: []
  };


  constructor( private profileservice: VenueAdminProfileService, private route: ActivatedRoute, private dependancyservice: VenueAdminProfileDependancyService, private router: Router, private venuevollyservice: VenueAdminVolleyService, private awsservice: AwsService, private parentadminservice: VenueAdminParentAdminService, private inceptionservice: VenueAdminInceptionService, private emailservice: EmailService ) { }

  // venueobject used to render page
  venueobject ={
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
    tour360url : '',
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
      pk : null,
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
    pricerating: '',
    experientialtype: ''
  };


  //display venue image code
  showphotoupload = false;
  showphotos = false;
  venueimagearray = []; // not sure what this is used for


  //venue photo display upload toggle
  venuephotodisplaytoggle(){
    this.showphotoupload = true;
    this.showphotos = false;
  }

  //display venue photos
  venuephotoshowtoggle(){
    this.showphotos = true;
  }


  // add venue photo form
  choicesload = false; // <-- boolean to show loading circle
  @ViewChild('venuephotoform') venuephotoform: NgForm;
  addvenuephotos(event){
    this.choicesload = true;
    const submittedimage = event.target.files[0];
    const  payload = {};
    this.awsservice.venuephotocreateandpolicy(this.venueobject.id, payload)
      .subscribe(
        (req: any)=>{
          console.log('this is the venue image policy request');
          console.log(req);
          const databasekey = req.fields.key;
          const databaseurl = req.uriroot + databasekey;
          const venueimagepk = req.venueimagepk;
          const venuepk = req.venuepk;
          let fd = new FormData();
          fd.append('acl', req.fields.acl);
          fd.append('key', req.fields.key);
          fd.append('content-type', req.fields['content-type']);
          fd.append('policy', req.fields.policy);
          fd.append('x-amz-algorithm', req.fields['x-amz-algorithm']);
          fd.append('x-amz-credential', req.fields['x-amz-credential']);
          fd.append('x-amz-date', req.fields['x-amz-date']);
          fd.append('x-amz-signature', req.fields['x-amz-signature']);
          fd.append('file', submittedimage);
          this.awsservice.uploadtos3(req.url, fd)
            .subscribe(
              (req: any)=>{
                console.log('this is the start upload to s3 request');
                console.log(req);
                this.showphotoupload = false;
                const payload = {
                  venue: venuepk,
                  order: this.venueobject.venueimage_set.length+1,
                  key: databasekey,
                  imageurl: databaseurl
                };
                this.awsservice.updatevenuephotoinstance(venueimagepk, payload)
                  .subscribe(
                    (req: any)=>{
                      console.log('this is the update the venue instance request');
                      console.log(req);
                      this.venueobject.venueimage_set.push(req);
                      console.log(this.venueobject);
                      this.venuevollyservice.sendobject(this.venueobject);
                      this.choicesload = false;
                      this.showphotos = true;
                    });
              });
        });

  }

  canceladdphoto(){
    this.showphotoupload = false;
    this.showphotos = true;
  }


  @ViewChild('descriptioninputform') descriptioninputform:NgForm;
  @ViewChild('updateparkingform') updateparkingform: NgForm;
  @ViewChild('venueattributeform') venueattributeform: NgForm;
  @ViewChild('toururlform') toururlform: NgForm;

  updatevenue(){
    let payload = {
      description: this.descriptioninputform.form.value.descriptioninput,
      name: this.venueobject.name,
      city: this.venueobject.city,
      streetaddress1: this.venueobject.streetaddress1,
      state: this.venueobject.state,
      tour360url: this.toururlform.form.value.tour360url,
      zipcode: this.venueobject.zipcode,
      phonenumber: this.venueobject.phonenumber,
      venuecontactname: this.venueobject.venuecontactname,
      venuecontactjobtitle: this.venueobject.venuecontactjobtitle,
      venuecontactemail: this.venueobject.venuecontactemail,
      valetparking: this.updateparkingform.form.value.valetparkingcheckbox,
      valetparkingamount: this.updateparkingform.form.value.valetprice,
      onsiteparking: this.updateparkingform.form.value.onsitecheckbox,
      isexperiential: this.experientialshow,
      isrestaurant: this.cuisineshow,
      cuisine1: null,
      cuisine2: null,
      pricerating: +this.venueattributeform.form.value.pricerating,
      experientialtype: null,
      venuetype: this.venueattributeform.form.value.venuetypeselect
    };

    if(payload.tour360url != null){
      this.linksubmitted = true;
      setTimeout(()=>{
        this.linksubmitted = false;
      }, 3000);
    }

    if(this.venueattributeform.form.value.cuisineselect1 != null){
      payload.cuisine1 = this.venueattributeform.form.value.cuisineselect1;
    }
    if(this.venueattributeform.form.value.cuisineselect2 != null){
      payload.cuisine2 = this.venueattributeform.form.value.cuisineselect2;
    }
    if(this.venueattributeform.form.value.experientialtypeselect != null){
      payload.experientialtype = this.venueattributeform.form.value.experientialtypeselect;
    }

    this.profileservice.venueprofileupdate(payload, this.venueobject.id)
      .subscribe(
        (req: any)=>{
          this.venueupdatesucess = true;
          this.venueupdatesucess = false;
          this.venueobject = req;
          this.venuevollyservice.sendobject(this.venueobject);
          this.venuevollyservice.sendupdated();


        }
      );

  }

  // description character count function
  descriptioncount = 0;
  descriptioncountshow = false;
  descriptionerror = false;
  descriptioncounter(){
    this.descriptioncountshow = true;
    let maxcount = 4000;
    let count = this.descriptioninputform.form.value.descriptioninput.length;
    this.descriptioncount = count;
    if(count > maxcount){
      this.descriptionerror = true;
    }

  }



  // sample menu upload
  showsamplemenuupload = false;
  samplemenudeletesucess = false;
  showpdfviewer = false;

  activatesamplemenuupload(){
    this.showsamplemenuupload = true;
  }
  notpdf = false;
  @ViewChild('samplemenuform') samplemenuform: NgForm;
  samplemenuupload(event){
    let submittedpdfs = null;
    submittedpdfs = event.target.files[0];
    console.log('this is the submitted pdf stuff');
    console.log(submittedpdfs);
    if(submittedpdfs.type != "application/pdf"){
      this.notpdf = true;
      submittedpdfs = null;
      setTimeout(()=>{
        this.notpdf = false;
        this.showsamplemenuupload = false;
      }, 3000);
      return 0;

    }
    const pdfname = this.samplemenuform.form.value.pdfnameinput;

    // need to set up a check to make sure file is valid
    const payload = {
      venue: this.venueobject.id
    };
    this.awsservice.samplemenucreateandpolicy(this.venueobject.id,payload)
      .subscribe(
        (req:any)=> {
          const samplemenuobjectpk = req.samplemenupk;
          const venuepk = req.venuepk;
          let content = submittedpdfs;
          const databasekey = req.fields.key;
          const uriroot = req.uriroot;
          let fd = new FormData();
          fd.append('acl', req.fields.acl);
          fd.append('key', req.fields.key);
          fd.append('content-type', req.fields['content-type']);
          fd.append('Policy', req.fields.policy);
          fd.append('x-amz-algorithm',req.fields["x-amz-algorithm"]);
          fd.append('x-amz-credential',req.fields["x-amz-credential"]);
          fd.append('x-amz-date', req.fields["x-amz-date"]);
          fd.append('x-amz-signature', req.fields["x-amz-signature"]);
          fd.append('file', content);
          this.awsservice.uploadtos3(req.url,fd)
            .subscribe(
              (req: any)=>{
                const payload ={
                  venue: venuepk,
                  key: databasekey,
                  name: pdfname,
                  menupdfuri: uriroot + databasekey
                };
                this.awsservice.updatesamplemenuinstance(samplemenuobjectpk, payload)
                  .subscribe(
                    (req: any)=>{
                      this.samplemenuinputshow = false;
                      this.showsamplemenuupload = false;
                      this.venueobject.venuesamplemenu_set.push(req);
                      this.venuevollyservice.sendobject(this.venueobject);
                    });
              });
        });
    this.samplemenuform.reset();

  }

  samplemenuinputshow = false;
  showsamplemenuinput(form:NgForm){
    let displaytitle = form.value.pdfnameinput;
    if(displaytitle != ''){
      this.samplemenuinputshow = true;
    }
    if(displaytitle == ''){
      this.samplemenuinputshow = false;
    }

  }

  deletesamplemenu(index){
    const pk = this.venueobject.venuesamplemenu_set[index].id;
    this.awsservice.deletesamplemenuinstace(pk)
      .subscribe(
        (req: any)=>{
          this.venueobject.venuesamplemenu_set.splice(+index,1);
          this.venuevollyservice.sendobject(this.venueobject);
          this.samplemenudeletesucess = true;
        });
  }

  // cuisine photos
  showcuisineupload = false;
  showcuisinephotos = false;

  cuisinephototoggle(){
    this.showcuisinephotos = true;
    this.showcuisineupload = false;
  }

  cuisineuploadtoggle(){
    this.showcuisineupload = !this.showcuisineupload;
    this.showcuisinephotos = false;
  }
  addcuisinephoto(event){
    let submittedimage = event.target.files[0];
    // payload is empty just to keep the post html happy
    const payload = {};
    this.awsservice.cuisineimagecreateandpolicy(this.venueobject.id, payload)
      .subscribe(
        (req: any)=>{
          const cuisineimagepk = req.cuisineimagepk;
          const venuepk = req.venuepk;
          const databasekey = req.fields.key;
          const uriroot = req.uriroot;
          let fd = new FormData();
          fd.append('acl', req.fields.acl);
          fd.append('key', req.fields.key);
          fd.append('content-type', req.fields['content-type']);
          fd.append('Policy', req.fields.policy);
          fd.append('x-amz-algorithm',req.fields["x-amz-algorithm"]);
          fd.append('x-amz-credential',req.fields["x-amz-credential"]);
          fd.append('x-amz-date', req.fields["x-amz-date"]);
          fd.append('x-amz-signature', req.fields["x-amz-signature"]);
          fd.append('file', submittedimage);
          this.awsservice.uploadtos3(req.url, fd)
            .subscribe(
              (req: any)=>{
                const payload = {
                  venue: venuepk,
                  key: databasekey,
                  imageurl: uriroot + databasekey,
                  order: this.venueobject.cuisineimage_set.length + 1
                };
                this.awsservice.cuisineimageupdate(cuisineimagepk, payload)
                  .subscribe(
                    (req: any)=>{
                      this.showcuisineupload = false;
                      this.venueobject.cuisineimage_set.push(req);
                      this.venuevollyservice.sendobject(this.venueobject);
                      this.cuisinephototoggle();
                    });
              });

        });

  }



  // venue attributes
  cuisineshow = false;
  showcuisine2 = false;
  experientialshow = false;

  experientialclick(){
    this.experientialshow = !this.experientialshow;
    this.updatevenue();
  }
  restaurantclick(){
    this.cuisineshow = !this.cuisineshow;
    this.updatevenue();
  }
  activatecuisine2(){
    this.showcuisine2 = true;
  }

  // virtual tours
  linksubmitted = false;
  contactmass = false;

  showmasscontact(){
    this.contactmass = !this.contactmass;
  }

  removetour(){
    let payload = {
      tour360url: null
    };
    this.profileservice.venueprofileupdate(payload, this.venueobject.id)
      .subscribe(
        (req: any)=>{
          this.venueupdatesucess = true;
          this.venueupdatesucess = false;
          this.venueobject = req;
          this.venuevollyservice.sendobject(this.venueobject);
          this.venuevollyservice.sendupdated();

        }
      );


  }
  messagesent = false;
  emailmassinteract(form:NgForm){
    const payload = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      squarefeet: form.value.squarefeet,
      venuename: this.venueobject.name,
      address: this.venueobject.streetaddress1 + ' ' + this.venueobject.city + ', ' + this.venueobject.state

    };

    this.emailservice.emailmassinteract(payload)
      .subscribe(
        (req: any)=>{
          this.messagesent = true;
          setTimeout(()=>{
            this.messagesent = false;
            this.showmasscontact();
          }, 3000);

        }
      );

  }

  ngOnInit(){
    window.scrollTo(0,0);
    this.inceptionservice.sendsignal('venuepage');
    this.parentadminservicevar = this.parentadminservice.receivepermission()
      .subscribe(
        (req:any)=>{
          if(req !== null){
            this.permission = req;
          }
        });

    this.venuevolleyservicevar = this.venuevollyservice.receiveobject()
      .subscribe(
        (req: any)=> {
          if(req !== null){
            this.venueobject = req;
            console.log('this is the received venueobject');
            console.log(this.venueobject);
            if(this.venueobject.isexperiential){
              this.experientialshow = true;
            }
            if(this.venueobject.isrestaurant){
              this.cuisineshow = true;
              this.showcuisine2 = true;

            }
          }

        });

    this.dependancyservice.getvenueattributeselections()
      .subscribe(
        (req: any)=> {
          this.venueattributes.venuetype = req.venuetype;
          this.venueattributes.cuisine = req.cuisine;
          this.venueattributes.experientialtype = req.experientialtype;
        });


  } // end ngoninit

  ngOnDestroy(){
    this.venuevolleyservicevar.unsubscribe();
    this.parentadminservicevar.unsubscribe();
  }

}

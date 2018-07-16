import {Component, ViewChild, OnDestroy, OnInit, ElementRef, ChangeDetectorRef} from '@angular/core';
import {ModalToggleService} from '../../services/pagemixins/modeltoggleservice/modaltoggle.service';
import {Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserAuthorizationService} from "../../services/userservice/userauthorizationservice/userauthorizationservice";
import {NgForm} from "@angular/forms";
import {ForgotPasswordService} from "../../services/userservice/forgotpasswordservice/forgotpasswordservice";
import {ClientUserService} from "../../services/userservice/clientuserservice/clientuserservice";
import {VenueService} from "../../services/venueservice/venueservice";
import {LandingpageDependancyService} from "../../services/mainroot/landingpage/LandingpageDependancyService";
import {BrowsevenuescomponentcommService} from "../../services/browsevenueservice/browsevenuescommservice/browsevenuescomponentcomm.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[ForgotPasswordService,  ClientUserService, VenueService, LandingpageDependancyService]
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private modalservice: ModalToggleService, private router: Router, private userservice: UserAuthorizationService, private modalService: NgbModal, private forgotpasswordservice: ForgotPasswordService, private clientservice: ClientUserService, private venueservice: VenueService, private citydependancy: LandingpageDependancyService, private navbarcomm : BrowsevenuescomponentcommService) { }


  //user service subscription variable
  userservicevar;
  sucessfullsigninvar;
  isCollapsed = true;
  cities = [];
  selectedcity = "";
  selectedcityvar;
  statevar;
  showbrowse = true;

  // code to send the selected city
  sendcity(){
    this.navbarcomm.setselectedcity(this.selectedcity);
    this.router.navigate(['/browse', this.selectedcity]);
  }

  // boolean to determine if the make rfp model should be displayed
  user = {
    name: null,
    id: null,
    isclient: false,
    isvenueuser: false,
    issuitsadministrator: false,
    issuitssuperuser: false,
    issuitsviewer: false
  };
  signedin = false;
  isadmin = true;
  issuitsadmin = false;

  //navigate to admin code
  navigatetopermission(){
    if(this.user.isclient){
      this.router.navigate(['/dashboard','client',this.user.id]);
    }
    if(this.user.isvenueuser){
      this.router.navigate(['/admin','venue']);
    }
    if(this.user.issuitsadministrator || this.user.issuitssuperuser || this.user.issuitsviewer ){
      this.router.navigate(['/suitsadmin']);
    }
  }

  city;
  //sign in modal code
  @ViewChild('signinform') signinform: NgForm;
  signin(form:NgForm) {
    let payload = {
      email: form.value.signinemail,
      password: form.value.signinpassword,
      localstorage: true
    };
    if(form.value.remembercheckbox == ''){
      payload.localstorage = false;
    }
    this.userservice.gettoken(payload);
    this.signedin = true;
  }

  toggleMenu()
  {
    this.isCollapsed = !this.isCollapsed;
  }

  signout(){
    this.signedin = false;
    this.user = {
      id: null,
      name: null,
      isclient: false,
      isvenueuser: false,
      issuitsadministrator: false,
      issuitssuperuser: false,
      issuitsviewer: false
    };
    this.userservice.logout();
  }
  showsigninerror = false;
  signinerrorreset(){
    this.showsigninerror = false;

  }

  // password reset form
  showpasswordreset = false;
  emailsent = false;

  togglepassword(){
    this.showpasswordreset = !this.showpasswordreset;
  }

  forgotpassword(form:NgForm){
    const payload = {
      email: form.value.passwordresetemail
    };
    this.forgotpasswordservice.forgotpassword(payload)
      .subscribe(
        (req: any)=>{
          this.emailsent = true;
        }
      );
  }

  //client signup
  clientsignupconfrim = false;
  passwordmismatch = false;
  emailmismatch = false;

  checkpassword(form:NgForm){
    this.passwordmismatch = false;
    if(form.value.clientpassword != form.value.clientconfrimpassword){
      this.passwordmismatch = true;
    }
  }

  checkemail(form:NgForm){
    this.emailmismatch = false;
    if(form.value.clientemail != form.value.clientemailconfrim){
      this.emailmismatch = true;
    }
  }
  clientsignup(form:NgForm){
    if(!this.passwordmismatch){
      if(!this.emailmismatch){
        const payload = {
          name: form.value.clientfirstname + ' ' + form.value.clientlastname,
          email: form.value.clientemail,
          password: form.value.clientpassword,
          company: form.value.clientcompany,
          phone: form.value.clientphonenumber,
          city: form.value.clientcity,
          state: form.value.clientstate,
          contactname: form.value.venuecontactname,

        };
        if(form.valid){
          this.clientservice.createclientuser(payload)
            .subscribe(
              (req: any)=>{
                this.clientsignupconfrim = true;
              }
            );
        }
      }
    }
  }

  //venue signup

  hovertext = false;
  signupcompelete = false;

  togglehovertext(){
    this.hovertext = !this.hovertext;
  }


  createvenue(form:NgForm){
    let payload = {
      name: form.value.venuename,
      streetaddress1: form.value.venueaddress1,
      streetaddress2: form.value.venueaddress2,
      city: form.value.city,
      state: form.value.venuestateselect,
      venuephone: form.value.venuephone,
      venuecontactname: form.value.venuecontactname,
      venuecontactjobtitle: form.value.venuejobtitle,
      venuecontactemail: form.value.venueemail,
      phonenumber: form.value.venuephone,
      hearaboutus: form.value.hearaboutus
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
  @ViewChild('closeModal') closeModal: ElementRef;

  ngOnInit() {

    this.selectedcityvar = this.navbarcomm.receiveselectedcity()
      .subscribe(
        (req: any)=>{
          this.selectedcity = req;
        }
      );

    this.statevar = this.navbarcomm.receivestate()
      .subscribe(
        (req: any)=>{
          if(req ==='show'){
            this.showbrowse = true;
          }
          if(req ==='unshow'){
            this.showbrowse = false;
          }
        }
      );

    this.userservicevar = this.userservice.receiveuser()
      .subscribe(
        (req: any)=>{
          if(req != null){
            this.user = req;
            if(req.id === null){
              this.signedin = false;
            }else{
              this.signedin = true;
              if(this.user.isvenueuser){
                //this.router.navigate(['/admin','venue','venue-list']);
              }
            }
          }
        }
      );

    this.citydependancy.getsearchcitylist()
      .subscribe(
        (req: any)=>{
          this.cities = req;
          this.cities.sort((a, b) => ((a.city) < (b.city) ? -1 : ((a.city) > (b.city) ? 1 : 0)));
        }
      );


    this.sucessfullsigninvar = this.userservice.receivesendvalid()
      .subscribe(
        (req: any)=>{
          if(req != null){
            if(req){
              if(this.closeModal != null){
                this.closeModal.nativeElement.click();
              }

            }
            if(!req){
              this.showsigninerror = true;
            }
          }
        });

  }

  ngOnDestroy(){
    this.userservicevar.unsubscribe();
    this.selectedcityvar.unsubscribe();
    this.sucessfullsigninvar.unsubscribe();
    this.statevar.unsubscribe();

  }

}

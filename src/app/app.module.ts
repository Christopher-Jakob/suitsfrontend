import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {VenueService} from './services/venueservice/venueservice';
import { AppComponent } from './app.component';
import { BrowsevenuesrootComponent } from './mainroot/browsevenues/browsevenuesroot/browsevenuesroot.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { MapviewComponent } from './mainroot/browsevenues/mapview/mapview.component';
import { VenuelistComponent } from './mainroot/browsevenues/venuelist/venuelist.component';
import { HowitworksComponent } from './mainroot/howitworks/howitworks.component';
import { LandingpageComponent } from './mainroot/landingpage/landingpage.component';
import { NavbarComponent } from './mainroot/navbar/navbar.component';
import { RoompageComponent } from './mainroot/roompage/roompage.component';
import { ParentadminviewComponent } from './venueadmin/parentadminview/parentadminview.component';
import { AdminnavbarComponent } from './venueadmin/parentadminview/adminnavbar/adminnavbar.component';
import { AdminnavigationComponent } from './venueadmin/parentadminview/adminnavigation/adminnavigation.component';
import { VenuepageComponent } from './mainroot/venuepage/venuepage.component';
import { VenueadminpageComponent } from './venueadmin/parentadminview/venueadminpage/venueadminpage.component';
import { VenuecreateeditComponent } from './venueadmin/parentadminview/venueadminparentview/venuecreateedit/venuecreateedit.component';
import { VenueuserprofileComponent } from './venueadmin/parentadminview/venueuserprofile/venueuserprofile.component';
import { VenueprofileComponent } from './venueadmin/parentadminview/venueadminparentview/venueprofile/venueprofile.component';
import { TabandtitleviewComponent } from './venueadmin/parentadminview/venueadminparentview/pagemixins/tabandtitleview/tabandtitleview.component';
import { VenueadminparentviewComponent } from './venueadmin/parentadminview/venueadminparentview/venueadminparentview.component';
import { SuitsandtablesadminComponent } from './suitsandtablesadmin/suitsandtablesadmin.component';
import { SuitsnavigationComponent } from './suitsandtablesadmin/suitsnavigation/suitsnavigation.component';
import { SuitsnavbarComponent } from './suitsandtablesadmin/suitsnavbar/suitsnavbar.component';
import { SuitsnewvenueapplicationsComponent } from './suitsandtablesadmin/suitsnewvenueapplications/suitsnewvenueapplications.component';
import { SuitsgroupsandvenuesComponent } from './suitsandtablesadmin/suitsgroupsandvenues/suitsgroupsandvenues.component';
import { SuitsclientusersComponent } from './suitsandtablesadmin/suitsclientusers/suitsclientusers.component';
import { SuitssuitstablesusersComponent } from './suitsandtablesadmin/suitssuitstablesusers/suitssuitstablesusers.component';
import { SuitsvenuesComponent } from './suitsandtablesadmin/suitsvenues/suitsvenues.component';
import { SuitsdeclinedapplicationsComponent } from './suitsandtablesadmin/suitsdeclinedapplications/suitsdeclinedapplications.component';
import { SuitssettingsComponent } from './suitsandtablesadmin/suitssettings/suitssettings.component';
import { ClientadminnavigationComponent } from './mainroot/clientadmin/clientadminnavigation/clientadminnavigation.component';
import { ClientprofileComponent } from './mainroot/clientadmin/clientprofile/clientprofile.component';
import { TeamComponent } from './mainroot/team/team.component';
import { MainrootComponent } from './mainroot/mainroot.component';
import { FooterComponent } from './mainroot/footer/footer.component';
import { PrivacyComponent } from './mainroot/privacy/privacy.component';
import { TermsComponent } from './mainroot/terms/terms.component';
import { HttpClientModule} from '@angular/common/http';
import {ModalToggleService} from './services/pagemixins/modeltoggleservice/modaltoggle.service';
import { VenueapplicationreviewComponent } from './suitsandtablesadmin/venueapplicationreview/venueapplicationreview.component';
import { VenueadminactualComponent } from './venueadmin/parentadminview/venueadminparentview/venueadminactual/venueadminactual.component';
import { VenueadminroomrootComponent } from './venueadmin/parentadminview/venueadminparentview/venueadminroomroot/venueadminroomroot.component';
import {VenueroomadminpageComponent} from "./venueadmin/parentadminview/venueadminparentview/venueadminroomroot/venueroomadminpage/venueroomadminpage.component";
import {VenueadminroomlistComponent} from "./venueadmin/parentadminview/venueadminparentview/venueadminroomroot/venueadminroomlist/venueadminroomlist.component";
import { ClientprofiledeletesuccessComponent } from './mainroot/clientadmin/clientprofiledeletesuccess/clientprofiledeletesuccess.component';
import {VenueAdminParentAdminService} from "./services/venueadmin/venueadminparentadminservice/venueadmin.parentadmin.service";
import {SuitssuitsuserprofileComponent} from './suitsandtablesadmin/suitssuitsuserprofile/suitssuitsuserprofile.component';
import { SuitsdeclinedapplicationdetailComponent } from './suitsandtablesadmin/suitsdeclinedapplicationdetail/suitsdeclinedapplicationdetail.component';
import {VenueAdminInceptionService} from "./services/venueadmin/venueadmininceptionservice/venueadmin.inception.service";
import {AwsService} from "./services/amazonwebservice services/aws.services";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import { LandingjoinComponent } from './mainroot/landingjoin/landingjoin.component';
import { LandingvenueComponent } from './mainroot/landingvenue/landingvenue.component';
import { DraggableModule } from './draggable/draggable.module';

import { UservenueverificaitonComponent } from './verification/uservenueverificaiton/uservenueverificaiton.component';
import {UserAuthorizationService} from "./services/userservice/userauthorizationservice/userauthorizationservice";
import {SuitsGuard} from "./services/userservice/authguardservices/issuitsuserguard";
import {ClientSuitsAdminSuperUserGuard} from "./services/userservice/authguardservices/isclientsuitsadminsuperuserguard";
import { Unauthorized401Component } from './mainroot/unauthorized401/unauthorized401.component';
import { SigninpageComponent } from './mainroot/signinpage/signinpage.component';
import {VenueSuitsAdminSuperUserGuard} from "./services/userservice/authguardservices/isvenuesuitsadminsuperuserguard";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {TokenInterceptor} from "./services/httpinterceptors/authtokeninterceptor";
import { ResetpasswordComponent } from './mainroot/resetpassword/resetpassword.component';
import { VenueshowphotosComponent } from './venueadmin/parentadminview/venueadminparentview/venueprofile/venueshowphotos/venueshowphotos.component';
import { VenuesignupageComponent } from './mainroot/landingvenue/venuesignupage/venuesignupage.component';
import { VenueroomshowphotosComponent } from './venueadmin/parentadminview/venueadminparentview/venueadminroomroot/venueroomadminpage/venueroomshowphotos/venueroomshowphotos.component';
import {IsNotVenueUserGuard} from "./services/userservice/authguardservices/isnotvenueuserguard";
import {ClientadminComponent} from "./mainroot/clientadmin/clientadmin.component";
import { SigninComponent } from './pagemixins/modals/signin/signin.component';
import { SuitsvenueusersComponent } from './suitsandtablesadmin/suitsvenueusers/suitsvenueusers.component';
import { ContactusComponent } from './mainroot/contactus/contactus.component';
import { SentrfpsComponent } from './mainroot/clientadmin/sentrfps/sentrfps.component';
import { ReceivedrfpsComponent } from './venueadmin/parentadminview/receivedrfps/receivedrfps.component';
import { PreviewvenueComponent } from './mainroot/previewvenue/previewvenue.component';
import { PreviewvenueroomComponent } from './mainroot/previewvenueroom/previewvenueroom.component';
import {ClientUserService} from "./services/userservice/clientuserservice/clientuserservice";


const appRoutes: Routes = [
  {path: '', component: MainrootComponent,
    children:[
      {path: '', canActivate: [IsNotVenueUserGuard], component: LandingpageComponent},
      {path: 'join',  canActivate: [IsNotVenueUserGuard], component: LandingjoinComponent},
      {path: 'partner',  canActivate: [IsNotVenueUserGuard], component: LandingvenueComponent},
      {path: 'venuesignup',  canActivate: [IsNotVenueUserGuard], component: VenuesignupageComponent},
      {path: '401', component: Unauthorized401Component},
      {path: 'signin',  canActivate: [IsNotVenueUserGuard], component: SigninpageComponent},
      {path: 'team',  canActivate: [IsNotVenueUserGuard], component: TeamComponent},
      {path: 'privacy', component: PrivacyComponent},
      {path: 'terms', component: TermsComponent},
      {path: 'contact', component: ContactusComponent},
      {path: 'browse/:city',  canActivate: [IsNotVenueUserGuard], component: BrowsevenuesrootComponent},
      {path: 'how-it-works', canActivate: [IsNotVenueUserGuard], component: HowitworksComponent},
      {path: 'venue/:name', canActivate: [IsNotVenueUserGuard], component: VenuepageComponent},
      {path: 'venue/:name/:room', canActivate: [IsNotVenueUserGuard], component: RoompageComponent},
      {path: 'preview/venue/:name', component: PreviewvenueComponent },
      {path: 'preview/venue/:name/:room', component: PreviewvenueroomComponent},
      {path: 'dashboard/:permission/:pk', canActivate: [ClientSuitsAdminSuperUserGuard], component: ClientadminComponent,
        children:[
          {path: 'profile', component: ClientprofileComponent},
          {path: 'rfps', component: SentrfpsComponent },
        ]},
      {path: 'client-profile-deleted', component: ClientprofiledeletesuccessComponent},
      {path: 'user/forgot-password/validate/:resetstring', component: ResetpasswordComponent},
      {path: 'user/:type/validate/:verificationstring', component: UservenueverificaitonComponent},

    ]},
  {path: 'suitsadmin', canActivate: [SuitsGuard], component: SuitsandtablesadminComponent,
    children:[
      {path: '', component: SuitsnewvenueapplicationsComponent},
      {path: 'groups-and-venues', component: SuitsgroupsandvenuesComponent},
      {path: 'client-users', component: SuitsclientusersComponent},
      {path: 'venue-users', component: SuitsvenueusersComponent},
      {path: 'suits-users', component: SuitssuitstablesusersComponent},
      {path: 'suits-users/:pk', component: SuitssuitsuserprofileComponent},
      {path: 'venues', component: SuitsvenuesComponent},
      {path: 'venueapplication/:pk', component: VenueapplicationreviewComponent},
      {path: 'declined-venues', component: SuitsdeclinedapplicationsComponent},
      {path: 'declined-venues/:pk', component:  SuitsdeclinedapplicationdetailComponent},
      {path: 'settings', component: SuitssettingsComponent},
    ]},
  {path: 'admin/:permission', canActivate: [VenueSuitsAdminSuperUserGuard], component: ParentadminviewComponent,
    children:[
      {path: 'user-profile/:pk', component: VenueuserprofileComponent},
      {path: 'venue-list', component: VenueadminparentviewComponent,
        children:[
          {path: '', component: VenueadminpageComponent},
        ]},
      {path: 'venue-admin/:venuename/:pk', component: VenueadminactualComponent,
        children:[
          {path: 'profile', component: VenueprofileComponent },
          {path: 'venuepage', component: VenuecreateeditComponent},
          {path: 'receivedrfps', component:ReceivedrfpsComponent},
          {path: 'room', component: VenueadminroomrootComponent,
            children:[
              {path: 'list', component: VenueadminroomlistComponent},
              {path: ':pk', component: VenueroomadminpageComponent},
            ]},
        ]},
    ]},

];

@NgModule({
  declarations: [
    AppComponent,
    BrowsevenuesrootComponent,
    MapviewComponent,
    VenuelistComponent,
    HowitworksComponent,
    LandingpageComponent,
    NavbarComponent,
    ClientadminComponent,
    RoompageComponent,
    ParentadminviewComponent,
    AdminnavbarComponent,
    AdminnavigationComponent,
    VenuepageComponent,
    VenueadminpageComponent,
    VenuecreateeditComponent,
    VenueuserprofileComponent,
    VenueprofileComponent,
    TabandtitleviewComponent,
    VenueroomadminpageComponent,
    VenueadminparentviewComponent,
    SuitsandtablesadminComponent,
    SuitsnavigationComponent,
    SuitsnavbarComponent,
    SuitsnewvenueapplicationsComponent,
    SuitsgroupsandvenuesComponent,
    SuitsclientusersComponent,
    SuitssuitstablesusersComponent,
    SuitsvenuesComponent,
    SuitsdeclinedapplicationsComponent,
    SuitssettingsComponent,
    ClientadminComponent,
    ClientadminnavigationComponent,
    ClientprofileComponent,
    TeamComponent,
    MainrootComponent,
    FooterComponent,
    PrivacyComponent,
    TermsComponent,
    VenueapplicationreviewComponent,
    VenueadminactualComponent,
    VenueadminroomlistComponent,
    VenueadminroomrootComponent,
    ClientprofiledeletesuccessComponent,
    SuitssuitsuserprofileComponent,
    SuitsdeclinedapplicationdetailComponent,
    LandingjoinComponent,
    LandingvenueComponent,
    UservenueverificaitonComponent,
    Unauthorized401Component,
    SigninpageComponent,
    ResetpasswordComponent,
    VenueshowphotosComponent,
    VenuesignupageComponent,
    VenueroomshowphotosComponent,
    SigninComponent,
    SuitsvenueusersComponent,
    ContactusComponent,
    SentrfpsComponent,
    ReceivedrfpsComponent,
    PreviewvenueComponent,
    PreviewvenueroomComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SlideshowModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    DraggableModule
  ],
  exports:[RouterModule],
  providers: [VenueService, ModalToggleService, VenueAdminParentAdminService,ClientUserService , VenueAdminInceptionService, AwsService, UserAuthorizationService, ClientSuitsAdminSuperUserGuard, SuitsGuard, VenueSuitsAdminSuperUserGuard, IsNotVenueUserGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

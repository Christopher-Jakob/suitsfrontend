import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SuitsSettingsService} from "../../services/suitsadmin/suitssettingsservice/suitssettings.service";
import {SuitsAdminDependancySettings} from '../../services/pagedependancy/suitsadmin/suitssettings/suitssettings.dependancy.service';



@Component({
  selector: 'app-suitssettings',
  templateUrl: './suitssettings.component.html',
  styleUrls: ['./suitssettings.component.scss'],
  providers: [SuitsSettingsService, SuitsAdminDependancySettings]
})
export class SuitssettingsComponent implements OnInit {


  constructor(private suitsettingsservice: SuitsSettingsService, private suitssettingsdependancyservice : SuitsAdminDependancySettings) {}

  // ########### state settings code ############################################
  choicesload = true;
  activestateindex = null;
  statecitiesactive = false;
  selectedstate;
  selectedstatepk;
  selectstatecity(index){
    const pk = this.states[index].pk;
    this.selectedstate = this.states[index].name;
    this.selectedstatepk = pk;
    this.statecitiesactive = true;
    this.neighborhoodsactivated = false;
    this.selectedcityname = null;
    this.suitsettingsservice.getcitybystate(pk)
      .subscribe(
        (req: any)=>{
          this.cities = req;
        }
      );
  }
  showeditstate = false;
  activateeditstate(index){
    this.showeditstate = true;
    this.activestateindex = index;
  }
  deactivateeditstate(){
    this.showeditstate = false;
    this.activestateindex = null;
  }

  deactivatedeletestate(){
    this.showdeletestate = false;
    this.activestateindex = null;
  }

  showdeletestate = false;
  activatedeletestate(index){
    this.showdeletestate = true;
    this.activestateindex = index;
  }
  states = [];
  @ViewChild('stateform') stateform: NgForm;
  addstate(){
    const payload = {
      name: this.stateform.form.value.addstateinput

    };
    this.suitsettingsservice.addstate(payload)
      .subscribe(
        (req: any)=>{
          this.states.push(req);
          this.stateform.reset();
        });
  }

  @ViewChild('editstateform') editstateform: NgForm;
  editstate(index){
    const pk = this.states[index].pk;
    const payload = {
      name: this.editstateform.form.value.editstateinput
    };
    this.suitsettingsservice.editstate(payload, pk)
      .subscribe(
        (req: any)=>{
          this.states[index] = req;
          this.states.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));
          this.activestateindex = null;
        });
  }
  deletestate(index){
    const pk = this.states[index].pk;
    this.suitsettingsservice.deletestate(pk)
      .subscribe(
        (req: any)=>{
          this.states.splice(+index, 1);
          this.states.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));
        }
      );
  }

  // ########### city settings code ###############################################################################
  activecityindex;

  // ********** add city code *****************************************************************************************
  @ViewChild('addcityform') addcityform: NgForm;
  addsucess = false;
  addedcity;

  addcity(){

    const payload = {
      city: this.addcityform.form.value.addcityinput,
      online: false
    };

    if(this.addcityform.form.value.onlinecheckbox === true){
      payload.online = true;
    }
    this.addedcity = payload.city;
    if(payload.city !== '') {
      this.suitsettingsservice.addcity(payload, this.selectedstatepk)
        .subscribe(
          (req: any) =>{
            this.cities.push(req);
            this.states.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));
            this.addcityform.reset();
          });
    }
  }


  // ********** city list code *************************************************************************************



  cities = [];

  // ******** city edit code ***********************************************************************************************


  showeditcity = false;



  activateeditcity(index){
    this.activecityindex = index;
    this.showeditcity = true;

  }

  deactivateeditcity(){
    this.activecityindex = null;
    this.showeditcity = false;
  }
  @ViewChild('editcityform') editcityform: NgForm;
  editcity(index){
    const payload = {
      city: this.editcityform.form.value.editcityinput,
      online: this.editcityform.form.value.onlineeditcheckbox
    };
    if(payload.online === ''){
      payload.online = false;
    }
    this.suitsettingsservice.editcity(payload, this.cities[index].pk)
      .subscribe(
        (req: any)=>{
          this.cities[index].city = req.city;
          this.cities[index].online = req.online;
          console.log(this.cities);
          this.showeditcity = false;
          this.activecityindex = null;
        }
      );
  }





  // ******** city delete code ********************************************************************************************
  showdeletecity = false;

  activatedeletecity(index){
    this.activecityindex = index;
    this.showdeletecity = true;
  }

  deactivatedeletecity(){
    this.activecityindex = null;
    this.showdeletecity = false;
  }

  deletecity(index){
    const citypk = this.cities[index].pk;
    this.suitsettingsservice.deletecity(citypk)
      .subscribe(
        (req: any)=>{
          this.cities.splice(+index,1);
          this.showdeletecity = false;
          this.activecityindex = null;
          this.neighborhoodsactivated = false;
          this.selectedcityname = null;
        }
      );
  }

  // ***** city select code ****************************************************************************************************
  selectedcityneighborhoods = [];
  selectedcityname;
  selectedcitypk;
  neighborhoodsactivated = false;
  selectcityneighborhood(index){
    this.selectedcityname = this.cities[index].city;
    this.selectedcitypk = this.cities[index].pk;
    this.neighborhoodsactivated = true;
    this.suitsettingsservice.getneighborhoodsbycity(this.selectedcitypk)
      .subscribe(
        (req: any)=>{
          this.selectedcityneighborhoods = req.neighborhoods;
        }
      );
  }
  //########## Neighborhood settings code ########################################################################################
  activeneighborhoodindex = null;

  //*********Add Neighborhood Code **********************************
  neighborhoodaddsucess = false;
  addedneighborhood;

  @ViewChild('addneighborhoodform') addneighborhoodform: NgForm;
  addneighborhood(){
    const payload = {
      city: +this.selectedcitypk,
      neighborhood: this.addneighborhoodform.form.value.addneighborhoodinput
    };
    this.suitsettingsservice.addneighborhood(payload, this.selectedcitypk)
      .subscribe(
        (req: any)=>{
          this.selectedcityneighborhoods.push(req.neighborhood);
          this.addneighborhoodform.reset();
        }
      );
  }

  //********** edit city code *************************************
  showeditneighborhood = false;
  activateeditneighborhood(index){
    this.showeditneighborhood = true;
    this.activeneighborhoodindex = index;

  }
  @ViewChild('editneighborhoodform') editneighborhoodform: NgForm;
  editneighborhood(index){
    const payload = {
      neighborhood: this.editneighborhoodform.form.value.editneighborhoodinput
    };
    const neighborhoodpk = this.selectedcityneighborhoods[index].pk;
    this.suitsettingsservice.editneighborhood(payload, neighborhoodpk)
      .subscribe(
        (req: any)=>{
          this.selectedcityneighborhoods[index] = req;
          this.editneighborhoodform.reset();
          this.showeditneighborhood = false;
          this.activeneighborhoodindex = null;
        }
      );
  }

  deactivateeditneighborhood(){
    this.showeditneighborhood = false;
    this.activeneighborhoodindex = null;
  }

  //********** delete city code*************************************
  showdeleteneighborhood = false;
  selecteddeleteneighborhood;
  activatedeleteneighborhood(index){
    this.showdeleteneighborhood = true;
    this.activeneighborhoodindex = index;
    this.selecteddeleteneighborhood = this.selectedcityneighborhoods[index].neighborhood;
  }

  deactivatedeleteneighborhood(){
    this.showdeleteneighborhood = false;
    this.activeneighborhoodindex = null;
  }

  deleteneighborhood(index){
    const pk = this.selectedcityneighborhoods[index].pk;
    this.suitsettingsservice.deleteneighborhood(pk)
      .subscribe(
        (req: any)=>{
          this.selectedcityneighborhoods.splice(+index,1);
          this.showdeleteneighborhood = false;
          this.activeneighborhoodindex = null;
        }
      );
  }

// ############### Venue Type Code ######################################################################################
  venuetypes = [];

  activevenuetypeindex = null;

  // *************Venue Type Add***********************************************************************************************
  @ViewChild('venuetypeaddform') venuetypeaddform: NgForm;

  venuetypeaddsucess = false;
  addedvenuetype;

  addvenuetype(){
    const payload = {
      type: this.venuetypeaddform.form.value.addvenuetypeinput
    };
    this.suitsettingsservice.addvenuetype(payload)
      .subscribe(
        (req: any)=>{
          this.venuetypes.push(req);
          this.addedvenuetype = req.type;
          this.venuetypeaddsucess = true;
          this.venuetypes.sort((a, b) => ((a.type) < (b.type) ? -1 : ((a.type) > (b.type) ? 1 : 0)));
          this.venuetypeaddform.reset();
        });
  }





  // ************Venue Type Edit***********************************************************************************************
  @ViewChild('editvenuetypeform') editvenuetypeform: NgForm;
  activevenuetypeedit = false;
  oldvenuetype;
  newvenuetype;
  venuetypeeditsucess = false;

  activatevenuetypeedit(index){
    this.activevenuetypedelete = false;
    this.activevenuetypeedit = true;
    this.activevenuetypeindex = index;
  }

  deactivatevenuetypeedit(){
    this.activevenuetypeedit = false;
    this.activevenuetypeindex = null;
  }

  editvenuetype(index){
    this.oldvenuetype = this.venuetypes[index].venuetype;
    const pk = this.venuetypes[index].pk;
    const payload = {
      type: this.editvenuetypeform.form.value.editvenuetypeinput
    };
    this.suitsettingsservice.editvenuetype(payload, pk)
      .subscribe(
        (req: any)=> {
          this.venuetypes[index] = req;
          this.venuetypes.sort((a, b) => ((a.type) < (b.type) ? -1 : ((a.type) > (b.type) ? 1 : 0)));
          this.newvenuetype = payload.type;
          this.venuetypeeditsucess = true;
          this.activevenuetypeedit = false;
          this.activevenuetypeindex = null;
        });
  }


  // ************Venue Type Delete*********************************************************************************************
  activevenuetypedelete = false;


  activatevenuetypedelete(index){
    this.activevenuetypeedit = false;
    this.activevenuetypedelete = true;
    this.activevenuetypeindex = index;

  }

  deactivatevenuetypedelete(){
    this.activevenuetypedelete = false;
    this.activevenuetypeindex = null;

  }

  deletevenuetype(index){
    const pk = this.venuetypes[index].pk;

    this.suitsettingsservice.deletevenuetype(pk)
      .subscribe(
        (req: any)=>{
          this.venuetypes.splice(+index, 1);
          this.venuetypes.sort((a, b) => ((a.type) < (b.type) ? -1 : ((a.type) > (b.type) ? 1 : 0)));
          this.activevenuetypedelete = false;
          this.activevenuetypeindex = null;

        });
  }


  // ########### Cuisine settings input ######################################################################################
  activecuisineindex = null;

  // ********** add cuisine code ********************************************************************************************
  @ViewChild('addcuisineform') addcuisineform: NgForm;
  addedcuisine;
  cuisines = [];

  addcuisine(){
    const payload ={
      name: this.addcuisineform.form.value.addcuisineinput
    };
    this.suitsettingsservice.addcuisine(payload)
      .subscribe(
        (req: any)=> {
          this.cuisines.push(req);
          this.addedcuisine = req.name;
          this.cuisines.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));
          this.addcuisineform.reset();
        });
  }

  // ********** edit cuisine code *******************************************************************************************
  @ViewChild('cuisineeditform') cuisineeditform: NgForm;
  showeditcuisine = false;


  activatecuisineedit(index){
    this.showdeletecuisine = false;
    this.activecuisineindex = index;
    this.showeditcuisine = true;
  }

  deactivateeditcuisine(){
    this.showeditcuisine = false;
    this.activecuisineindex = null;
  }

  editcuisine(index){
    const pk = this.cuisines[index].pk
    const payload = {
      name: this.cuisineeditform.form.value.editcuisineinput,
    };
    this.suitsettingsservice.editcuisine(payload, pk)
      .subscribe(
        (req: any) =>{
          this.cuisines[index].name = req.name;
          this.cuisines.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));
          this.showeditcuisine = false;
          this.activecuisineindex = null;
        });
  }

  // ********** delete cuisine code *****************************************************************************************
  showdeletecuisine = false;
  selecteddeletecuisine;
  cuisinedeletesucess = false;

  activatecuisinedelete(index){
    this.showeditcuisine = false;
    this.showdeletecuisine = true;
    this.activecuisineindex = index;
    this.selecteddeletecuisine = this.cuisines[index].name;
  }

  deactivatecuisinedelete(){
    this.activecuisineindex = null;
    this.showdeletecuisine = false;
  }

  deletecuisine(index){
    const pk = this.cuisines[index].pk;
    this.suitsettingsservice.deletecuisine(pk)
      .subscribe(
        (req: any)=>{
          this.cuisines.splice(+index,1);
          this.cuisines.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));
          this.activecuisineindex = null;
          this.showdeletecuisine = false;

        });
  }

// ######## experiential types ###########################################################################################
  experientialtypes =[];

  activeexperientialtypeindex = null;

// ******** add experiential types ***************************************************************************************
  @ViewChild('experientialtypeaddform') experientialtypeaddform: NgForm;


  addexperientialtype(){
    const payload = {
      type: this.experientialtypeaddform.form.value.experientialtypeaddinput
    };
    this.suitsettingsservice.addexperientialtype(payload)
      .subscribe(
        (req: any)=>{
          this.experientialtypes.push(req);
          this.experientialtypes.sort((a, b) => ((a.type) < (b.type) ? -1 : ((a.type) > (b.type) ? 1 : 0)));
          this.experientialtypeaddform.reset();
        });
  }

// ******* edit experiential types **************************************************************************************
  @ViewChild('editexperientialtypeform') editexperientialtypeform:NgForm;
  showeditexperientialtype = true;

  activateeditexperientialtype(index){
    this.activeexperientialtypeindex = index;
    this.showeditexperientialtype = true;
    this.showdeleteexperientialtype = false;

  }

  deactivateediteexperientialtype(){
    this.activeexperientialtypeindex = null;
    this.showeditexperientialtype = false;

  }

  editexperientialtype(index){
    const pk = this.experientialtypes[index].pk;
    const payload = {
      type: this.editexperientialtypeform.form.value.experientialtypeeditinput
    };
    this.suitsettingsservice.editexperientialtype(payload, pk)
      .subscribe(
        (req: any)=>{
          this.experientialtypes[index].type = req.type;
          this.experientialtypes.sort((a, b) => ((a.type) < (b.type) ? -1 : ((a.type) > (b.type) ? 1 : 0)));
          this.activeexperientialtypeindex = null;
          this.showeditexperientialtype = false;
          this.editexperientialtypeform.reset();

        });
  }


// ***** delete experiential types ************************************************************************************
  selecteddeleteexperientialtype;
  showdeleteexperientialtype = false;

  activatedeleteexperientialtype(index){
    this.showdeleteexperientialtype = true;
    this.activeexperientialtypeindex = index;
    this.showeditexperientialtype = false;
    this.selecteddeleteexperientialtype = this.experientialtypes[index].type;
  }

  deactivatedeleteexperientialtype(){
    this.showdeleteexperientialtype = false;
    this.activeexperientialtypeindex = null;

  }

  deleteexperientialtype(index){
    const pk = this.experientialtypes[index].pk;
    this.suitsettingsservice.deleteexperientialtype(pk)
      .subscribe(
        (req: any)=>{
          this.experientialtypes.splice(+index, 1);
          this.experientialtypes.sort((a, b) => ((a.type) < (b.type) ? -1 : ((a.type) > (b.type) ? 1 : 0)));
          this.showdeleteexperientialtype = false;
          this.activeexperientialtypeindex = null;
        });
  }

  // ############################# Event Purpose Code #################################

  eventpurpose = [];
  activatedeventpurposeindex = null;

  // *********************add eventpurpose code******************************************


  @ViewChild('eventpurposeaddform') eventpurposeaddform: NgForm;
  addEventPurpose(){
    const payload = {
      purpose: this.eventpurposeaddform.form.value.eventpurposeaddinput
    };
    this.suitsettingsservice.addeventpurposetype(payload)
      .subscribe(
        (req: any)=>{
          this.eventpurpose.push(req);
          this.eventpurpose.sort((a, b) => ((a.purpose) < (b.purpose) ? -1 : ((a.purpose) > (b.purpose) ? 1 : 0)));
          this.eventpurposeaddform.reset();
        }
      );
  }

  // ********************** edit event purpose code****************************************
  showediteventpurpose = false;
  activateediteventpurpose(index){
    this.showediteventpurpose = true;
    this.activatedeventpurposeindex = index;
  }

  @ViewChild('editeventpurposeform') editeventpurposeform: NgForm;
  editeventpurpose(index){
    const pk = this.eventpurpose[index].pk;
    const payload = {
      purpose: this.editeventpurposeform.form.value.eventpurposeeditinput
    };
    this.suitsettingsservice.editeventpurposetype(payload, pk)
      .subscribe(
        (req: any)=>{
          this.eventpurpose[index].purpose = req.purpose;
          this.eventpurpose.sort((a, b) => ((a.purpose) < (b.purpose) ? -1 : ((a.purpose) > (b.purpose) ? 1 : 0)));
          this.showediteventpurpose = false;
          this.activatedeventpurposeindex = null;
          this.editeventpurposeform.reset();
        }
      );
  }

  cancelediteventpurpose(){
    this.showediteventpurpose = false;
    this.activatedeventpurposeindex = null;

  }


  // ********************** delete event purpose code **************************************
  showdeleteeventpurpose = false;
  selecteddeleteeventpurpose;

  activatedeleteeventpurpose(index){
    this.showdeleteeventpurpose = true;
    this.activatedeventpurposeindex = index;
    this.selecteddeleteeventpurpose = this.eventpurpose[index].purpose;
  }

  deactivatedeleteeventpurpose(){
    this.showdeleteeventpurpose = false;
    this.activatedeventpurposeindex = null;

  }

  deleteeventpurpose(index){
    const pk = this.eventpurpose[index].pk;
    this.suitsettingsservice.deleteeventpurpose(pk)
      .subscribe(
        (req: any)=>{
          this.eventpurpose.splice(+index,1);
          this.eventpurpose.sort((a, b) => ((a.purpose) < (b.purpose) ? -1 : ((a.purpose) > (b.purpose) ? 1 : 0)));
          this.showdeleteeventpurpose = false;
          this.activatedeventpurposeindex = null;

        });

  }


  //################## venue application decline reason code ###############################################################

  venueapplicationdeclinereasons = [];

  activevadrindex = null;

  //************ add venue application decline reason ***********************************************************************
  @ViewChild('addvadrform') addvadrform: NgForm;
  addedvadr;
  addsucessvadr = false;

  addvadr(){
    const payload ={
      reason: this.addvadrform.form.value.addvadr
    } ;
    if(payload.reason !== ''){
      this.suitsettingsservice.addvadr(payload)
        .subscribe(
          (req: any)=>{
            this.venueapplicationdeclinereasons.push(req);
            this.venueapplicationdeclinereasons.sort((a, b) => ((a.reason) < (b.reason) ? -1 : ((a.reason) > (b.reason) ? 1 : 0)));
            this.addvadrform.reset();
          });
    }

  }

  //************ edit venue application decline reason **********************************************************************
  @ViewChild('editvadrform') editvadrform:NgForm;
  showeditvadr = false;

  activateshoweditvadr(index){
    this.activevadrindex = index;
    this.showeditvadr = true;
    this.showdeletevadr = false;
  }

  deactivateshoweditvadr(){
    this.activevadrindex = null;
    this.showeditvadr = false;
  }

  editvadr(index){
    const pk = this.venueapplicationdeclinereasons[index].pk;
    const payload={
      reason: this.editvadrform.form.value.editvadr
    };
    if(payload.reason !== ''){
      this.suitsettingsservice.editvadr(payload, pk)
        .subscribe(
          (req: any)=>{
            this.venueapplicationdeclinereasons[index] = req;
            this.venueapplicationdeclinereasons.sort((a, b) => ((a.reason) < (b.reason) ? -1 : ((a.reason) > (b.reason) ? 1 : 0)));
            this.activevadrindex = null;
            this.showeditvadr = false;
          });
    }
  }

  //************ delete venue application decline reason ********************************************************************
  showdeletevadr = false;
  vadrdeletesucess = false;


  activateshowdeletevadr(index){
    this.activevadrindex = index;
    this.showeditvadr = false;
    this.showdeletevadr = true;
  }

  deactivateshowdeletevadr(){
    this.activevadrindex = null;
    this.showdeletevadr = false;

  }

  deletevadr(index){
    const pk = this.venueapplicationdeclinereasons[index].pk;
    this.suitsettingsservice.deletevadr(pk)
      .subscribe(
        (req: any)=>{
          this.venueapplicationdeclinereasons.splice(+index,1);
          this.venueapplicationdeclinereasons.sort((a, b) => ((a.reason) < (b.reason) ? -1 : ((a.reason) > (b.reason) ? 1 : 0)));
          this.activevadrindex = null;
          this.showdeletevadr = false;
        });
  }


  ngOnInit() {

    // dependancy services

    this.suitssettingsdependancyservice.getallcityobjects()
      .subscribe(
        (req: any)=>{
          this.choicesload = false;
          this.states = req.state;
          this.states.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));
          this.venuetypes = req.venuetype;
          this.venuetypes.sort((a, b) => ((a.type) < (b.type) ? -1 : ((a.type) > (b.type) ? 1 : 0)));
          this.cuisines = req.cuisine;
          this.cuisines.sort((a, b) => ((a.name) < (b.name) ? -1 : ((a.name) > (b.name) ? 1 : 0)));
          this.experientialtypes = req.experientialtype;
          this.experientialtypes.sort((a, b) => ((a.type) < (b.type) ? -1 : ((a.type) > (b.type) ? 1 : 0)));
          this.venueapplicationdeclinereasons = req.venueapplicationdeclinereason;
          this.venueapplicationdeclinereasons.sort((a, b) => ((a.reason) < (b.reason) ? -1 : ((a.reason) > (b.reason) ? 1 : 0)));
          this.eventpurpose = req.eventpurpose;
          this.eventpurpose.sort((a, b) => ((a.purpose) < (b.purpose) ? -1 : ((a.purpose) > (b.purpose) ? 1 : 0)));
        }
      );

  } // ngoninit

} // class declaration




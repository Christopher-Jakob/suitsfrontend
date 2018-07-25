/**
 * Created by rickus on 7/1/18.
 */
import {Component, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {BrowsevenuescomponentcommService} from "../services/browsevenueservice/browsevenuescommservice/browsevenuescomponentcomm.service";
import {ClientUserService} from "../services/userservice/clientuserservice/clientuserservice";
@Component({
  selector: 'app-mainroot',
  templateUrl: './mainroot.component.html',
  styleUrls: ['./mainroot.component.css'],
  providers: [BrowsevenuescomponentcommService]
})
export class MainrootComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private dashboardservice : ClientUserService, private cdr: ChangeDetectorRef) { }
  dashboardservicevar;
  isactingsuits = false;

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.dashboardservicevar = this.dashboardservice.receiveclientpermission()
      .subscribe(
        (req: any)=>{
          if(req !== null){
            console.log(req);
            if(req === 'suits'){
              this.isactingsuits = true;
              /* fix used to manually detect changes while in development mode.
               This componenet is being changed by a call from a component father down the tree. Manually calling a detect changes, on ChangeDetectorRef allows for a new change cycle to be init and the old and new values of the quad check to be refreshed.
               */

              this.cdr.detectChanges();
            }
          }
        }
      );


  }


  ngOnDestroy(){
    this.dashboardservicevar.unsubscribe();
  }



}

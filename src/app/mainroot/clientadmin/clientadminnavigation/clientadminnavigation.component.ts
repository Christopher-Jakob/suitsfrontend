import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainRootClientDashboardService} from "../../../services/mainroot/clientdashboard/mainroot.clientdashboard.service";

@Component({
  selector: 'app-clientadminnavigation',
  templateUrl: './clientadminnavigation.component.html',
  styleUrls: ['./clientadminnavigation.component.scss']
})
export class ClientadminnavigationComponent implements OnInit, OnDestroy{

  constructor(private dashboardservice: MainRootClientDashboardService ) { }
  dashboardservicevar;
  clientpermissionservicevar;
  clientpk = 3;
  permission = 'suits';


  ngOnInit() {

    this.clientpermissionservicevar = this.dashboardservice.receiveclientpermission()
      .subscribe(
        (req:any)=>{
          if(req !== null){
            console.log(req + 'this is what we are working on right now');
            this.permission = req;
          }
        }
      );
    this.dashboardservicevar = this.dashboardservice.receiveclientobject()
      .subscribe(
        (req: any)=>{
          if(req !== null){
            this.clientpk = req;
          }


        }
      );
  }

  ngOnDestroy(){
    //this.clientpermissionservicevar.unsubscribe();
    //this.dashboardservicevar.unsubscribe();
  }

}

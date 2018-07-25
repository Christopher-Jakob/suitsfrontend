/**
 * Created by rickus on 7/1/18.
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientUserService} from "../../services/userservice/clientuserservice/clientuserservice";

@Component({
  selector: 'app-clientadmin',
  templateUrl: './clientadmin.component.html',
  styleUrls: ['./clientadmin.component.css'],
})
export class ClientadminComponent implements OnInit, OnDestroy{

  constructor(private route: ActivatedRoute,  private clientdashboardservice:  ClientUserService , private router: Router) { }
  clientdashboardservicevar;
  isactingsuits = false;

  ngOnInit() {
    let pk = null;
    let permission = null;

    let clientobject = null;
    this.route.params
      .subscribe(
        (req:any)=>{
          pk = req.pk;
          permission = req.permission;
          console.log('before being set is this ' + permission);
          if(permission === 'suits'){
            this.isactingsuits = true;
          }
          this.clientdashboardservice.sendclientpermission(permission);
           this.clientdashboardservice.getclientuser(pk)
           .subscribe(
           (req:any)=> {
             clientobject = req;
             this.clientdashboardservice.sendclientobject(clientobject);

           });

        }
      );
    // temporary reroute while the next interation is being built.
    this.router.navigate(['profile'], {relativeTo: this.route});

  }

  ngOnDestroy(){

  }

}

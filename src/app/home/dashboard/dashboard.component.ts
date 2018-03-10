import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ProjectService } from '../../service/ProjectService';
declare var $: any;
import "./dash.js";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sub1: any;
  sub2: any;
  sub3: any;
  sub4: any;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private projectService: ProjectService ) {
     this.toastr.setRootViewContainerRef(vcr);

     this.sub1 = this.projectService.emitSuccessRes.subscribe(res=>{
       this.showSuccess(res);
     });

     this.sub2 = this.projectService.emitErrorRes.subscribe(res=>{
       this.showError(res);
     });

    this.sub3 = this.projectService.emitWarningRes.subscribe(res=>{
       this.showWarning(res);
     });

     this.sub4 = this.projectService.emitInfoRes.subscribe(res=>{
       this.showInfo(res);
     });
  }

  navClick(pos){
    console.log(pos);
  }

  ngOnInit() {
    // this.showCustom();
  }

  showSuccess(res) {
    this.toastr.success(null, res);
  }

  showError(res) {
    this.toastr.error(null, res);
  }

  showWarning(res) {
    this.toastr.warning(null, res);
  }

  showInfo(res) {
    this.toastr.info(null, res);
  }

  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', 'null', {enableHTML: true});
  }

  logout() {
    $("#userprofile").modal('hide');
   this.projectService.logout();
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
  }

}

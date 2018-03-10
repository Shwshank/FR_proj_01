import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {ProjectService} from '../../../service/ProjectService';
declare var $: any;

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  jsonArray: any[] = [];
  disabledAll = false;
  displayPublish = false;
  tempID: any = undefined;
  formID: any = undefined;
  formDetails: any;
  tempDetails: any;
  name: any;
  project_name: any;
  sumbitForm = 'Save as Paper';
  sumbitTemp = 'Save as Template';
  newFormName = '';
  newFormProjectName = '';
  newTempName = '';
  displayPublishForm = true;
  displayPublishTemp = true;
  projectArray : any = [];
  projectAssociate: any;
  existingForm: any = [];
  existingTemp: any = [];
  sub: any;
  sub1:any;
  sub2:any;
  sub3:any;
  sub4:any;
  sub5:any;
  sub6:any;
  sub7:any;
  sub8:any;

  constructor (private projectService:ProjectService, private activatedRoute: ActivatedRoute , private router: Router) {

    this.sub1 = this.projectService.emitTemplateWithID.subscribe((res)=>{
      this.existingTemp = res;
      console.log(this.existingTemp);
      this.tempDetails = res.Details;
      console.log(this.tempDetails);
      this.name = res.Details.name;
      this.project_name = res.Details.project;
      this.jsonArray = res.Elements;
      this.sumbitTemp = "Modify Template";
      if(this.jsonArray.length > 0) {
        this.displayPublish = true;
      } else {
        this.displayPublish = false;
      }
      this.displayPublishTemp = false;
    });

    this.sub2 = this.projectService.emitFormWithID.subscribe((res)=>{
      this.existingForm = res;
      console.log(this.existingForm);
      this.formDetails = res.Details;
      console.log(this.formDetails);
      this.jsonArray = res.Elements;
      this.name = res.Details.name;
      this.project_name = res.Details.project;
      this.sumbitForm = "Modify Form";
      if(this.jsonArray.length > 0) {
        this.displayPublish = true;
      } else {
        this.displayPublish = false;
      }
      this.displayPublishForm = false;
    });

    this.sub3 = this.projectService.emitFormElement.subscribe((res)=>{
      // console.log(res);
      res = JSON.stringify(res);
      res = JSON.parse(res);
      this.jsonArray.push(res);
      console.log(this.jsonArray);
      this.displayPublish = true;

    });

    this.sub4 = this.projectService.emitFormElementTemp.subscribe((res)=>{
      // console.log(res);
      res = JSON.stringify(res);
      res = JSON.parse(res);
      this.jsonArray = this.jsonArray.concat(res);
      // console.log(this.jsonArray);
      this.displayPublish = true;

    });

    this.sub5 = this.projectService.emitDeleteElement.subscribe((res)=>{

      this.jsonArray.splice(res,1);
      if(this.jsonArray.length == 0) {
        this.displayPublish = false;
        // console.log(this.displayPublish);
      }
      localStorage.setItem('form_template',JSON.stringify(this.jsonArray));

    });

    // this.sub6 = this.projectService.emitUpElement.subscribe((res)=>{
    //
    //   let temp1 = this.jsonArray[(parseInt(res)-1)];
    //   this.jsonArray.splice((parseInt(res)-1),1);
    //   this.jsonArray.splice(parseInt(res), 0, temp1);
    // });
    //
    // this.sub7 = this.projectService.emitDownElement.subscribe((res)=>{
    //
    //   if(res < (this.jsonArray.length-1)) {
    //
    //     let temp2 = this.jsonArray[(parseInt(res)+1)];
    //     this.jsonArray.splice((parseInt(res)+1),1);
    //     this.jsonArray.splice(parseInt(res), 0, temp2);
    //   }
    //
    // });

    this.sub8 = this.projectService.emitProject.subscribe((res)=>{

      this.projectArray = res;
    });

  }

  ngOnInit () {

    this.sub = this.activatedRoute.queryParams.subscribe(params=>{
        this.formID = params.formID;
        this.tempID = params.templateID;
        // console.log(this.formID);
        // console.log(this.tempID);

        if(this.formID != undefined) {
          this.projectService.getFormArrayWithID(this.formID);
        }
        if(this.tempID != undefined) {
          this.projectService.getTemplateArrayWithID(this.tempID);
        }

    });
  }

  deleteElement(id) {
    this.projectService.emitDeleteElement.emit(id);
  }

  publishForm() {

    if(this.formID != undefined) {

      let updatedData = this.jsonArray
      this.projectService.updateFormArray(this.formID,updatedData);

    } else {
      $("#newFormModal").modal('show');
      this.projectService.getProject();
    }
    // console.log(this.projectService.formArray);
  }

  publishTemplate() {

    if(this.tempID != undefined) {

      let updatedData = this.jsonArray
      this.projectService.updateTempArray(this.tempID,updatedData);
    } else {
      $("#newTempModal").modal('show');
    }
    // console.log(this.projectService.templateArray);
  }

  conformForm() {

    let id = this.projectService.calFormArrayLength();
    let cid = this.projectService.cid();
    let dataToPush = {Details: {name: this.newFormName, rule: 'None', project: this.projectAssociate.name, projectcid: this.projectAssociate.cid, status:'Offline', cid: cid }, Elements:this.jsonArray,  Rules:[]}
    this.projectService.incFromCount(this.projectAssociate.cid);
    this.projectService.pushIntoForm(dataToPush);
    this.router.navigate(['/form']);

  }

  conformTemp() {

    let id = this.projectService.calTemplateArrayLength();
    let cid = this.projectService.cid();
    let dataToPush = {Details: {name: this.newTempName, rule: 'None', project: 'N/A', cid: cid }, Elements:this.jsonArray};
    this.projectService.pushIntoTemplate(dataToPush);
    this.router.navigate(['/form']);

  }

  ngOnDestroy() {

    if(this.tempDetails) {
      console.log(this.existingTemp);
      this.projectService.updateTempJson(this.existingTemp);
    }

    if(this.formDetails) {
      console.log(this.existingForm);
      this.projectService.updateFormJson(this.existingForm);
    }

    this.sub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
    this.sub5.unsubscribe();
    // this.sub6.unsubscribe();
    // this.sub7.unsubscribe();
    this.sub8.unsubscribe();
  }

}

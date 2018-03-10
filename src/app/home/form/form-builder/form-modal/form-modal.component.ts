import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import {ProjectService} from '../../../../service/ProjectService';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  json: any  = { 'type': 'text'};
  name: any;
  alias: any;
  helptext: any;
  required = false;              // for resetting the checkbox
  rangeFrom: any;
  rangeTo: any;
  option: any=[];
  optionArray: any=[];
  value: any;
  values: any=[];
  resultArray = [];
  fileTypes= ['.png','.doc','.pdf','.mp3'];
  opti: any ='';
  @Output() newElement = new EventEmitter<any>();


  constructor(private projectService: ProjectService) {}

  ngOnInit() {}

  addInOptionArray() {
    console.log(this.opti);
    console.log(this.optionArray);
    this.optionArray.push(this.opti);
    this.opti = "";
  }

  truncate() {
    this.opti = "";
  }

  spliceOptionArray(id: any) {
    this.optionArray.splice(id,1);
  }

  inputType(type:any) {
    this.required = false ;  // for resetting the checkbox
    this.json.type = type;
    this.value = "";
    this.opti = "";
    this.optionArray = [];
  }

  checked() {
    if(this.required) {
      this.required = false;
    } else {
      this.required = true;
    }
    console.log(this.required);
  }

  checkVal(opt) {
    let flg = false;

    for(let j=0; j<this.resultArray.length; j++) {
      if(opt == this.resultArray[j]) {
          flg = true;
      }
    }

    if(flg) {
      return true;
    } else {
      return false;
    }

  }

  getVal1(flag, opt) {

    let temp = 0;
    let pos = 0;
    if(flag) {

      for(let i=0; i<= this.values.length; i++) {
        if(this.values[i] == opt) {
          temp = 1;
        }
      }

      if(temp == 0) {
        this.values.push(opt);
      }

      // console.log(this.resultArray);
    } else {

      for(let i=0; i<= this.values.length; i++) {
        if(this.values[i] == opt) {
          pos = i;
          break;
        }
      }

      this.values.splice(pos,1);
    }
    console.log(this.values);
  }

  getVal(flag, opt) {
    let temp = 0;
    let pos = 0;
    if(flag) {

      for(let i=0; i<= this.resultArray.length; i++) {
        if(this.resultArray[i] == opt) {
          temp = 1;
        }
      }
      if(temp == 0) {
        this.resultArray.push(opt);
      }
    } else {

      for(let i=0; i<= this.resultArray.length; i++) {
        if(this.resultArray[i] == opt) {
          pos = i;
          break;
        }
      }
      this.resultArray.splice(pos,1);
    }
    // console.log(this.resultArray);
  }

  addElement() {
    this.json.required = this.required;
    this.json.hepltext =  this.helptext;
    this.json.name =  this.name;
    this.json.value = "";
    let now = new Date();
    this.json.cid = now.getTime() +""+ Math.floor(1000 + Math.random() * 9000);

    if(this.json.type === "number" || this.json.type === "date" || this.json.type === "time"  || this.json.type === "slider") {
      // console.log('type : number');
      // console.log(this.rangeFrom);
      // console.log(this.rangeTo);
      // this.json.rangeFrom = this.rangeFrom;
      this.json.rangeTo = this.rangeTo;
      this.json.value = this.value;
    }

    if(this.json.type === "radio" || this.json.type === "dropdown" ) {
      console.log(this.option);
      this.option = this.option;
      this.json.value = this.value;
      this.json.option = this.optionArray;

    }

    if(this.json.type === "checkbox" ) {

      if(this.values!=[] && this.values!=""){
        this.json.values = this.values;
        this.json.value = this.json.values;
      }
      // if(this.option!=[] && this.option!="") {
      //   this.json.option = this.option.split(',');
      // }
      this.json.option = this.optionArray;

      if( this.json.value == undefined || this.json.value == "") {
        this.json.value = [];
      }
      if( this.json.values == undefined || this.json.values == "") {
        this.json.values = [];
      }
    }

    if(this.json.type === "file") {
      this.json.fileTypes = this.resultArray;
    }

    // console.log(this.json);
    this.projectService.emitFormElement.emit(this.json);

    this.name='';
    this.alias='';
    this.helptext='';

    if(this.json.type === "file") {
      this.json.fileTypes = "";
      this.resultArray = [];
    }

    if(this.json.type === "number" || this.json.type === "date" || this.json.type === "time"  || this.json.type === "slider") {
      this.json.rangeFrom = "";
      this.json.rangeTo = "";
      this.json.value = "";

      this.value = "";
      this.rangeTo = "";
      this.rangeFrom = "";
    }

    if(this.json.type === "radio" || this.json.type === "checkbox" || this.json.type === "dropdown") {
      this.json.value = "";
      this.json.values = "";
      this.json.option = "";

      this.opti="";
      this.optionArray = [];
      this.value = "";
      this.values = [];
      this.option = [];
    }
  }

}

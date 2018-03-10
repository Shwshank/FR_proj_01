import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import {ProjectService} from '../../../../service/ProjectService';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.css']
})
export class InputCheckboxComponent implements OnInit {

  updatedData : EventEmitter<any> = new EventEmitter<any>();
  selectedValue: any;
  resultArray: any = [];
  text= '';

  @Input() id: number;
  @Input() name: string;
  @Input() disabled: any;
  @Input() option: any;
  @Input() value: any;
  @Input() values: any;
  @Output() jsonData = new EventEmitter<any>();

  constructor(private projectService:ProjectService) {}

  ngOnInit() {
    this.text = this.value;
    this.resultArray= this.value;
  }

  checkVal(opt) {
    let flg = false;
    // console.log(this.values);
    if(this.values!=undefined) {
      for(let j=0; j<this.values.length; j++) {
        if(opt == this.values[j]) {
            flg = true;
        }
      }
    }

    if(flg) {
      return true;
    } else {
      return false;
    }

  }

  funID(id) {
    return (parseInt(id)+1);
  }
  upElement(id){
    this.projectService.emitUpElement.emit(id);
  }

  downElement(id){
    this.projectService.emitDownElement.emit(id);
  }

  deleteElement(id) {
    this.projectService.emitDeleteElement.emit(id);
  }

  getVal() {
    // console.log(this.text);
    // this.jsonData.emit({ 'id':this.id, 'name':this.name, 'value':this.text, });
  }

}

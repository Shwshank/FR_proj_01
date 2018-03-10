import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import {ProjectService} from '../../../../service/ProjectService';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.css']
})
export class InputRadioComponent implements OnInit {

  updatedData : EventEmitter<any> = new EventEmitter<any>();
  text= '';

  @Input() id: number;
  @Input() name: string;
  @Input() disabled: any;
  @Input() option: any;
  @Input() value: any;
  @Output() jsonData = new EventEmitter<any>();

  constructor(private projectService:ProjectService) {}

  ngOnInit() {
    this.text = this.value;
    console.log(this.disabled);
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

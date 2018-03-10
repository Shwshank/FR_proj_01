import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import {ProjectService} from '../../../../service/ProjectService';

@Component({
  selector: 'app-input-slider',
  templateUrl: './input-slider.component.html',
  styleUrls: ['./input-slider.component.css']
})
export class InputSliderComponent implements OnInit {

  updatedData : EventEmitter<any> = new EventEmitter<any>();
  val:any;

  @Input() id: number;
  @Input() name: string;
  @Input() value: string;
  @Input() disabled: any;
  @Input() rangeFrom: any;
  @Input() rangeTo: any;
  @Output() jsonData = new EventEmitter<any>();

  @ViewChild('val') output;
  constructor(private projectService:ProjectService) {}

  ngOnInit() {
    this.val = this.value;
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
    // console.log(this.output.nativeElement.value);
    let v;
    v = this.output.nativeElement.value;

  }

}

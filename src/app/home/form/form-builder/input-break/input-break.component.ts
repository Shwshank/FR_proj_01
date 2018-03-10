import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import {ProjectService} from '../../../../service/ProjectService';

@Component({
  selector: 'app-input-break',
  templateUrl: './input-break.component.html',
  styleUrls: ['./input-break.component.css']
})
export class InputBreakComponent implements OnInit {

  @Input() id: number;
  @Input() name: string;

  constructor(private projectService:ProjectService) {}

  ngOnInit() {}

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

}

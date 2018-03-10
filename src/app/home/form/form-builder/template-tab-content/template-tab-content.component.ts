import { Component, OnInit } from '@angular/core';

import {ProjectService} from '../../../../service/ProjectService';
declare var $: any;

@Component({
  selector: 'app-template-tab-content',
  templateUrl: './template-tab-content.component.html',
  styleUrls: ['./template-tab-content.component.css']
})
export class TemplateTabContentComponent implements OnInit {

  sub: any;
  tArray: any;

  constructor(private projectService: ProjectService) {
    this.sub = this.projectService.emitTemplateArray.subscribe((res)=>{
      // console.log(res);
      this.tArray = res;
    });
  }

  ngOnInit() {
    this.projectService.getTemplateArray();
  }

  addTemplate(id) {
    // console.log(this.tArray[id].Elements);
    this.projectService.emitFormElementTemp.emit(this.tArray[id].Elements);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

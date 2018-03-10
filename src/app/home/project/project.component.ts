import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../service/ProjectService';
declare var $: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: any = [];
  pname: any;
  pdesc: any;

  constructor(private projectService: ProjectService) {

    this.projectService.emitProject.subscribe(res=>{
      this.projects = res;
      // console.log(this.projects);
    });
  }

  ngOnInit() {
    this.projectService.getProject();
  }

  newProject() {
    // console.log(this.pname);
    // console.log(this.pdesc);

    this.projectService.addNewProject(this.pname,this.pdesc);
    $('#projectModal').modal('hide');
  }


}

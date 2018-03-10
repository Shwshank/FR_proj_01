import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {ProjectService} from '../../../service/ProjectService';
declare var $: any;
import 'datatables.net';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: any = [];
  flag = false;
  projectArray: any = [];
  userName: any;
  userEmail: any;
  projectAssociate: any;
  userProjectName : any;
  userProjectArray : any =[];
  projectAs: any;
  userCid: any;
  sub: any;
  sub1: any;
  sub2: any;
  sub3: any;
  sub4: any;

  constructor(private projectService: ProjectService, private router: Router) {
    this.sub = this.projectService.emitUsers.subscribe(res=>{
      // console.log(res);
      this.users = res;
      this.flag = true;
      this.display();
    });

    this.sub1 = this.projectService.emitProject.subscribe(res=>{
      // console.log(res);
      this.projectArray = res;
    });
  }

  ngOnInit() {
    this.projectService.getUsers();
  }

  display() {
    if(this.flag) {
       $(document).ready(function() {
        var t = $('#example').DataTable({
          "columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "bSort": false
        } ],
        "bSort": false
        });
        t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            });
        }).draw();
      });
    }
  }

  user() {
    this.projectService.getProject();
    $("#newUserModal").modal('show');
  }

  saveUser() {

    this.projectService.addUserArray(this.userName,this.userEmail,this.projectAssociate);
    this.userName = '';
    this.userEmail = '';
    $("#newUserModal").modal('hide');
    this.router.navigate(['/org'], { queryParams: { id: '1' } });
    this.projectAssociate = "";
    this.projectArray = [];
  }

  calProject(project) {
    let j = 0;
    for(let i of project) {
      j++;
    }
    return ""+j;
  }

  showProjectModal( userName, userCid, projectArray) {
    this.projectService.getProject();
    let n = 0;
    let temp = [];
    this.userProjectName = userName;
    this.userCid = userCid;
    this.userProjectArray = projectArray;

    for(let i =0; i< this.userProjectArray.length; i++) {
      for(let j = 0; j<this.projectArray.length; j++) {
        if(this.userProjectArray[i].cid == this.projectArray[j].cid ) {
          temp.push(j);
        }
      }
    }
    // for(let i = 0; i<temp.length; i++) {
    //   this.projectArray.splice([temp[i]],1);
    // }
    $("#userProjectModal").modal('show');

  }

  assignNewProject() {
    this.projectService.assignNewProjectToUser(this.userCid,this.projectAs);
    $("#userProjectModal").modal('hide');
    this.projectArray = [];
    this.userProjectArray= [];
    this.projectAs = "";
  }

  deleteProjectUserArray(projCid) {
    this.projectService.deleteProjectUserArray(this.userCid, projCid);
    $("#userProjectModal").modal('hide');
    this.projectArray = [];
    this.userProjectArray= [];
  }

  projectName(project) {
    let name = "";
    for(let n of project) {
      name += n.name + " ,";
    }
    // console.log(name);
    return name;

  }

  userDetails(id, cid) {
    $("#userDetails").modal('show');
    console.log(id);
    console.log(cid);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {ProjectService} from '../../service/ProjectService';
declare var $: any;
import 'datatables.net';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  response: any;
  flag = false;
  sub: any;

  constructor(private projectService: ProjectService, private router: Router) {
    this.sub = this.projectService.emitResponseSummary.subscribe(res=>{
      // console.log(res);
      this.response = res;
      this.flag = true;
      this.display();
    });
  }

  ngOnInit() {
    this.projectService.getResponse();
  }

  display() {
    if(this.flag) {
       $(document).ready(function() {
        var t = $('#example').DataTable({
          "columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        }],
        // "order": [[ 1, 'asc' ]],
        // aaSorting: [],
        });
        t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        }).draw();

      });
    }
  }

  getData(data) {
    this.router.navigate(['/resTable'], { queryParams: { id: data } });
  }

  resMoreThanZero(res) {
    if(res>0){
      return false;
    } else {
      return true;
    }
  }

  details(id) {
    $("#responseDetails").modal('show');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

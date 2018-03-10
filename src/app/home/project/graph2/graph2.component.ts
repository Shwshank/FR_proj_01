import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph2',
  templateUrl: './graph2.component.html',
  styleUrls: ['./graph2.component.css']
})
export class Graph2Component implements OnInit {

  option1: any;

  constructor() {}

  ngOnInit() {
    this.getGraph1();
  }

  getGraph1() {
    this.option1 = {
        title: {
            // text: 'Response Graph'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data:['GATE','PSU','SSC JEE','ECS']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['AUG','SEPT','OCT','NOV','DEC','JAN','FEB']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        color:['#e91e63','#78d4d8'],
        series : [

            {
                name:'GATE',
                type:'line',
                stack: 'ACA',
                areaStyle: {normal: {}},
                data:[20, 132, 144, 154, 190, 230, 410],
                smooth: true
            },
            {
                name:'PSU',
                type:'line',
                stack: 'ACA',
                areaStyle: {normal: {}},
                data:[40, 182, 191, 234, 290, 330, 310],
                smooth: true
            },
            {
                name:'SSC JEE',
                type:'line',
                stack: 'ACA',
                areaStyle: {normal: {}},
                data:[50, 232, 266, 354, 390, 330, 410],
                smooth: true
            },
            {
                name:'ECS',
                type:'line',
                stack: 'ACA',
                areaStyle: {normal: {}},
                data:[120, 132, 201, 234, 330, 370, 380],
                smooth: true
            },

        ]
    };
  }

}

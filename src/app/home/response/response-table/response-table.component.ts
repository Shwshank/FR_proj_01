import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {ProjectService} from '../../../service/ProjectService';
declare var $: any;

// API KEY = AIzaSyA7ncvWAZbtaSujgwstq290g_Y1VskhlXE

@Component({
  selector: 'app-response-table',
  templateUrl: './response-table.component.html',
  styleUrls: ['./response-table.component.scss']
})
export class ResponseTableComponent implements OnInit {

  sub : any;
  sub1 : any;
  formId: any;
  response: any=[];
  header: any=[];
  flag = false;
  detailPos: any;
  detailRes: any;
  saveFlag: any = false;
  arrayPos :any;
  resId: any;
  flaggedMsg : any ='';
  elementCid: any;
  tagPos: any;
  resIdForTag: any;
  verifyAll: any = false;
  imgUrl: any;
  lat: any = 28.6226475;
  lng: any = 77.24714399999999;
  mapSrc: any;
  headerMinusOne: any = [];
  imgLocation: any={lat:'', lng:'', acc:''};
  imgFilename: any;
  iLocation: any={lat:'', lng:'', acc:''};

  constructor(private projectService:ProjectService, private activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer) {

    this.sub = this.projectService.emitFormResponse.subscribe(res=>{
      console.log(res);
      this.response = res;

      // this.projectService.sendSocketMessage('form');

      // this.projectService.connectSocket(this.formId);
      // this.projectService.openSocket();
      // this.projectService.messageSocket();

    });

    this.sub1 = this.projectService.emitTableHeader.subscribe(res=>{
      console.log(res);
      this.header = res;
      this.headerMinusOne = new Array(this.header.length-1);
      console.log(this.headerMinusOne);
      this.flag = true;
      this.display();
    });


    // this.mapSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDckRiiAGkAOBQlq3nKOls1MGgFtbVLKxs="+this.lat+","+this.lng+"";
    this.mapSrc = "https://maps.googleapis.com/maps/api/staticmap?center="+this.lat+","+this.lng+"&markers=color:red|"+this.lat+","+this.lng+"&zoom=12&size=800x1000";
    console.log(this.mapSrc);
  }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(params=>{
        this.formId = params.id;
        this.projectService.getFormResponseArray(this.formId);
    });
  }

  getGoogleMap(lat, lng) {
    return "https://maps.googleapis.com/maps/api/staticmap?center="+lat+","+lng+"&markers=color:red|"+lat+","+lng+"&zoom=7&size=100x60&key=AIzaSyBfEtpUU_-krt-FcLlcUX2IW6hFfUo12v0";
  }

  getGoogleMapBig(lat, lng) {
    return "https://maps.googleapis.com/maps/api/staticmap?center="+lat+","+lng+"&markers=color:red|"+lat+","+lng+"&zoom=14&size=300x300&key=AIzaSyBfEtpUU_-krt-FcLlcUX2IW6hFfUo12v0";
  }

  getGoogleMapBig2(lat, lng) {
    return "https://maps.googleapis.com/maps/api/staticmap?center="+lat+","+lng+"&markers=color:red|"+lat+","+lng+"&zoom=16&size=500x500&key=AIzaSyBfEtpUU_-krt-FcLlcUX2IW6hFfUo12v0";
  }

  getGoogleMapBig3(lat, lng) {
    return "https://maps.googleapis.com/maps/api/staticmap?center="+lat+","+lng+"&markers=color:red|"+lat+","+lng+"&zoom=15&size=1000x1000&key=AIzaSyBfEtpUU_-krt-FcLlcUX2IW6hFfUo12v0";
  }

  locationModal(location) {
    this.iLocation = location;
    $('#locationModal').modal('show');
  }

  photoURL() {
    return this.mapSrc;
  }

  display() {
    if(this.flag) {
      $(document).ready(function() {

        // Setup - add a text input to each footer cell
        $('#exampleFormResponse tfoot th').each( function () {
            var title = $(this).text();
            $(this).html( '<input type="text" placeholder="Version '+title+'" />' );
        } );

        $("#exampleFormResponse").DataTable({
          aaSorting: [],
          responsive: true,
          dom: 'lBfrtip',
          buttons: [
              'csv', 'pdf',
          ]
        });

        var table = $('#exampleFormResponse').DataTable();

        table.columns().every( function () {
            var that = this;

            $( 'input', this.footer() ).on( 'keyup change', function () {
                if ( that.search() !== this.value ) {
                    that
                        .search( this.value )
                        .draw();
                }
            } );
        } );

        // Image Roation
        var rotation = 0;
        $.fn.rotate = function(degrees) {
            $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
        };
        $('.north').click(function() {
            rotation += 90;
            $('.north').rotate(rotation);
        });

      });
    }
  }

  openImageNewTab(url) {
    window.open(url, '_blank');
  }

  imageModal(url, location, fileName) {
    this.imgLocation = location;
    this.imgFilename = fileName;

    console.log(this.imgFilename);
    console.log(this.imgLocation);

    this.imgUrl = url;
    $('#imageModal').modal('show');
  }

  getDetails(i,res) {
    console.log(i);
    console.log(res);
    this.detailPos = i;
    this.detailRes = res;
    this.tagPos = i;
    this.saveFlag = false;
    $('#getDetails').modal("show");
  }

  changeTag(i,res) {
    this.resIdForTag = res[2].value;
    this.tagPos = i;

    $("#changeTag").modal("show");
  }

  newTag(tag) {
    console.log(this.resIdForTag);
    console.log(this.tagPos);
    this.response[this.tagPos][4].value = tag;
    $("#changeTag").modal("hide");
    this.projectService.updateTag(this.resIdForTag,tag);
  }

  flagCommentModal( arrayPos, resId, cid) {

    this.elementCid = cid
    this.resId = resId;
    this.arrayPos = arrayPos;

    if(this.response[this.detailPos][this.arrayPos].flagged){
      this.response[this.detailPos][this.arrayPos].flagged = false;
      this.flaggedMsg = '';
      this.saveFlag = true;
      if(this.response[this.detailPos][this.arrayPos].flagMsg) {
        this.flaggedMsg = this.response[this.detailPos][this.arrayPos].flagMsg;
      }

    } else {

      this.response[this.detailPos][this.arrayPos].flagged = true;
      this.flaggedMsg = '';
      this.saveFlag = true;
      if(this.response[this.detailPos][this.arrayPos].flagMsg) {
        this.flaggedMsg = this.response[this.detailPos][this.arrayPos].flagMsg;
      }
      $('#flagComment').modal("show");
    }

    // Check for any responce is flagged or not
    let tag = '';
    for(let m of this.response[this.detailPos]) {
      if(m.flagged) {
        tag = "Pending"
        break;
      }
    }
    // Update status od flag to VERIFIED
    if(tag !="Pending" && (this.response[this.detailPos][4].value == "Pending" || this.response[this.detailPos][4].value == "Flagged")) {
      this.verifyAll = true;
      this.saveFlag = false;
    } else {
      this.verifyAll = false;
      this.saveFlag = true;
    }

  }

  flagMsg() {
    // console.log(this.flaggedMsg);
    this.response[this.detailPos][this.arrayPos].flagMsg = this.flaggedMsg+"";
  }

  saveFlagFun(){
    this.response[this.detailPos][4].value = "Flagged";
    console.log(this.response[this.detailPos]);
    console.log(this.resId);
    this.projectService.flagResponse(this.resId, this.response[this.detailPos]);
    this.resId = "";
    this.detailPos = "";
    this.flaggedMsg = "";
    $('#getDetails').modal("hide");
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }

  verifyTag() {
    this.response[this.detailPos][4].value = "Verified";
    this.projectService.updateTag(this.response[this.detailPos][2].value,"Verified");
    $('#getDetails').modal("hide");
  }
}

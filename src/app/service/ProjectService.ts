import { EventEmitter, Injectable, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from './APIService';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ProjectService {

  private socket;
  ws: any;
  data: any;

  emitWsMsg = new EventEmitter<any>();

  constructor(private apiService: APIService, private router: Router ) {}

    connectSocket(formId: any) {
      this.ws = new WebSocket(this.apiService.responseSocketURL+'/form/' + formId);
    }

    openSocket() {
        this.ws.onopen = function(evt) {
          console.log("***Connection Opened***");
        };
      }

    messageSocket() {
        this.ws.onmessage = function(evt) {
          console.log("Total Responses: " + evt.data)
          this.data = evt.data;
        };
        console.log(this.data);
        this.emitWsMsg.emit(""+this.data);
      }

  // sendSocketMessage(message){
  //
  //   this.socket = io(this.apiService.responseSocketURL);
  //   this.socket.emit('add-message', message);
  // }
  //
  // getSocketMessages() {
  //
  //
  //   let observable = new Observable(observer => {
  //     this.socket = io(this.apiService.responseSocketURL);
  //     this.socket.on('message', (data) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   })
  //   return observable;
  // }

  cid() {
    let d = new Date();
    let cid = d.getTime() +""+ Math.floor(1000 + Math.random() * 8999);
    return cid;
  }

  cdate() {
    let d = new Date();
    let cdate = d.getDate()+"/"+ (d.getMonth()+1)+ "/"+d.getFullYear()+" "+d.getHours();
    let min  = d.getMinutes();
    let min2 = "";
    if(min<10) {
      min2 = "0"+min;
    } else{
      min2 = ""+min;
    }
    cdate += ":"+min2;
    return cdate;
  }

  emitUserLogin = new EventEmitter<any>();
  emitFormElement = new EventEmitter<any>();
  emitFormElementTemp = new EventEmitter<any>();
  emitDeleteElement = new EventEmitter<any>();
  emitFormArray = new EventEmitter<any>();
  emitTemplateArray = new EventEmitter<any>();
  emitFormWithID = new EventEmitter<any>();
  emitTemplateWithID = new EventEmitter<any>();
  emitUpElement = new EventEmitter<any>();
  emitDownElement = new EventEmitter<any>();
  emitProject = new EventEmitter<any>();
  emitResponseSummary = new EventEmitter<any>();
  emitResTable = new EventEmitter<any>();
  emitUsers = new EventEmitter<any>();
  emitAssessors = new EventEmitter<any>();
  emitFormResponse = new EventEmitter<any>();
  emitTableHeader = new EventEmitter<any>();
  emitSuccessRes = new EventEmitter<any>();
  emitWarningRes = new EventEmitter<any>();
  emitErrorRes = new EventEmitter<any>();
  emitInfoRes = new EventEmitter<any>();
  emitTeams = new EventEmitter<any>();

  formArray = [];
  // { Details: { name: 'Form1', rule: 'None', project: 'Project Name Here 1', projectcdi:'p121', status:'Offline', cid:'a1221' },    Elements:  [{type: "text", required: false, name: "Name", value:"", cid:"a1", hepltext: ""},                    {type: "email", required: false, hepltext: "", name: "Email ID", value:"", cid:"b1"},                    {type: "number", required: false, hepltext: "", name: "Number Input", value:"", cid:"c1"},],    Rules: [{cid:"211", name: 'Rule1',elementName:'Name',elementType: "text", elementValue:"sam",elementCid:"a1", tempCid: '2332b', tempName: 'template1', satisfyAll:false},], },

  templateArray = [];
  // { Details:   { name: 'template1', rule: 'None', project:"N/A", cid:'2332b'},  Elements:  [{type: "text", required: false, name: "Name", value:"", cid:"a1q", hepltext: ""},                  {type: "email", required: false, value:"", cid:"a1b", hepltext: "", name: "Email ID"},                  {type: "number", required: false, value:"", cid:"a1c", hepltext: "", name: "Number Input"},],    },

  projectArray = [];
  //{cid:"p121", cdate:"26/11/2017 10:14", name: 'Project Name Here 1', form: 2, user: 3, assesor: 5, desc:'This is a test project about different design concepts we can adopt to show a card design. Lorem iThis is a test project about different design concepts we can adopt to show a card design. Lorem ipsum doler sit   kilpsum doler sit kil This is a test project about different design concepts we can adopt to show a card design. Lorem ipsum doler sit   kil'},

  responseArray = [];
  //{ResCid:'1',    ResDetails:{ name: 'Form1', rule: 'None', project: 'Project Name Here 1', projectcdi:'p121', status:'Offline', cid:'a1221' },    ResElements:[      {type: "text", required: false, name: "Name", value:"sammy", cid:"a1", hepltext: "", alias:" Username "},      {type: "password", required: false, name: "SecretKey", value:"sammy_password", cid:"a2", hepltext: "", alias:" Password "}    ],    ResExtra:{asrName: "", asrID: "", resDate: ""}  },

  userArray = [];
  //{cid:"p123", cdate:"26/11/2017 10:20", name: 'Rony', email:" test@tes.com", project:[{cid:'p121', name:'Project Name Here 1'}], details:'Details'},

  assessorArray = [];
  //{cid:"p120", cdate:"26/11/2017 10:14", name: 'Ram', phone:'8998671234', form:[{ name: 'Form1', rule: 'None', project: 'Project Name Here 1', projectcdi:'p121', status:'Offline', cid:'a1221' },], details:'Details'},

  teamArray = [];
  //{ cid:"t123", cdate:"26/11/2017 10:14", name: 'Team 1', tl:['a1233'], assesor:["a1233"], form:[{ name: 'Form1', rule: 'None', project: 'Project Name Here 1', projectcdi:'p121', status:'Offline', cid:'a1221' }],  details:'Details'},

  login(data: any) {
    this.apiService.Login(data).subscribe(res=>{
      console.log(res);
      if(res.success){
        localStorage.setItem('token',res.token);
        this.emitUserLogin.emit("Invalid credentials!");
      } else {
        this.emitErrorRes.emit();
      }
    }, err=>{
      console.log(err);
    });
  }

  checkLogin() {
    if(localStorage.getItem('token')) {
      this.router.navigate(['./']);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['./login']);
  }

  uploadCollectForm(form) {
    this.apiService.UploadCollectForm(form).subscribe(res=> {
      console.log(res);
      if(res.success){
        this.emitSuccessRes.emit(res.message);
      } else {}
    },err=> {
      console.log(err);
    });
  }

  uploadCollectRule(rule) {
    this.apiService.UploadCollectRule(rule).subscribe(res=> {
      console.log(res);
      if(res.success){
        this.emitSuccessRes.emit(res.message);
      } else {}
    },err=> {
      console.log(err);
    });
  }

  getProject() {
    this.apiService.GetAllProjects().subscribe(res=> {
      console.log(res);
      if(res.success){
        this.projectArray = res.data;
        this.emitProject.emit(this.projectArray);

      } else {
        if(!res.header) {
          this.logout();
        }
      }
    },err=> {
      console.log(err);
      if(!err.header) {
        this.logout();
      }
    });
  }

  addNewProject(pname: string, pdesc: string) {

    let tempData : any;
    let cid = this.cid();
    let cdate = this.cdate();
    tempData = { cid:cid, cdate:cdate, name: pname, desc: pdesc, form:0, user: 0, assesor: 0};
    this.apiService.AddNewProject(tempData).subscribe(res=>{
      // console.log(res);
      if(res.success) {
        this.emitSuccessRes.emit(res.message);
        this.projectArray.push(tempData);
      } else {
        if(!res.header) {
          this.logout();
        }
      }
    },err=>{
      if(!err.header) {
        this.logout();
      }
      console.log(err);
      this.emitErrorRes.emit("Somethisng went wrong");
        this.logout();
    });

    // this.getProject();
  }

  getFormArray() {
    this.apiService.GetFormArray().subscribe(res=>{
      // console.log(res);

      if(res.success) {
        this.formArray = [];
        if(res.formArray.length) {
          for(let i = 0; i< res.formArray.length; i++) {
            this.formArray.push(res.formArray[i].form_json);
          }
        }
        this.emitFormArray.emit(this.formArray);
      }else {if(!res.header){ this.logout();}}
    }, err=>{
      console.log(err);
    });
    // this.emitFormArray.emit(this.formArray);
  }

  getTemplateArray() {
    this.apiService.GetTeplateArray().subscribe(res=>{
      // console.log(res);

      if(res.success) {
        this.templateArray = [];
        if(res.tempArray.length) {
          for(let i = 0; i< res.tempArray.length; i++) {
            if(res.tempArray[i].temp_json.Details.name != "Form question") {
              this.templateArray.push(res.tempArray[i].temp_json);
            }
          }
        }
        this.emitTemplateArray.emit(this.templateArray);
      }else {if(!res.header){ this.logout();}}
    }, err=>{
      console.log(err);
    });
    // this.emitTemplateArray.emit(this.templateArray);
  }

  updateFormJson(form: any){
    this.apiService.UpdateFormJson(form).subscribe(res=>{
      console.log(res);
      if(res.success) {
        // this.emitSuccessRes.emit(res.message);
      }else {}
    }, err=>{
      console.log(err);
    });
  }

  updateTempJson(temp: any){
    this.apiService.UpdateTempJson(temp).subscribe(res=>{
      // console.log(res);
      if(res.success) {
        // this.emitSuccessRes.emit(res.message);
      }else {}
    }, err=>{
      console.log(err);
    });
  }

  pushIntoForm(data: any) {

    this.apiService.PushIntoForm(data).subscribe(res=>{
      console.log(res);
      if(res.success) {
        this.emitSuccessRes.emit(res.message);
        this.formArray.push(data);
        this.router.navigate(['dash/form']);
      }else {}
    }, err=>{
      console.log(err);
    });
  }

  pushIntoTemplate(data: any) {
    this.apiService.PushIntoTemplate(data).subscribe(res=>{
      console.log(res);
      if(res.success) {
        this.emitSuccessRes.emit(res.message);
        this.templateArray.push(data);
        this.router.navigate(['dash/form']);
      }else {}
    }, err=>{
      console.log(err);
    });
    // this.templateArray.push(data);
  }

  addNewRule(fcid: any,newRule: any) {

    if(newRule.ruleFormQuestion != undefined) {           // If Rule is a Form Question

      let cid = this.cid();
      let template: any = {Details:{},Elements:[]};       // generate new template
      template.Details.name = 'Form question';            // generate template properties
      template.Details.rule = '';
      template.Details.project = '';
      template.Details.cid = cid;
      template.Elements.push(newRule.ruleFormQuestion);   // push elements

      this.pushIntoTemplate(template);                    // update server template
      this.templateArray.push(template);                  // push new generated template on the template array

      for(let i = 0; i< this.formArray.length; i++) {
        if(this.formArray[i].Details.cid == fcid) {
          for(let j=0; j< this.formArray[i].Elements.length; j++) {
            if(this.formArray[i].Elements[j].cid == newRule.ruleFormQuestion.cid) {
              this.formArray[i].Elements.splice(j,1);     // remove form question from from to template
              break;
            }
          }
        }
      }
      newRule.tempCid = cid;                               // insert tempID on the rule list
      newRule.tempName = template.Details.name;            // insert temp Name on the rule list
      // console.log(newRule);
    }

    // this.apiService.RulesArray(fcid,newRule);

    let i=0;
    let temp: any;
    for(i=0; i<this.formArray.length; i++) {
      if(fcid == this.formArray[i].Details.cid) {
        temp = i;
        break;
      }
    }
    if(temp != undefined) {
      this.formArray[temp].Rules.push(newRule);            // update local formArray
      this.updateFormJson(this.formArray[temp]);           // update server formArray
    }
    console.log(newRule);
  }

  deleteRule(fCid, rCid){
    let temp: any;
    let rtemp: any;
    console.log(fCid);
    console.log(rCid);

    for(let m = 0; m < this.formArray.length; m++) {
      if(fCid == this.formArray[m].Details.cid) {
        temp = m;
        break;
      }
    }

    for(let n = 0; n < this.formArray[temp].Rules.length; n++ ){
      if(rCid == this.formArray[temp].Rules[n].cid) {
        rtemp = n;
      }
    }

      this.formArray[temp].Rules.splice(rtemp,1);
      this.updateFormJson(this.formArray[temp]);
  }

  getAssessors() {
    this.apiService.GetAllAssesors().subscribe(res=> {
      // console.log(res);
      if(res){
        this.assessorArray = res.data;
        this.emitAssessors.emit(this.assessorArray);
      } else {}
    },err=> {
      console.log(err);
    });
    // this.emitAssessors.emit(this.assessorArray);
  }

  addAssessorArray(name, phone, details) {
    let cid = this.cid();
    let cdate = this.cdate();

    let formObj = [];
    formObj.push(details);
    if(name =="" || name == undefined) {
      name = 'N/A';
    }
    let tempArray = {cid:cid, cdate:cdate, name: name, phone: phone, form:formObj, details:'Details'};
    this.apiService.AddAssesorArray(tempArray).subscribe(res=>{
      // console.log(res);
      if(res.success){
        this.emitSuccessRes.emit(res.message);
      } else {}
    },err=> {
      console.log(err);
    });
    this.assessorArray.push(tempArray);
    this.incAssessorCount(details.projectcdi);
  }

  assignNewFormToAssessor(cid,form) {
    let temp: any;
    let flag = true;
    for(let i = 0;i<this.assessorArray.length;i++) {
      if(cid == this.assessorArray[i].cid) {
        temp = i;
        break;
      }
    }

    // check if form is already assigned to assesor or not

    if(this.assessorArray[temp].form.length) {
      for(let m = 0; m < this.assessorArray[temp].form; m++) {
        if(form.Details.cid == this.assessorArray[temp].form[m].cid) {
          flag = false;
          break;
        }
      }
    }

    if(flag) {
      this.assessorArray[temp].form.push(form.Details);
      this.apiService.AddAssesorArray(this.assessorArray[temp]).subscribe(res=>{
        if(res.success){
          this.emitSuccessRes.emit(res.message);
        } else {}
      },err=> {
        console.log(err);
      });

      this.incAssessorCount(form.Details.projectcdi);
    }
  }

  updateTag(rID, tag) {

    let formData = new FormData();
    formData.append("rID",rID);
    formData.append("tag",tag);
    this.apiService.UpdateTag(formData).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    })
  }

  getTeams() {
    this.apiService.GetAllTeams().subscribe(res=> {
      // console.log(res);
      if(res){
        this.teamArray = res.data;
        this.emitTeams.emit(this.teamArray);
      } else {}
    },err=> {
      console.log(err);
      this.emitTeams.emit(this.teamArray);
    });
    // this.emitAssessors.emit(this.assessorArray);
  }

  addTeamArray(name, tl, details) {
    let cid = this.cid();
    let cdate = this.cdate();
    let asrObj = [];
    let tlObj = [];
    let formObj = [];

    formObj.push(details);
    if(name =="" || name == undefined) {
      name = 'N/A';
    }

    tlObj.push(tl);
    asrObj.push(tl);

    let tempArray = {cid:cid, cdate:cdate, name: name, tl: tlObj, form:formObj, assesor:asrObj, details:'Details'};
    this.apiService.AddTeamArray(tempArray).subscribe(res=>{
      // console.log(res);
      if(res.success){
        this.emitSuccessRes.emit(res.message);
      } else {}
    },err=> {
      console.log(err);
    });
    this.teamArray.push(tempArray);
    // this.incAssessorCount(details.projectcdi);
  }

  assignNewFormToTeam(cid,form) {
    let temp: any;
    for(let i = 0;i<this.teamArray.length;i++) {
      if(cid == this.teamArray[i].cid) {
        temp = i;
        break;
      }
    }

    this.teamArray[temp].form.push(form.Details);
    this.apiService.AddTeamArray(this.teamArray[temp]).subscribe(res=>{
      if(res.success){
        this.emitSuccessRes.emit(res.message);
      } else {}
    },err=> {
      console.log(err);
    });
  }

  addNewAssesorInTeam(asrID, teamID) {
    let temp : any;
    for(let i = 0;i<this.teamArray.length;i++) {
      if(teamID == this.teamArray[i].cid) {
        temp = i;
        break;
      }
    }
    this.teamArray[temp].assesor.push(asrID);
    this.apiService.AddTeamArray(this.teamArray[temp]).subscribe(res=>{
      if(res.success){
        this.emitSuccessRes.emit(res.message);
      } else {}
    },err=> {
      console.log(err);
    });
  }

  addNewManagerInTeam (mgrId, teamID) {
    let temp : any;
    for(let i = 0;i<this.teamArray.length;i++) {
      if(teamID == this.teamArray[i].cid) {
        temp = i;
        break;
      }
    }
    this.teamArray[temp].tl.push(mgrId);
    this.teamArray[temp].assesor.push(mgrId);
    this.apiService.AddTeamArray(this.teamArray[temp]).subscribe(res=>{
      if(res.success){
        this.emitSuccessRes.emit(res.message);
      } else {}
    },err=> {
      console.log(err);
    });
  }

  deleteFormTeamArray(tCid, fCid) {
    let ipos: any;
    let jpos: any;
    let formData = new FormData();
    formData.append('tID', tCid);
    formData.append('fID', fCid);
    console.log(formData);
    this.apiService.DeleteFormTeamArray(formData).subscribe(res=>{
      console.log(res);
      if(res.success) {

        for(let i = 0; i< this.teamArray.length; i++) {
          if(tCid == this.teamArray[i].cid) {
            ipos = i;
            break;
          }
        }

        for(let j = 0; j< this.teamArray[ipos].form.length; j++) {
          if(fCid == this.teamArray[ipos].form[j].cid) {
            jpos = j;
            break;
          }
        }
        this.teamArray[ipos].form.splice(jpos,1);
      }
    },err =>{
      console.log(err);
    });
  }

  deleteAsrTeamArray(tCid, aCid) {
    let ipos: any;
    let jpos: any;

    let formData = new FormData();
    formData.append('tID', tCid);
    formData.append('aID', aCid);
    console.log(formData);

    this.apiService.DeleteAsrTeamArray(formData).subscribe(res=>{
      console.log(res);
      if(res.success) {

        for(let i = 0; i< this.teamArray.length; i++) {
          if(tCid == this.teamArray[i].cid) {
            ipos = i;
            break;
          }
        }

        for(let j = 0; j< this.teamArray[ipos].assesor.length; j++) {
          if(aCid == this.teamArray[ipos].assesor[j]) {
            jpos = j;
            break;
          }
        }
        this.teamArray[ipos].assesor.splice(jpos,1);
      }
    },err =>{
      console.log(err);
    });
  }

  deleteMgrTeamArray(tCid, mCid) {
    let ipos: any;
    let jpos: any;

    let formData = new FormData();
    formData.append('tID', tCid);
    formData.append('aID', mCid);
    console.log(formData);

    this.apiService.DeleteAsrTeamArray(formData).subscribe(res=>{
      console.log(res);
      if(res.success) {

        for(let i = 0; i< this.teamArray.length; i++) {
          if(tCid == this.teamArray[i].cid) {
            ipos = i;
            break;
          }
        }

        for(let j = 0; j< this.teamArray[ipos].tl.length; j++) {
          if(mCid == this.teamArray[ipos].tl[j]) {
            jpos = j;
            break;
          }
        }
        this.teamArray[ipos].tl.splice(jpos,1);
      }
    },err =>{
      console.log(err);
    });
  }

  addUserArray(name, email, project) {
    let cid = this.cid();
    let cdate = this.cdate();
    let temp = { 'cid':project.cid, 'name':project.name };
    let projObj = [];
    projObj.push(temp);
    let tempObj = {cid:cid, cdate:cdate, name: name, email:email, project:projObj, details:'Details'};

    this.apiService.AddUser(tempObj).subscribe(res=>{
      // console.log(res);
      if(res.success){
        this.emitSuccessRes.emit(res.message);
        this.userArray.push(tempObj);
      } else {}
    },err=> {
      console.log(err);
    });

    this.incUserCount(project.cid);
  }

  getUsers() {
    this.apiService.GetAllUsers().subscribe(res=> {
      if(res){
        this.userArray = res.data;
        this.emitUsers.emit(this.userArray);
      } else {}
    },err=> {
      console.log(err);
    });
    // this.emitUsers.emit(this.userArray);
  }

  assignNewProjectToUser(cid,project) {
    let array = {cid:project.cid, name: project.name};
    let temp : any;
    for(let i=0; i<this.userArray.length; i++) {
      if(cid == this.userArray[i].cid) {
        temp = i;
        break;
      }
    }

    this.userArray[temp].project.push(array);
    this.apiService.AddUser(this.userArray[temp]).subscribe(res=>{
      // console.log(res);
      if(res.success){
        this.emitSuccessRes.emit(res.message);
      } else {}
    },err=> {
      console.log(err);
    });

    this.incUserCount(project.cid);
  }

  getResponse() {

    this.apiService.GetResponseSummary().subscribe(res=> {
      console.log(res);
      if(res.data.length){
        this.responseArray = [];
        this.responseArray = res.data;
        // console.log(this.responseArray);
        this.emitResponseSummary.emit(this.responseArray);
      } else {}
    },err=> {
      console.log(err);
    });
  }

  getFormResponseArray(formId) {
    let formResponse = [];
    let tableHeader = [];
    let finalResponse= [];

    this.apiService.GetFormResponse(formId).subscribe(res=> {
      console.log(res);
      if(res){
        if(res.header.length) {
          tableHeader = res.header;
        }
        if(res.data.length) {
          formResponse = res.data;
        }
        for(let i = 0; i<formResponse.length; i++) {
          for(let j=0; j<tableHeader.length; j++) {
              // finalResponse[i].push();
          }
        }
        this.emitFormResponse.emit(formResponse);
        this.emitTableHeader.emit(tableHeader);
      } else {}
    },err=> {
      console.log(err);
    });


  }

  removeDuplicates (myArr, prop) {
    // resFormIdArray = Array.from(new Set(resFormIdArray));
      return myArr.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
  }

  incUserCount(cid) {
    for(let proj of this.projectArray) {
      if(proj.cid === cid) {
        proj.user++;
        break;
      }
    }
  }

  descUserCount(cid) {
    for(let proj of this.projectArray) {
      if(proj.cid === cid) {
        proj.user--;
        break;
      }
    }
  }

  descAsrCount(cid) {
    for(let proj of this.projectArray) {
      if(proj.cid === cid) {
        proj.assesor--;
        break;
      }
    }
  }

  incAssessorCount(cid) {
    for(let proj of this.projectArray) {
      if(proj.cid === cid) {
        proj.assesor++;
        break;
      }
    }
  }

  incFromCount(cid) {
    for(let proj of this.projectArray) {
      if(proj.cid === cid) {
        proj.form++;
        break;
      }
    }
  }

  deleteProjectUserArray(uCid,pCid) {

    let ipos: any;
    let jpos: any;
    let formData = new FormData();
    formData.append('userID', uCid);
    formData.append('pID', pCid);
    console.log(formData);
    this.apiService.DeleteProjectUserArray(formData).subscribe(res=>{
      console.log(res);
      if(res.success){

        for(let i = 0; i< this.userArray.length; i++) {
            if(uCid == this.userArray[i].cid) {
                ipos = i;
                break;
          }
        }

        for(let j = 0; j< this.userArray[ipos].project.length; j++) {
          if(pCid == this.userArray[ipos].project[j].cid) {
            jpos = j;
            break;
          }
        }
        this.userArray[ipos].project.splice(jpos,1);
        this.descUserCount(pCid);
        this.emitSuccessRes.emit(res.message);

      } else {}
    },err=> {
      console.log(err);
    });

  }

  deleteFormAssessorArray(cid, fCid, pCid) {
    let ipos: any;
    let jpos: any;

    let formData = new FormData();
    formData.append('asrID', cid);
    formData.append('fID', fCid);

    this.apiService.DeleteFormAssessorArray(formData).subscribe(res=> {
      console.log(res);
      if(res.success){
        for(let i = 0; i< this.assessorArray.length; i++) {
            if(cid == this.assessorArray[i].cid) {
                ipos = i;
                break;
          }
        }

        for(let j = 0; j< this.assessorArray[ipos].form.length; j++) {
          if(fCid == this.assessorArray[ipos].form[j].cid) {
            jpos = j;
            break;
          }
        }
        this.assessorArray[ipos].form.splice(jpos,1);
        this.descAsrCount(pCid);

      } else {}
    },err=> {
      console.log(err);
    });
  }

  flagResponse(rID, array) {

    this.apiService.FlagResponse(rID,array).subscribe((res)=>{
      console.log(res);
      if(res.success) {
        this.emitSuccessRes.emit("Flag Updated!");
      }else {}
    }, err=>{
      console.log(err);
    })
  }

  getFormArrayWithID(cid) {

    let i=0;
    let temp: any;
    for(i=0; i<this.formArray.length; i++) {
      if(cid == this.formArray[i].Details.cid) {
        temp = i;
        break;
      }
    }
    if(temp != undefined)
    this.emitFormWithID.emit(this.formArray[temp]);
  }

  getTemplateArrayWithID(cid) {

    let i=0;
    let temp: any;
    for(i=0; i<this.templateArray.length; i++) {
      if(cid == this.templateArray[i].Details.cid) {
        temp = i;
        break;
      }
    }
    if(temp != undefined) {
      this.emitTemplateWithID.emit(this.templateArray[temp]);
    }
  }

  updateFormArray(cid: any, data: any) {
    let i=0;
    let temp: any;
    for(i=0; i<this.formArray.length; i++) {
      if(cid == this.formArray[i].Details.cid) {
        temp = i;
        break;
      }
    }
    if(temp != undefined) {
      this.formArray[temp].Elements = data;
    }

  }

  updateTempArray(cid: any, data: any) {
    let i=0;
    let temp: any;
    for(i=0; i<this.templateArray.length; i++) {
      if(cid == this.templateArray[i].Details.cid) {
        temp = i;
        break;
      }
    }
    if(temp != undefined) {
      this.templateArray[temp].Elements = data;
    }

  }

  calFormArrayLength() {
    return (this.formArray.length+'');
  }

  calTemplateArrayLength() {
    return (this.templateArray.length+'');
  }

  syncAll() {
    this.apiService.SyncAll(this.formArray, this.templateArray).subscribe(res=>{
      console.log(res);
    });
  }

  emitResponseForResTable(data) {
    // let tempArray :any = [];
    // for(let m of this.responseArray1) {
    //     if(m.office == data) {
    //       tempArray.push(m);
    //     }
    // }
    // this.emitResTable.emit(tempArray);
  }

  changeFormStatus(fid, status) {
    let formData = new FormData();

    for(let m of this.formArray) {
      if(fid == m.Details.cid) {
        m.Details.status = status;
        formData.append('formID', fid);
        this.apiService.ChangeFormStatus(formData).subscribe(res=>{
          if(res.success) {

          } else {}
        }, err =>{
          console.log(err);

        });
        break;
      }
    }
  }

}

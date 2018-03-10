import { Http, Response, Headers, RequestOptions,BaseRequestOptions, RequestMethod} from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class APIService {

  // projectURL: string = 'http://192.168.15.187:8000';
  responseSocketURL: string = 'ws://192.168.15.187:8000';
  projectURL: string = 'https://qcitech.org:9000';

  userID : any = "";

  constructor( private http: Http) {}

  createAuthorizationHeader(headers: Headers) {
    this.userID = localStorage.getItem('token');
    // this.userID = "319424f5b8524ebe8188c2d40217c48c";
    headers.append('Authorization', this.userID);
  }

  Login(data) {
    return this.http.post(this.projectURL+'/login', data).map(res=>res.json());
  }

  SyncAll(formArray: any, tempArray: any) {

    formArray = JSON.stringify(formArray);
    formArray = JSON.parse(formArray);
    formArray = JSON.stringify(formArray);
    tempArray = JSON.stringify(tempArray);
    tempArray = JSON.parse(tempArray);
    tempArray = JSON.stringify(tempArray);
    let formData = new FormData();
    formData.append('formArray', formArray);
    formData.append('tempArray', tempArray);
    return this.http.post(this.projectURL+'/savetestform', formData);
  }

  AddNewProject(data: any){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.projectURL+'/addProject', data,{headers: headers}).map(res=>res.json());
  }

  GetAllProjects(){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.projectURL+'/getAllProjects',{headers: headers}).map(res=>res.json());
  }

  PushIntoForm(formArray: any){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    formArray = JSON.stringify(formArray);
    formArray = JSON.parse(formArray);
    formArray = JSON.stringify(formArray);
    let formData = new FormData();
    formData.append('formArray',formArray);
    return this.http.post(this.projectURL+'/addNewForm', formData,{headers: headers}).map(res=>res.json());
  }

  PushIntoTemplate(tempArray: any){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    tempArray = JSON.stringify(tempArray);
    tempArray = JSON.parse(tempArray);
    tempArray = JSON.stringify(tempArray);
    let tempData = new FormData();
    tempData.append('tempArray',tempArray);
    return this.http.post(this.projectURL+'/addNewTemplate', tempData,{headers: headers}).map(res=>res.json());
  }

  GetFormArray(){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.projectURL+'/getAllForms',{headers: headers}).map(res=>res.json());
  }

  GetTeplateArray(){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.projectURL+'/getAllTemplates',{headers: headers}).map(res=>res.json());
  }

  UpdateFormJson(formArray: any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    formArray = JSON.stringify(formArray);
    formArray = JSON.parse(formArray);
    formArray = JSON.stringify(formArray);
    let formData = new FormData();
    formData.append('formArray',formArray);
    return this.http.post(this.projectURL+'/editForm', formData,{headers: headers}).map(res=>res.json());
  }

  UpdateTempJson(tempArray: any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    tempArray = JSON.stringify(tempArray);
    tempArray = JSON.parse(tempArray);
    tempArray = JSON.stringify(tempArray);
    let tempData = new FormData();
    tempData.append('tempArray',tempArray);
    return this.http.post(this.projectURL+'/editTemp', tempData,{headers: headers}).map(res=>res.json());
  }

  GetAllAssesors(){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.projectURL+'/getAssesors',{headers: headers}).map(res=>res.json());
  }

  AddAssesorArray(asrArray: any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    asrArray = JSON.stringify(asrArray);
    asrArray = JSON.parse(asrArray);
    asrArray = JSON.stringify(asrArray);
    let assesorArray = new FormData();
    assesorArray.append('asrArray',asrArray);
    return this.http.post(this.projectURL+'/addAssesorInForm', assesorArray,{headers: headers}).map(res=>res.json());
  }

  GetAllUsers(){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.projectURL+'/getUsers',{headers: headers}).map(res=>res.json());
  }

  AddUser(tempObj) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    tempObj = JSON.stringify(tempObj);
    tempObj = JSON.parse(tempObj);
    tempObj = JSON.stringify(tempObj);
    let userObj = new FormData();
    userObj.append('tempObj',tempObj);
    return this.http.post(this.projectURL+'/addUserInProject', userObj, {headers: headers}).map(res=>res.json());
  }

  GetAllTeams(){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.projectURL+'/getTeams',{headers: headers}).map(res=>res.json());
  }

  AddTeamArray(teamArray: any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    teamArray = JSON.stringify(teamArray);
    teamArray = JSON.parse(teamArray);
    teamArray = JSON.stringify(teamArray);
    let tArray = new FormData();
    tArray.append('teamArray',teamArray);
    return this.http.post(this.projectURL+'/updateTeam', tArray,{headers: headers}).map(res=>res.json());
  }

  GetResponseSummary() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.projectURL+'/getResponseSummary', {headers: headers}).map(res=>res.json());
  }

  GetFormResponse(formID) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    let fID = new FormData();
    fID.append('formID',formID);

    return this.http.post(this.projectURL+'/getFormResponse',fID, {headers: headers}).map(res=>res.json());
  }

  UploadCollectForm(form) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.projectURL+'/', form , {headers: headers}).map(res=>res.json());
  }

  UploadCollectRule(Rule) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.projectURL+'/', Rule , {headers: headers}).map(res=>res.json());
  }

  ChangeFormStatus(fid) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.projectURL+'/changeFormStatus', fid , {headers: headers}).map(res=>res.json());
  }

  DeleteProjectUserArray(data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.projectURL+'/removeUserFromProject', data , {headers: headers}).map(res=>res.json());
  }

  DeleteFormAssessorArray(data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.projectURL+'/removeAssesorFromForm', data , {headers: headers}).map(res=>res.json());
  }

  DeleteFormTeamArray(data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.projectURL+'/removeFormFromTeam', data , {headers: headers}).map(res=>res.json());
  }

  DeleteAsrTeamArray(data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.projectURL+'/removeAssesorFromTeam', data , {headers: headers}).map(res=>res.json());
  }

  UpdateTag(data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.projectURL+'/changeResponseTag', data , {headers: headers}).map(res=>res.json());
  }

  FlagResponse(rID, array) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    array = JSON.stringify(array);
    array = JSON.parse(array);
    array = JSON.stringify(array);
    let formData = new FormData();

    formData.append('array',array);
    formData.append('rID',rID);

    return this.http.post(this.projectURL+'/flagResponse', formData , {headers: headers}).map(res=>res.json());
  }

}

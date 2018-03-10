import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ProjectService} from '../../service/ProjectService';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
declare var $: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  ruleOptions: IMultiSelectOption[];
  formArray = [];
  templateArray = [];
  fArray : any;
  tArray : any;
  tID: any;
  aTemp: any;
  rnameArray = [];
  rcondition = ['equals','grater than', 'smaller than', 'not equals'];
  ruleElement: any;
  ruleCondition: any= 'equals';
  hint: any;
  target: any;
  ruleTempTail: any;
  ruleTarget: any;
  ruleTargetM: any;
  ruleID: any;
  ruleName: any;
  ruleFormQuestion: any;
  rulesArray: any=[];
  formCIDWithRule: any;
  satisfyAll = false;
  files : any;
  multiOption: any;
  fCid: any;

  constructor( private projectService: ProjectService, private router: Router ){
    this.fArray = this.projectService.emitFormArray.subscribe((res)=>{
      // console.log(res);
      this.formArray = res;

    });

    this.tArray = this.projectService.emitTemplateArray.subscribe((res)=>{
      // console.log(res);
      this.templateArray = res;
    });

  }

  new() {
    this.router.navigate(['/formBuilder']);
  }

  ngOnInit() {

    this.projectService.getFormArray();
    this.projectService.getTemplateArray();
  }

  ngOnDestroy() {

    this.fArray.unsubscribe();
    this.tArray.unsubscribe();
  }

  deleteRule(rCid) {
    this.projectService.deleteRule(this.fCid, rCid);
  }

  rule(data, cid, formElement) {

    // console.log(cid);
    // console.log(data);
    this.fCid = cid;
    this.rulesArray = data;
    this.formCIDWithRule = cid;
    this.rnameArray = formElement;

  }

  getFormQuestion(eCid){
    let ques= "";
    console.log(eCid);
    // for(let m of this.formArray) {
    //   if(this.fCid == m.Details.cid) {
    //     for(let n of m.Elements) {
    //       if(n.cid == eCid) {
    //         ques = n.name;
    //         break;
    //       }
    //     }
    //     break;
    //   }
    // }
    return ques;
  }

  getVal() {

    if(this.ruleElement.option) {
      if(this.ruleElement.option.length){
        this.ruleTarget = '';
        this.multiOption = true;
        this.ruleOptions = [];
        for(let i = 0; i< this.ruleElement.option.length; i++) {
            this.ruleOptions.push({id:(i+1), name:this.ruleElement.option[i]});
        }
      }
    } else {
      this.multiOption = false;
      this.ruleTarget = '';
    }

    // console.log(this.ruleOptions);
    //
    // this.ruleOptions = [{ id: 1, name: 'Option 1' },
    //         { id: 2, name: 'Option 2' },];

    if(this.ruleElement.option) {
      this.hint = this.ruleElement.option.toString();
    }
    if(this.ruleElement.value) {
      this.hint = this.hint + "," +this.ruleElement.value;
    }
    // console.log(this.ruleCondition);
  }

  satisfyAllCondition() {
      if(this.satisfyAll) {
        this.satisfyAll = false;
      } else {
        this.satisfyAll = true;
      }
  }

  conformRule() {

    let tempCid = "";
    let tempName = "";
    if(this.ruleTempTail==undefined) {

    } else {
      tempCid = this.ruleTempTail.Details.cid;
      tempName = this.ruleTempTail.Details.name;
    }
    let now = new Date();
    let cid = now.getTime() +""+ Math.floor(1000 + Math.random() * 9000);
    let newRule = {cid:cid, name: this.ruleName, elementName: this.ruleElement.name,elementCid: this.ruleElement.cid, elementType: this.ruleElement.type, elementValue: this.ruleTarget.trim(), condition: this.ruleCondition, tempCid: tempCid, tempName: tempName, ruleFormQuestion: this.ruleFormQuestion, satisfyAll: this.satisfyAll};
    this.projectService.addNewRule(this.formCIDWithRule, newRule);
    $('#addRules').modal('hide');
    $('#rules').modal('hide');
  }

  onChangeRuleOption() {

    console.log(this.ruleOptions);
    this.ruleTarget = "";
    console.log(this.ruleTargetM);

    for(let i = 0; i<this.ruleTargetM.length; i++) {
      this.ruleTarget +=this.ruleOptions[(this.ruleTargetM[i]-1)].name+",";
    }

    console.log(this.ruleTarget);
    this.ruleTarget = this.ruleTarget.slice(0, -1 );
    console.log(this.ruleTarget);
  }

  syncCollectFrom($event) {
    let formData = new FormData();
    this.files = $event.target.files || $event.srcElement.files;
    let file = this.files[0];
    formData = new FormData();
    formData.append('form', file);
    this.projectService.uploadCollectForm(formData);
  }

  syncCollectFromRule($event) {
    let formData = new FormData();
    this.files = $event.target.files || $event.srcElement.files;
    let file = this.files[0];
    formData = new FormData();
    formData.append('rule', file);
    this.projectService.uploadCollectRule(formData);
  }

  checkStatus(fid) {
    for(let m of this.formArray) {
      if(m.Details.cid == fid) {
        if(m.Details.status == 'Offline'){
          return false;
        } else {
          return true;
        }
      }
    }
  }

  changeStatus(fid) {
    for(let m of this.formArray) {
      if(m.Details.cid == fid) {
        if(m.Details.status == 'Offline'){
          m.Details.status = 'Online';
        } else {
          m.Details.status = 'Offline';
        }
        this.projectService.changeFormStatus(fid, m.Details.status);
        break;
      }
    }

  }

  getResponse(fid) {
    this.router.navigate(['/resTable'], { queryParams: { id: fid } });
  }

}

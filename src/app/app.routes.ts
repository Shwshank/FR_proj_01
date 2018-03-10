import { Routes } from '@angular/router';

import { AuthGuard } from './service/ZAuthGuard';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './home/form/form.component';
import { FormBuilderComponent } from './home/form/form-builder/form-builder.component';
import { AssessorComponent } from './home/organisation/assessor/assessor.component';
import { UserComponent } from './home/organisation/user/user.component';
import { ProjectComponent } from './home/project/project.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { OrganisationComponent } from './home/organisation/organisation.component';
import { ResponseComponent } from './home/response/response.component';
import { ResponseTableComponent } from './home/response/response-table/response-table.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

  { path: '', component:  DashboardComponent, children: [
    { path: '', component: ProjectComponent, canActivate: [AuthGuard]},
    { path: 'form', component: FormComponent, canActivate: [AuthGuard]},
    { path: 'formBuilder', component:  FormBuilderComponent, canActivate: [AuthGuard]},
    { path: 'response', component: ResponseComponent, canActivate: [AuthGuard]},
    { path: 'org', component: OrganisationComponent, canActivate: [AuthGuard]},
    { path: 'resTable', component: ResponseTableComponent, canActivate: [AuthGuard]},
    { path: 'proj', component: ProjectComponent, canActivate: [AuthGuard]},
  ]},
  { path: 'login', component:  LoginComponent },
  { path: '**', redirectTo:'/login' }

];

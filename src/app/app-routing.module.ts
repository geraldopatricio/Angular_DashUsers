import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './gaurd/auth.guard';
import { EmpAuthGuard } from './gaurd/emp-auth.guard';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { EmpDetailsComponent } from './layouts/emp-details/emp-details.component';
import { EmpViewAdminComponent } from './layouts/emp-view-admin/emp-view-admin.component';
import { LoginComponent } from './layouts/login/login.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'employee', component:EmpDetailsComponent , canActivate:[EmpAuthGuard]},
  {path:'admin', component:DashboardComponent , canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

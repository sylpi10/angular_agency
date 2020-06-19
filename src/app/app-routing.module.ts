import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AdminDashboardComponent} from "./admin/admin-dashboard/admin-dashboard.component";
import {SigninComponent} from "./authentication/signin/signin.component";
import {PropertyDetailComponent} from "./property-detail/property-detail.component";
import {AuthGuardService} from "./services/auth-guard.service";


const routes: Routes = [
  { path:'home', component: HomeComponent },
  { path:'admin/dashboard', canActivate: [AuthGuardService], component: AdminDashboardComponent },
  { path:'login', component: SigninComponent },
  { path:'property/:id', component: PropertyDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

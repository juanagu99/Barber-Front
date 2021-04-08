import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBarberComponent } from './components/create-barber/create-barber.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { AuthenticateGuard } from './guards/authenticate.guard';
import { DatingHistoryComponent } from './components/dating-history/dating-history.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { AuthenticateGuardBarber } from './guards/authenticate-barber.guard';
import { ReportComponent} from './components/report/report.component'
const routes: Routes = [
  { path: '',   component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'create-barber', component: CreateBarberComponent,canActivate:[AuthenticateGuard] },

  { path: 'main', component: MainComponent,canActivate:[AuthenticateGuard] },
  { path: 'dating-history', component: DatingHistoryComponent,canActivate:[AuthenticateGuard,AuthenticateGuardBarber] },
  { path: 'reserve', component: ReserveComponent,canActivate:[AuthenticateGuard] },
  { path: 'report', component: ReportComponent,canActivate:[AuthenticateGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

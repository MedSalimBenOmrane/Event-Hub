import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreatorsComponent } from './pages/creators/creators.component';
import { SellpointsComponent } from './pages/sellpoints/sellpoints.component';
import { AuthenticateGuard } from './services/guards/authenticate.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'creators',
    component: CreatorsComponent,
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'sellpoints',
    component: SellpointsComponent,
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

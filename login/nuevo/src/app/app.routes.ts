import { Routes } from '@angular/router';
import { App } from './app';
import { DashboardComponent } from './Views/dashboard.component/dashboard.component';
import { LoginComponent } from './Views/login.component/login.component';
import { ReportesComponent } from './Views/reportes.component/reportes.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'repo',
    component: ReportesComponent,
  },
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedUserCanAccessGuard } from './shared/utils/LoggedUserCanAccess.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      (await import('./home/feature/home.module')).HomeModule,
  },
  {
    path: 'auth',
    loadChildren: async () =>
      (await import('./auth/feature/auth.module')).AuthModule,
  },
  {
    path: 'dashboard',
    loadChildren: async () =>
      (await import('./dashboard/feature/dashboard.module')).DashboardModule,
    canLoad: [LoggedUserCanAccessGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

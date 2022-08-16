import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppModule} from "../../app.module";
import {DashNavComponent} from "../ui/navbar/dash-nav.component";


@NgModule({
  declarations: [
    DashboardComponent,
    DashNavComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashNavComponent} from "../ui/navbar/dash-nav.component";
import {PersonEditDialogComponent} from "../ui/person-edit-dialog/person-edit-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "../ui/table/table.module";


@NgModule({
  declarations: [
    DashboardComponent,
    DashNavComponent,
    PersonEditDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    TableModule
  ]
})
export class DashboardModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashNavComponent} from "../ui/navbar/dash-nav.component";
import {TableComponent} from "../ui/table/table.component";
import {PersonEditDialogComponent} from "../ui/person-edit-dialog/person-edit-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DashboardComponent,
    DashNavComponent,
    TableComponent,
    PersonEditDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule {
}

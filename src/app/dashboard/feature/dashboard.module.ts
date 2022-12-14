import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DashNavComponent } from '../ui/navbar/dash-nav.component';
import { PersonEditDialogComponent } from '../ui/person-edit-dialog/person-edit-dialog.component';
import { TableModule } from '../ui/table/table.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashNavComponent,
    PersonEditDialogComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    TableModule,
  ],
})
export class DashboardModule {}

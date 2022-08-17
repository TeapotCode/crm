import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent, TableHeaderTemplateDirective, TableRowTemplateDirective} from "./table.component";


@NgModule({
  declarations: [
    TableComponent,
    TableRowTemplateDirective,
    TableHeaderTemplateDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableComponent,
    TableRowTemplateDirective,
    TableHeaderTemplateDirective
  ]
})
export class TableModule {
}

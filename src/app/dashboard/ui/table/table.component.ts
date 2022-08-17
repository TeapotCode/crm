import {ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {Person} from "../../utils/person.interface";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @ContentChild('rows') rows: TemplateRef<any> | undefined;
  @ContentChild('headers') headers: TemplateRef<any> | undefined;

  @Input() data!: unknown[];

  constructor() { }
}

import {ChangeDetectionStrategy, Component, ContentChild, Directive, Input, TemplateRef} from '@angular/core';

interface TableHeaderTemplateContext<TItem extends object> {
  $implicit: TItem[];
}

@Directive({
  selector: 'ng-template[appTableHeader]',
})
export class TableHeaderTemplateDirective<TItem extends object> {
  @Input('appTableHeader') data!: TItem[] | '';

  static ngTemplateContextGuard<TContextItem extends object>(
    directive: TableHeaderTemplateDirective<TContextItem>,
    context: unknown
  ): context is TableHeaderTemplateContext<TContextItem> {
    return true;
  }
}

interface TableRowTemplateContext<TItem extends object> {
  $implicit: TItem;
}

@Directive({
  selector: 'ng-template[appTableRow]',
})
export class TableRowTemplateDirective<TItem extends object> {
  @Input('appTableRow') data!: TItem[];

  static ngTemplateContextGuard<TContextItem extends object>(
    directive: TableRowTemplateDirective<TContextItem>,
    context: unknown
  ): context is TableRowTemplateContext<TContextItem> {
    return true;
  }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<TItem extends object> {
  @Input() data!: TItem[];

  @ContentChild(TableRowTemplateDirective, {read: TemplateRef}) rows?: TemplateRef<any>;
  @ContentChild(TableHeaderTemplateDirective, {read: TemplateRef}) headers?: TemplateRef<any>;


  constructor() { }

}

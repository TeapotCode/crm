import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dash-nav',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashNavComponent {}

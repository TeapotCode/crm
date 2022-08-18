import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../../shared/data-access/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  isLoggedIn$ = this.auth.isLoggedIn$;

  constructor(private auth: AuthService) {}
}

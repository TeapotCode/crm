import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from '../ui/navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { LayoutComponent } from '../ui/layout/layout.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    AboutComponent,
    LayoutComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}

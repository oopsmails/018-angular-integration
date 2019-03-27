import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarBsComponent } from './components/navbar-bs/navbar-bs.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarBsComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    NavbarBsComponent,
    HomeComponent,
    NotFoundComponent
  ],
})
export class CoreModule { }

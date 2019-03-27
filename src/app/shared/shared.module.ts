import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDisplayComponent } from './common/error-display/error-display.component';
import { LoginService } from './services/login.service';
import { ErrorDisplayService } from './common/error-display/error-display.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { HttpErrorInterceptor } from './interceptors/httperror.interceptor';
import { UserTokenService } from './services/user-token/user-token.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WINDOW_PROVIDERS } from './services/window-provider.service';

@NgModule({
  declarations: [
    ErrorDisplayComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  exports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot().ngModule
  ],
  providers: [
    LoginService,
    WINDOW_PROVIDERS,
    UserTokenService,
    ErrorDisplayService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    }
  ]
})
export class SharedModule { }

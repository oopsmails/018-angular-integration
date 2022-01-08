import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { ErrorDisplayComponent } from './common/error-display/error-display.component';
import { ErrorDisplayService } from './common/error-display/error-display.service';
import { fakeBackendProvider } from './interceptors/fake.backend.interceptor';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { HttpErrorInterceptor } from './interceptors/httperror.interceptor';
import { LoginService } from './services/login.service';
import { UserTokenService } from './services/user-token/user-token.service';
import { WINDOW_PROVIDERS } from './services/window-provider.service';

@NgModule({
  declarations: [
    ErrorDisplayComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    WINDOW_PROVIDERS,
    UserTokenService,
    ErrorDisplayService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true  },

    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ]
})
export class SharedModule { }

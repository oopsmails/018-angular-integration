import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ExampleModule } from './example/example.module';
import { SandboxModule } from './sandbox/sandbox.module';
import { SharedModule } from './shared/shared.module';
import { ConfigurationService } from '@app/services/configuration.service';
import { APP_INITIALIZER } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    SandboxModule,
    ExampleModule,
    AppRoutingModule
  ],
  providers: [
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configurationService: ConfigurationService) =>
          () => configurationService.loadConfigurationData(),
      deps: [ConfigurationService],
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

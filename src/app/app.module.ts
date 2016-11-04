import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {DriversComponent} from './drivers/drivers-list/drivers.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AgmCoreModule, } from 'angular2-google-maps/core';

@NgModule({
  declarations: [AppComponent,DriversComponent],
  imports     : [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig),AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDt7n5XYJD-CgOIBNoOzRi-fp6hfSw2hLs',
      libraries: ["places,geometry"]
    })],
  providers   : [],
  bootstrap   : [AppComponent]
})
export class AppModule {

}

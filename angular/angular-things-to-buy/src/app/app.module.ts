import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { ThingsComponent } from './things/things.component';
import { ThingDetailComponent } from './thing-detail/thing-detail.component';
import { TopThingsComponent } from './top-things/top-things.component';
import { SearchThingsComponent } from './search-things/search-things.component';
import { AppRoutingModule } from './/app-routing.module';
import { ThingService } from './thing.service';

@NgModule({
  declarations: [
    AppComponent,
    ThingsComponent,
    ThingDetailComponent,
    TopThingsComponent,
    SearchThingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ThingService],
  bootstrap: [AppComponent]
})
export class AppModule { }

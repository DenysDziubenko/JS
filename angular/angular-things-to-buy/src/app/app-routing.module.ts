import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThingsComponent }      from './things/things.component';
import { TopThingsComponent }   from './top-things/top-things.component';
import { ThingDetailComponent }  from './thing-detail/thing-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/topThings', pathMatch: 'full' },
  { path: 'thing/:id', component: ThingDetailComponent },
  { path: 'topThings', component: TopThingsComponent },
  { path: 'totalThings', component: ThingsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

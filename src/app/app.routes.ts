import {Routes} from '@angular/router';
import {DriversComponent} from './drivers/drivers-list/drivers.component';

export const rootRouterConfig: Routes = [
  {path: '', redirectTo: 'drivers', pathMatch: 'full'},
  {path: 'drivers', component: DriversComponent},

];

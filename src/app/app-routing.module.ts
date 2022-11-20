import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';

const routes: Routes = [
  { path: 'first-component', component: FirstComponent },
  { path: 'seat-selection', component: SeatSelectionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

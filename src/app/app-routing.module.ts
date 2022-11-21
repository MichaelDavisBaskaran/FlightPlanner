import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouritesComponent } from './favourites/favourites.component';
import { FirstComponent } from './first/first.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { MainpageComponent } from './mainpage/mainpage.component';

const routes: Routes = [
  { path: 'favourites', component: FavouritesComponent },
  { path: '', component: MainpageComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'seat-selection', component: SeatSelectionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

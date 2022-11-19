import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-third-proj';
  filters = new FormGroup({
    airline: new FormControl(),
    minPrice: new FormControl(),
    maxPrice: new FormControl(),
    beginTime: new FormControl(),
    endTime: new FormControl(),
    class: new FormControl(),
    connectingFlights: new FormControl(),
    roundTrip: new FormControl()
  });
}

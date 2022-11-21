import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-third-proj';
  flights = JSON.parse(
    '{"origin": "Toronto","destination": "Calgary", "airline": "airCanada", "price": 100, "time": "02:30", "class": "economy", "connectingFlights": 0, "roundTrip": true}'
  );
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
  hasFilters: boolean = true;
  
  applyFilters(): void {

    let airlineVal = this.filters.controls.airline.value;
    let minPriceVal = this.filters.controls.minPrice.value;
    let maxPriceVal = this.filters.controls.maxPrice.value;
    let beginTimeVal = this.filters.controls.beginTime.value;
    let endTimeVal = this.filters.controls.endTime.value;
    let classVal = this.filters.controls.class.value;
    let connectingFlightsVal = this.filters.controls.connectingFlights.value;
    let roundTripVal = this.filters.controls.roundTrip.value;

    if (airlineVal && airlineVal != this.flights.airline) {
      this.hasFilters = false;
      return;
    }
    if (minPriceVal && this.flights.price > minPriceVal) {
      this.hasFilters = false;
      return;
    }
    if (maxPriceVal && this.flights.price > maxPriceVal) {
      this.hasFilters = false;
      return;
    }
    if (beginTimeVal) {
      let beginTimeHr = +beginTimeVal.split(":")[0];
      let beginTimeMin = +beginTimeVal.split(":")[1];
      let flightHr = +this.flights.time.split(":")[0];
      let flightMin = +this.flights.time.split(":")[1];
      if (flightHr < beginTimeHr) {
        this.hasFilters = false;
        return;
      }
      else if (flightMin < beginTimeMin) {
        this.hasFilters = false;
        return;
      }
    }
    if (endTimeVal) {
      let endTimeHr = +endTimeVal.split(":")[0];
      let endTimeMin = +endTimeVal.split(":")[1];
      let flightHr = +this.flights.time.split(":")[0];
      let flightMin = +this.flights.time.split(":")[1];
      if (flightHr > endTimeHr) {
        this.hasFilters = false;
        return;
      }
      else if (flightMin > endTimeMin) {
        this.hasFilters = false;
        return;
      }
    }
    if (classVal && classVal != this.flights.class) {
      this.hasFilters = false;
      return;
    }
    if (connectingFlightsVal && connectingFlightsVal != this.flights.connectingFlights) {
      this.hasFilters = false;
      return;
    }
    if (roundTripVal) {
      this.hasFilters = this.flights.roundTrip ? roundTripVal === 'roundTrip' : roundTripVal === 'oneWay';
      return;
    }

    this.hasFilters = true;

  }

  clearFilters() {
    this.filters.controls.airline.setValue(null);
    this.filters.controls.minPrice.setValue(null);
    this.filters.controls.maxPrice.setValue(null);
    this.filters.controls.beginTime.setValue(null);
    this.filters.controls.endTime.setValue(null);
    this.filters.controls.class.setValue(null);
    this.filters.controls.connectingFlights.setValue(null);
    this.filters.controls.roundTrip.setValue(null);
    this.hasFilters = true;
  }

}

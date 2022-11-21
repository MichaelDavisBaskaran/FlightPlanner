import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {FloatLabelType} from '@angular/material/form-field';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  minDate: Date;
  panelOpenState = false;
  progBarCondition: boolean = false;
  potentialDepartureLocations : string[] = ['Toronto', 'London', 'Los Angeles', 'Sydney', 'New York', 'Beijing', 'Karachi'];
  potentialArrivalLocations : string[] = ['Toronto', 'London', 'Los Angeles', 'Sydney', 'New York', 'Beijing', 'Karachi'];
  seatsSelected : string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  potentialDepartureLocation : string = '';
  potentialArrivalLocation : string = '';
  seatSelected : string = '';
  arrivalIsDeparture = false;
  notGood = [true,true,true,true,true];
  tsdateRangeStart: any = new Date();
  tsdateRangeEnd:any = new Date();
  flightType = '';
  today = new Date();
  next_month = new Date(2022,12,20);
  next_next_month = new Date(2023,13,20);
  dates = [this.today,this.next_month,this.next_next_month]
  airlines = ['Air Canada','Sunwing','WestJet'];
  time = ['1:00','2:30','3:00','5:30','9:00','11:30','13:00','14:30'];
  flight_class = ['business', 'economy', 'first-class'];
  connecting_flights = [0,1,2,3];
  round_options = ['One Way','Round Trip']
  dummy_flights: any[] = [];
  show_table=false;
  filtered_flights: any[] = []
  displayedColumns: string[] = ['Origin', 'Destination', '# Seats', 'Date', 'Airline', 'Duration', 'Class', 'Trip Style', '# Connections', 'Price'];

  constructor(private _formBuilder: FormBuilder) {
    this.minDate = new Date();
   }


  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  ngOnInit(): void {
    for (let a = 0; a < this.potentialDepartureLocations.length; a++) {
      for (let b = 0; b < this.potentialArrivalLocations.length; b++) {
        for (let c = 0; c < this.seatsSelected.length; c++) {
          for (let d = 0; d < this.dates.length; d++) {
            for (let e = 0; e < this.airlines.length; e++) {
                for (let g = 0; g < this.flight_class.length; g++) {
                  for (let h = 0; h < this.round_options.length; h++) {
                      this.dummy_flights.push({
                    origin:this.potentialDepartureLocations[a],
                    destination:this.potentialArrivalLocations[b],
                    seatsSelected:this.seatsSelected[c],
                    dates:this.dates[d],
                    airline:this.airlines[e],
                    time:'1:00',
                    class:this.flight_class[g],
                    round_options:this.round_options[h],
                    connectingFlights:0,
                    price:100
                  })
                  }
                }
            }
          }
        }
      }
    }
    // this.filtered_flights.push(this.dummy_flights[0])
    console.log(this.dummy_flights)
  }
  
  getFloatLabelValue(event:any): any {
    console.log(event.value);
    this.flightType = event.value;
    this.notGood[4] = false;
    // console.log(this.floatLabelControl.value);
    // return this.floatLabelControl.value || 'auto';
  }

  changedepart(val: any) {
    if (val._selected){
      this.potentialDepartureLocation = val.value;
      this.arrivalIsDeparture = this.potentialDepartureLocation == this.potentialArrivalLocation;
      if(this.arrivalIsDeparture){
        this.notGood[0] = true;
      }else{
        if(this.potentialArrivalLocation != ''){
          this.notGood[1] = false;
        }
        this.notGood[0] = false;
      }
      
    }    
  }

  changearrival(val: any) {
    if (val._selected){
      this.potentialArrivalLocation = val.value;
      this.arrivalIsDeparture = this.potentialDepartureLocation == this.potentialArrivalLocation;
      if(this.arrivalIsDeparture){
        this.notGood[1] = true;
      }else{
        if(this.potentialDepartureLocation != ''){
          this.notGood[0] = false;
        }
        this.notGood[1] = false;
      }
    }    
  }

  changeseats(val: any) {
    if (val._selected){
      this.seatSelected = val.value;
      this.notGood[2] = false;
      console.log(this.seatSelected)
    }    
  }

  dateRangeChange(dateRangeStart: any,dateRangeEnd:any) {
    this.tsdateRangeStart = dateRangeStart;
    this.tsdateRangeEnd = dateRangeEnd;
    console.log(dateRangeEnd);
    console.log(dateRangeStart);
    this.notGood[3] = false;
  }

  async searchFlights(){
    this.progBarCondition = true;
    await this.delay(3000);
    console.log(this.dummy_flights[5].dates <= this.tsdateRangeEnd);
    console.log(this.dummy_flights[5].dates <= this.tsdateRangeStart);
    console.log(this.tsdateRangeStart);
    console.log(this.dummy_flights[5].dates);
    console.log(this.tsdateRangeEnd);
    for (let h = 0; h < this.dummy_flights.length; h++) {
      if (
        this.dummy_flights[h].origin == this.potentialDepartureLocation
        && this.dummy_flights[h].destination == this.potentialArrivalLocation
        && this.dummy_flights[h].seatsSelected == this.seatSelected
        // && (this.dummy_flights[h].dates <= this.tsdateRangeEnd && this.dummy_flights[h].dates >= this.tsdateRangeStart)
        ){
          this.filtered_flights.push(this.dummy_flights[h]);
        }
    }
    this.show_table = true;
    this.progBarCondition = false;
    if(this.filtered_flights.length == 0){
       
    }
  }

}
// !notGood[0] && !notGood[1] && !notGood[2] && !notGood[3] && !notGood[4]
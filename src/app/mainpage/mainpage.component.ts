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
  potentialDepartureLocation : string = 'Toronto';
  potentialArrivalLocation : string = '';
  seatSelected : string = '';
  arrivalIsDeparture = false;
  notGood = [true,true,true,true,true];
  tsdateRangeStart: any = new Date();
  tsdateRangeEnd:any = new Date();
  flightType = '';


  constructor(private _formBuilder: FormBuilder) {
    this.minDate = new Date();
   }


  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  ngOnInit(): void {
  }
  async searchFlights(){
    this.progBarCondition = true;
    await this.delay(1000);
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
    this.notGood[3] = false;
  }

}

import { Component } from '@angular/core';
import { GlobalComponent } from './global-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-third-proj';
  loggedin = GlobalComponent.loggedin;

  menuClicked(){
    if (GlobalComponent.loggedin){
      this.loggedin = true
    }
  }
}




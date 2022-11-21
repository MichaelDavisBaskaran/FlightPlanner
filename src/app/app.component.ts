import { Component } from '@angular/core';
import { GlobalComponent } from './global-component';
import { Router } from '@angular/router';
import { LOCALSTORAGE_TOKEN_KEY } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-third-proj';
  loggedin = GlobalComponent.loggedin;

  constructor(
    private router: Router
  ) { }

  menuClicked(){
    if (GlobalComponent.loggedin){
      this.loggedin = true
    }
  }

  logout() {
    // Removes the jwt token from the local storage, so the user gets logged out & then navigate back to the "public" routes
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
    this.router.navigate(['../']);
    GlobalComponent.loggedin = false;
    this.loggedin = false;
  }

}




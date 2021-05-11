import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router
  ) {
    this.initializeApp();
  }

  public initializeApp() 
  {
    /* this.platform.ready().then(() => {
      setTimeout(() => {
        SplashScreen.hide();
        this.router.navigateByUrl('splash-animado');
      }, 50);
    }); */
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { User } from '../shared/user.class';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: User = new User();
  

  constructor(private router: Router, private authSvc: AuthService, public alertCtrl: AlertController) {

    this.user.email = '';
    this.user.password = '';
    
   }

  ngOnInit() { }

  presentAlert() {
    let alert = this.alertCtrl.create({
      header: 'Error',
      subHeader: 'Email or password invalid',
      message: 'Try again',
      buttons: ['OK']
    }).then(res => {

      res.present();
    });
  }

  async onLogin() {

    document.getElementById('msjError').textContent = ''


    const user = await this.authSvc.onLogin(this.user)
    if (user) {
      console.log('Logueado!!');
      this.router.navigateByUrl('/principal');
    }
    else {

      if (!(this.user.email == '' || this.user.password == '')) {
        document.getElementById('msjError').style.animation = 'none';
        document.getElementById('msjError').offsetHeight;
        document.getElementById('msjError').style.animation = null;
        document.getElementById('msjError').textContent = 'USER NOT FOUND '
      }
      else if(this.user.email == '' || this.user.password == '') {
        document.getElementById('msjError').style.animation = 'none';
        document.getElementById('msjError').offsetHeight;
        document.getElementById('msjError').style.animation = null;
        document.getElementById('msjError').textContent = 'EMPTY FIELDS'
      }
      
    }

  }



  Clear() {
    this.user.email = '';
    this.user.password = '';
  }



}

import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { User } from '../shared/user.class';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  user: User = new User();
  titulo: string;
  

  constructor(private router: Router, private authSvc: AuthService, public alertCtrl: AlertController) {

    this.user.email = '';
    this.user.password = '';
    this.titulo = 'Administracion De Usuarios'
    
   }

  ngOnInit() { }


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
        document.getElementById('msjError').textContent = 'USUARIO NO ENCONTRADO'
      }
      else if(this.user.email == '' || this.user.password == '') {
        document.getElementById('msjError').style.animation = 'none';
        document.getElementById('msjError').offsetHeight;
        document.getElementById('msjError').style.animation = null;
        document.getElementById('msjError').textContent = 'CAMPOS VACIOS'
      }
      
    }

  }

  public LoginRapido() {
    this.user.email = "invitado@invitado.com";
    this.user.password = '123456';

  }


  Clear() {
    this.user.email = '';
    this.user.password = '';
  }



}

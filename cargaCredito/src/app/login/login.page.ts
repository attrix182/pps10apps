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
    this.titulo = 'Carga Crédito'
    
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





  Clear() {
    this.user.email = '';
    this.user.password = '';
  }

  public LoginRapido() {
    this.user.email = "invitado@invitado.com";
    this.user.password = '123456';

  }


  login_Admin(){
    this.user.email = "admin@admin.com";
    this.user.password = '111111';
    console.log('Iniciando login rapido, perfil Admin.' + '['+ Date.now() + ']');

  }
  login_Invitado(){
    this.user.email = "invitado@invitado.com";
    this.user.password = '222222';
    console.log('Iniciando login rapido, perfil Invitado.' + '['+ Date.now() + ']');

  }
  login_Usuario(){
    this.user.email = "usuario@usuario.com";
    this.user.password = '333333';
    console.log('Iniciando login rapido, perfil Usuario.' + '['+ Date.now() + ']');
  }
  login_Anonimo(){
    this.user.email = "anonimo@anonimo.com";
    this.user.password = '444444';
    console.log('Iniciando login rapido, perfil Anonimo.' + '['+ Date.now() + ']');

  }

  login_Tester(){
    this.user.email = "tester@tester.com";
    this.user.password = '555555';
    console.log('Iniciando login rapido, perfil Tester.' + '['+ Date.now() + ']');

  }

}

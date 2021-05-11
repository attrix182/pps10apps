import { Component, OnInit,Input, ViewChild } from '@angular/core';

//Validaciones y Alerts
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

///Login
import { User } from '../shared/User.class';
import { AuthService } from '../services/auth.service';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();
  titulo: string;
  mostrar:boolean;
  
  constructor(private router: Router, private authSvc: AuthService, public alertCtrl: AlertController) {

    this.user.email = '';
    this.user.password = '';
    this.titulo = 'Conversando en el aula'
    this.mostrar = false;
    
   }

  ngOnInit() { }

  mostrarBotones()
  {
    if(this.mostrar == true)
    {
      this.mostrar = false
    }
    else
    {
      this.mostrar = true
    }
console.log(this.mostrar)
    return this.mostrar;


  }

  async onLogin() {

    document.getElementById('msjError').textContent = ''


    const user = await this.authSvc.onLogin(this.user)
    if (user) {
      console.log('Logueado!!');
      this.router.navigateByUrl('/home');
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

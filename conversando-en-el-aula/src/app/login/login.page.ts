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

 
  @ViewChild('lista') lista: IonList;


  mostrar:boolean;
  titulo:string;


  constructor(
    private router: Router,
    private authSvc: AuthService,
    private formBuilder: FormBuilder,
  ) {    
     this.mostrar = false;
     this.titulo = 'Conversando en el aula'
     this.user.email = '';
     this.user.password = '';
    
  }



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

  @Input() user: User = new User();





  async onLogin() {
    // this.user.email = this.email.value;
    // this.user.password = this.password.value;
    const user = await this.authSvc.onLogin(this.user);
    if (user) {
      this.authSvc.currentUser = this.user;
      console.log(  this.authSvc.currentUser);
      this.router.navigateByUrl('/home');
    }
  }

  public submit() {
    //console.log(this.registrationForm.value);
  }
  ngOnInit() {
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
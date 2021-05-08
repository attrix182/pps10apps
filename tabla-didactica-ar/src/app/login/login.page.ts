import { Usuario } from './../clases/usuario';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../servicios/autentificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user:Usuario;
  public flag:boolean;


  constructor(private router:Router , private authSvc :AutentificacionService) 
  {
    this.user=new Usuario();
    this.flag=false;
  }

  ngOnInit(){}

  public async onLogin()
  {
    const user= await this.authSvc.onLogin(this.user);

    if(user)
    {
      this.router.navigate(["/home"],{replaceUrl: true});
      this.flag=false;
    }
    else
    {
      this.flag=true;
    }
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

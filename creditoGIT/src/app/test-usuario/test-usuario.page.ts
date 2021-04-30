import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { usuario } from '../models/usuario';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-test-usuario',
  templateUrl: './test-usuario.page.html',
  styleUrls: ['./test-usuario.page.scss'],
})
export class TestUsuarioPage implements OnInit {

  
  lista: Array<usuario> = new Array<usuario>();
  auxiliar: usuario;

  constructor(private auth: AuthService, public afAuth: AngularFireAuth, private router: Router, 
              public alertController: AlertController) { 
    this.lista = this.auth.Usuarios();
  }

  
  Ingresar(evento) {
    let opcion = evento.toElement.id;

    switch (opcion) {
      case "1":
        this.IngresoFirebase(this.lista[0]);        
        break;
      case "2":
        this.IngresoFirebase(this.lista[1]);        
        break;
      case "3":
        this.IngresoFirebase(this.lista[2]);        
        break;
      case "4":
        this.IngresoFirebase(this.lista[3]);        
        break;
      case "5":
        this.IngresoFirebase(this.lista[4]);        
        break;
      default:
        console.log("Error inesperado");
        break;
        
    }
    //this.router.navigateByUrl('home')
  }

  IngresoFirebase(user: usuario) {

    this.afAuth.signInWithEmailAndPassword(user.correo, user.clave)
      .then(this.paginaPrincipal(user.perfil)        

      ).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  paginaPrincipal(usuarioLogueado):any
  {
    this.IngresoCorrecto(usuarioLogueado)
    localStorage.setItem('usuarioActual',usuarioLogueado)        
    this.router.navigate(['/home'])
  }

  
private async IngresoCorrecto(correo: string) {

  const alert = await  this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Bienvenido/a',
    subHeader: correo,
    buttons: ['OK']
  });
  await alert.present();
  this.router.navigate(['/home']);

}

  ngOnInit() {
  }

}

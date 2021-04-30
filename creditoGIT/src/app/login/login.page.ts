import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { usuario } from '../models/usuario';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  lista: Array<usuario> = new Array<usuario>();
  loginForm = this.formBuider.group({
    correo: ['', 
    [
      Validators.required, 
      Validators.maxLength(40),
      Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
    ]],
    clave: ['', [
    
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(6)
    ]]
  })

  get correo() {
    return this.loginForm.get('correo')
  }
  get clave() {
    return this.loginForm.get('clave')
  }

  public errorMessages = {
    correo: [
     { type: 'required', message: 'El correo es obligatorio' },
     { type: 'maxlength', message: 'El correo no puede tener mas de 20 caracteres' } ],
    clave: [
     { type: 'required', message: 'La clave es obligatoria' },
     { type: 'maxlength', message: 'La clave no puede tener mas de 20 caracteres' },
     { type: 'minlength', message: 'La clave no puede tener menos de seis caracteres' } ],
 }

  public usuario:string;
  public contraseña:string;

  constructor(public afAuth: AngularFireAuth,private authService: AuthService, public navCtrl: NavController, public router: Router,
             public alertController: AlertController, public formBuider: FormBuilder) {
              this.lista = this.authService.Usuarios();
             }

  ngOnInit(): void {
    localStorage.clear();
  }

  user: usuario = new usuario('','','','','',);

   async Ingresar() {

    localStorage.setItem('correo', this.user.correo);
    const resp = await this.authService.OnLogin(this.user)
    .then(resp => { 
      this.IngresoCorrecto() })
    .catch(error => { 
      console.log(error.code);
     if (error.code === 'auth/user-not-found') {
      this.IngresoIncorrecto("Error de usuario", 'El usuario no existe')
     }
     if (error.code === 'auth/wrong-password') {
      this.IngresoIncorrecto("Error de contraseña", 'La contraseña es incorrecta')
     }
    })
 
}

private async IngresoCorrecto() {

  const alert = await  this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Bienvenido/a',
    subHeader: this.user.correo,
    buttons: ['OK']
  });
  await alert.present();
  this.router.navigate(['/home']);

}

private async IngresoIncorrecto(titulo:string, mensaje:string) {

  const alert = await this.alertController.create({
    animated: true,
    backdropDismiss: true,
    cssClass: 'my-custom-class',
    header: titulo,
    message: mensaje,
    buttons: ['OK']
  });
   await alert.present();
}

Registrar() {
  this.router.navigate(['/registro']);
}

 
IngresarTest(evento) {
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

  localStorage.setItem('correo', user.correo);
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
  localStorage.setItem('usuarioActual',usuarioLogueado)     
  this.IngresoCorrectoTest(usuarioLogueado)
       
  this.router.navigate(['/home'])
}

private async IngresoCorrectoTest(correo: string) {

  const alert = await  this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Bienvenido/a',
    subHeader: correo,
    buttons: ['OK']
  });
  await alert.present();
  this.router.navigate(['/home']);

}


}

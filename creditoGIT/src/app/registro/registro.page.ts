import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { usuario } from '../models/usuario';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormControl, FormGroup, ValidatorFn, AbstractControl, EmailValidator } from '@angular/forms'
import { AuthService } from '../servicios/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registrationForm = this.formBuider.group({
    nombre: ['', 
      [Validators.required, 
      Validators.maxLength(20), 
      Validators.pattern('^[a-z-A-Z\D]+$')
    ]],
    apellido: ['', 
    [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern('^[a-z-A-Z\D]+$')
    ]],
    email: ['', 
    [
      Validators.required, 
      Validators.maxLength(40),
      Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
    ]],
    clave:  ['', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(6)
    ]],
    repetirClave: ['', 
    [
      Validators.required,
      Validators.maxLength(20), 
      Validators.minLength(6)      
    ]]},
    {validator: this.MatchPassword }
  )

  get nombre() {
    return this.registrationForm.get('nombre');
  }
  get apellido() {
    return this.registrationForm.get('apellido');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get clave() {
    return this.registrationForm.get('clave');
  }
  get repetirClave() {
    return this.registrationForm.get('repetirClave');
  }
 

  public errorMessages = {
     nombre: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'maxlength', message: 'El nombre no puede tener mas de 20 caracteres' } ],
     apellido: [
      { type: 'required', message: 'El apellido es obligatorio' },
      { type: 'maxlength', message: 'El apellido no puede tener mas de 20 caracteres' } ],
     email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'maxlength', message: 'El email no puede tener mas de 20 caracteres' } ],
     clave: [
      { type: 'required', message: 'La clave es obligatoria' },
      { type: 'maxlength', message: 'La clave no puede tener mas de 20 caracteres' },
      { type: 'minlength', message: 'La clave debe tener al menos seis caracteres' } ],
      repetirClave: [
      { type: 'required', message: 'La confirmacion de la  clave es obligatoria' },
      { type: 'maxlength', message: 'La clave no puede tener mas de 20 caracteres' },
      { type: 'minlength', message: 'La clave debe tener al menos seis caracteres' },
      { type: 'MatchPassword', message: 'Las claves no coinciden' }
      ],
  }


 user: usuario = new usuario('','','','','');

  constructor(private authService: AuthService, private formBuider: FormBuilder,public alertController: AlertController,
              private auth: AngularFireAuth, private dataBase: AngularFireDatabase, private router: Router) { }


  ngOnInit() {

  }

  Registrar(form) { 


    if(form.value.clave !== form.value.repetirClave || form.value.repetirClave == undefined 
      || form.value.repetirClave == null || form.value.repetirClave == 'null' ) {
      // this.RegistroIncorrecto('Error en el registro', 'Las claves no coinciden');
      return;
    }

    this.authService.onRegister(this.user).then(resp => {
     this.CrearUsuarioEnDataBase(resp);
     this.RegistroCorrecto(this.user.correo);
   })
   .catch(error => {
    if (error.code === "auth/email-already-in-use") { 
      this.RegistroIncorrecto('Error en el registro', 'Ya existe un usuario con este email'); 
    } 
     }) 
    }

CrearUsuarioEnDataBase(resp: any) {

  this.dataBase.object('usuario/' +  resp.user.uid).set({
  usuario: this.user.correo,
  createAt: new Date(Date.now()).toLocaleDateString("en-AR") + '-' + new Date(Date.now()).toLocaleTimeString("en-AR")

}) 
}

  async RegistroCorrecto(email: string) {
    const alert = await  this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registracion exitosa',
      subHeader: email,
      buttons: ['OK']
    });
    await alert.present();
    this.router.navigate(['/login']);
  }

  public async RegistroIncorrecto(titulo:string, mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      subHeader: mensaje,
      buttons: ['OK']
    });
    await alert.present();
     this.router.navigate(['/registro']);
  }

  public areEqual(formGroup: FormGroup) {
    let val;
    let valid = true;
  
    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];
        if (val === undefined) {
          val = control.value
        } else {
          if (val !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }
    if (valid) {
      return null;
    }
    return {
      areEqual: true
    }
   }

   MatchPassword(AC: AbstractControl) {
    const newPassword = AC.get('clave').value // to get value in input tag
    const confirmPassword = AC.get('repetirClave').value // to get value in input tag
     if(newPassword != confirmPassword) {
         console.log('false');
         AC.get('repetirClave').setErrors( { MatchPassword: true } )
     } else {
         console.log('true')
         AC.get('repetirClave').setErrors(null);
     }
 }

 salir() {
  this.router.navigate(['/login']);
}

}

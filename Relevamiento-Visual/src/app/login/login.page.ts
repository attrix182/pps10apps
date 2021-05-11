import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuariosService } from '../services/usuarios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public unUsuario: Usuario;
  public userValid: boolean = true;
  notfound: number = 0;
  userForm: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioSrv: UsuariosService
  ) {
    this.unUsuario=new Usuario();
  }
  ngOnInit(): void {
    this.initForm();
  }
  onLogin() {
    this.unUsuario.correo=this.userForm.value.email;
    this.unUsuario.clave=this.userForm.value.password;
    if(this.usuarioSrv.verifyUsuarios(this.unUsuario)){
      this.usuarioSrv.obtenerUsuario(this.unUsuario.correo);
      this.router.navigateByUrl('/home');
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Usuario no Encontrado..',
      })
     }
  //this.usuarioSrv.createUsuario(this.unUsuario);
   }
  LoginAdmin() {
    this.userForm.setValue({email:'admin@admin.com',password:1111});
  }
  LoginInvitado(){
    this.userForm.setValue({email:'invitado@invitado.com',password:2222});
  }
  LoginUsuario(){
    this.userForm.setValue({email:'usuario@usuario.com',password:3333});
  }
  LoginAnonimo(){
    this.userForm.setValue({email:'anonimo@anonimo.com',password:4444});
  }
  LoginTester(){
    this.userForm.setValue({email:'tester@tester.com',password:5555});
  }
  isValidField(field: string): string {
    const validateField = this.userForm.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
      ? 'is-valid'
      : '';
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
}

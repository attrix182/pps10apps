import { Usuario } from './../clases/usuario';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  public isLogged:any = false;
  constructor( public afAuth : AngularFireAuth) 
  { 
     afAuth.authState.subscribe(user => ( this.isLogged =user));
  }

  async onLogin(user:Usuario)
  {
    try {
      return await this.afAuth.signInWithEmailAndPassword(user.email, user.password)

    } catch (error) {
      console.log(error);
    }
  }
}

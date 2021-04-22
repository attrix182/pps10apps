import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
//import { AngularFireAuth } from 'angularfire2/auth';
import {User} from '../shared/user.class';

//import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public isLogged: any = false;


  constructor(public afAuth: AngularFireAuth) {

    afAuth.authState.subscribe(user => (this.isLogged = user));
  }



  async onLogin(user: User) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(user.email, user.password)
    } catch (error) {
      console.log('ERROR', error)
    }

  }

}
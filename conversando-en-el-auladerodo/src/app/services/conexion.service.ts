import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {Mensaje} from '../shared/mensaje';

import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  ///RealTime
  referenciaAlaColeccionRTaulaA: AngularFireList<Mensaje>;
  referenciaAlaColeccionRTaulaB: AngularFireList<Mensaje>;

  michat:any[]=[];


  constructor(private db : AngularFireDatabase) { 
    //RT
    this.referenciaAlaColeccionRTaulaA = db.list('mensajes4a');
    this.referenciaAlaColeccionRTaulaB = db.list('mensajes4b');
  }

  ///RT
 
  CrearUnoRT (collection: string,mensaje:Mensaje): any {
    if(collection == "mensajes4a"){
      return this.referenciaAlaColeccionRTaulaA.push(mensaje);
    }
    if(collection == "mensajes4b"){
      return this.referenciaAlaColeccionRTaulaB.push(mensaje);
    }
  }


  TraerChat(collection: string): AngularFireList<Mensaje>{
    if(collection== "mensajes4a"){
      return this.referenciaAlaColeccionRTaulaA;
    }
    if(collection== "mensajes4b"){
      return this.referenciaAlaColeccionRTaulaB;
    }
  }


  ObtenerTodos()
  {
    var chat =firebase.default.database().ref().child("mensajes4a");
    chat.on('child_added',datos=>{
      //console.log(datos);
      this.michat.push(datos);
      ///console.log(this.michat);
    })
    return this.michat.reverse();
  }

}

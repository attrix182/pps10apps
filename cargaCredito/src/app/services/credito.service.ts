import { Creditos } from './../clases/creditos';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  rutaDeLaColeccion = '/users';
  referenciaAlaColeccion: AngularFireList<Creditos>;



  constructor(private bd: AngularFireDatabase) {

    this.referenciaAlaColeccion = bd.list(this.rutaDeLaColeccion);


  }


  Cargar(credito: Creditos): any {
    
    return this.referenciaAlaColeccion.update('3',  { credito: credito.credito });

  }

  public TraerTodos() {
    return this.referenciaAlaColeccion
  }




  public BuscarCredito(credito: Creditos) {
    return this.referenciaAlaColeccion.push(credito);
  }


}
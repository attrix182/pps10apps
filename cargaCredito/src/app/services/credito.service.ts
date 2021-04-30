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

    var carga = credito.id.toString();

    return this.referenciaAlaColeccion.update(carga, { credito: credito.credito});

  }

  public TraerTodos():AngularFireList<Creditos> {
    return this.referenciaAlaColeccion;
  }

  traerCredito() {
    //? Que base de datos afectaremos? Jugadores.
    //? El id del jugador que deseamos eliminar.
    this.bd.list('/users').snapshotChanges();

  }

  public BuscarCredito(credito: Creditos) {
    return this.referenciaAlaColeccion.push(credito);
  }


}
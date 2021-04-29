import { Creditos } from './../clases/creditos';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore/';


@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  rutaDeLaColeccion = '/credito';
  referenciaAlaColeccion: AngularFirestoreCollection<Creditos>;
  referenciaBd: AngularFirestore;


  constructor(private bd: AngularFirestore) {
    this.referenciaBd = bd;
    this.referenciaAlaColeccion = bd.collection(this.rutaDeLaColeccion);

  }


  Crear(credito: Creditos): any {
    
    return this.referenciaAlaColeccion.add({ ...credito });

  }

  public TraerTodos() {
    return this.referenciaAlaColeccion;
  }


  public BuscarActor(credito: Creditos) {
    return this.referenciaBd.collection(this.rutaDeLaColeccion, ref => ref.where("usuario", "==", credito.usuario));
  }


}
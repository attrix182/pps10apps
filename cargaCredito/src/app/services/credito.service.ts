import { Creditos } from './../clases/creditos';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { NumericValueAccessor } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  rutaDeLaColeccion = '/users';
  referenciaAlaColeccion: AngularFireList<Creditos>;
  saldo:any

  public userLog:any;


  constructor(private bd: AngularFireDatabase) {

    this.referenciaAlaColeccion = bd.list(this.rutaDeLaColeccion);


  }


  Cargar(credito: Creditos): any {

    var carga = credito.id.toString();

    return this.referenciaAlaColeccion.update(carga, { credito: credito.credito}),
     this.referenciaAlaColeccion.update(carga, { cargo10: credito.cargo10 }),
     this.referenciaAlaColeccion.update(carga, { cargo50: credito.cargo50 }),
     this.referenciaAlaColeccion.update(carga, { cargo100: credito.cargo100 });

  }

  public TraerTodos(): AngularFireList<Creditos> {
    return this.referenciaAlaColeccion;
  }
  
  traerCredito(id:number)  {

    this.bd.object('users/'+id).valueChanges().subscribe(val =>{ 
  //  console.log(val);
    this.userLog = val;
  });


}
    
test()  {

  return 1;

}

  public BuscarCredito(credito: Creditos) {
  return this.referenciaAlaColeccion.push(credito);
}


retornoUser(user:any):Creditos
{
return user;
}


}
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ConexionService } from '../services/conexion.service';


import { AlertController } from '@ionic/angular';
import { Mensaje } from '../shared/mensaje';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.page.html',
  styleUrls: ['./main-app.page.scss'],
})
export class MainAppPage implements OnInit {

  aulaSeleccionada = "";
  @Input() usuarioActual: string = "algo";
  mensaje: string;

  ////
  listaMensajes :Observable<any[]>;

  chats: any[];

  fecha: string;
  fechaAux =  new Date();

  mensajeRT: Mensaje;

  private contador = 0; 

  constructor(
    private conexion: ConexionService,
    private auth: AuthService,
    private alertController: AlertController
  ) { 
    this.mensajeRT = new Mensaje();
    this.mensajeRT.usuario = this.auth.currentUser.email;

    this.usuarioActual = this.auth.currentUser.email;
    this.aulaSeleccionada = this.auth.currentUser.aula;
    this.chats = this.conexion.ObtenerTodos();
  }

  ngOnInit() {
    this.ObtenerMensajes();
  }

  ObtenerMensajes(){
    this.listaMensajes = this.conexion.TraerChat(this.auth.currentUser.aula).valueChanges();
  }


  EnviarMensaje(){
    let mes = this.fechaAux.getMonth();
    mes++;
    this.fecha = this.fechaAux.getDate() + '/' + mes + '/' + this.fechaAux.getFullYear() + '  ' + this.fechaAux.getHours() + ':' + this.fechaAux.getMinutes();
    this.mensajeRT.dia = this.fecha;
    this.mensajeRT.mensaje = this.mensaje;
    this.conexion.CrearUnoRT(this.auth.currentUser.aula,this.mensajeRT);
    //this.conexion.CreateMessages(this.auth.currentUser.aula, { "nombre" : this.usuarioActual, "mensaje": this.mensaje, "dia": this.fecha.toString()});
    this.mensaje = "";
    this.ObtenerMensajes();
  }

  ///CONTADOR DE CARACTERES
  async onKey(event){
    this.contador = event.target.value.length;
    //console.log(this.contador);
    if(this.contador >= 21){
      this.alertCaracteres();
      this.mensaje = "";
    }
  }

  async alertCaracteres(){
    const alert = await this.alertController.create({
      header: 'Caracteres excedidos!',
      message: 'El mensaje no puede tener mas de 21 caracteres',
      buttons: ['OK'],
    
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }



  doRefresh(event) {
    setTimeout(() => {
      this.chats.splice(0, this.chats.length)
      this.chats = this.conexion.ObtenerTodos();
      console.log(this.chats)
      event.target.complete();
    }, 2000);
  }
}

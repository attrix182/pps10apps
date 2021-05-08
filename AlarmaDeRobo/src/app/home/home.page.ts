import { Component, OnInit } from '@angular/core';

///Imports para controlar
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';


import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  ///HTML
  showDialog: boolean = false;
  estado = '';
  clave = '';
  presionado:boolean= false;

  //Sonidos
  audioIzquierda = "../../assets/sonidos/audioIzquierda.mp3";
  audioDerecha = "../../assets/sonidos/audioDerecha.mp3";
  audioVertical = "../../assets/sonidos/audioVertical.mp3";
  audioHorizontal = "../../assets/sonidos/audioHorizontal.mp3";
  audio = new Audio();

  ///DESARROLLAR
  ClaveErroreas = 0;
  subscription: any;

  //Ingresos para flash
  primerIngreso: boolean = true;
  primerIngresoFlash: boolean = true;

  //ORIENTACION
  posicionActualCelular = 'actual';
  posicionAnteriorCelular = 'anterior';

  mostrarDialog: boolean = true;



  // Inclinacion
  accelerationX: any;
  accelerationY: any;
  accelerationZ: any;

  constructor(
    private screenOrientation: ScreenOrientation,
    private deviceMotion: DeviceMotion,
    private flashlight: Flashlight,
    private authService: AuthService,
    private vibration: Vibration
  ) { 
  }

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
  }

  btnActivarODesactivar(){
    if(this.presionado){
      this.showDialog = true;
      if(this.clave == this.authService.currentUser.password){//Comparacion de usuario registrado con la clave ingresada recientemente
        this.estado = 'permitido';
        setTimeout(() => {
          this.presionado = false;
          this.estado = "";
          this.clave = "";
          this.showDialog = false;
          this.parar(); ///Paro la subscripcion al acceleration
          this.ClaveErroreas = 0;
        }, 1000);
      }
      else if(this.clave != ''){
        this.ClaveErroreas++;
        this.estado = 'denegado';
        setTimeout(() => {
          this.estado = "";
        }, 1000);
        if(this.ClaveErroreas > 2){
          this.audio.src = this.audioIzquierda;
          this.audio.play();
        }
      
      }
    }
    else{ 
      this.presionado = true;
      this.comenzar();
    }
  }

  parar() {
    this.mostrarDialog = true;
    this.primerIngreso = true;
    this.subscription.unsubscribe();
  }

  comenzar(){
    

    this.subscription = this.deviceMotion.watchAcceleration({ frequency: 300 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.accelerationX = Math.floor(acceleration.x);
      this.accelerationY = Math.floor(acceleration.y);
      this.accelerationZ = Math.floor(acceleration.z);

      if(acceleration.x > 5){
        //Inclinacion Izquierda
        
        this.posicionActualCelular = 'izquierda';
        this.movimientoIzquierda();
      }
      else if (acceleration.x < -5) {
        //Inclinacion Derecha
        
        this.posicionActualCelular = 'derecha';
        this.movimientoDerecha();        
      }
      else if (acceleration.y >= 9) {
        //encender flash por 5 segundos y sonido
        this.posicionActualCelular='arriba';
        
        if ((this.posicionActualCelular!=this.posicionAnteriorCelular)) {
          this.audio.src = this.audioVertical;
          this.posicionAnteriorCelular = 'arriba';
        }
        this.audio.play();
        this.movimientoVertical();
      }

      else if (acceleration.z >= 9 && (acceleration.y >= -1 && acceleration.y <= 1) && (acceleration.x >= -1 && acceleration.x <= 1)) {
        //acostado vibrar por 5 segundos y sonido
        this.posicionActualCelular='plano';
        this.movimientoHorizontal();
      }


    });
  }


  movimientoIzquierda(){
    this.primerIngreso = false;
    this.primerIngresoFlash = true;
    if(this.posicionActualCelular!=this.posicionAnteriorCelular){
      this.posicionAnteriorCelular = 'izquierda';
      this.audio.src = this.audioIzquierda;
    }
    this.audio.play();
  }

  movimientoDerecha(){
    this.primerIngreso = false;
    this.primerIngresoFlash = true;
    if(this.posicionActualCelular!= this.posicionAnteriorCelular){
      this.posicionAnteriorCelular = 'derecha';
      this.audio.src = this.audioDerecha;
    }
    this.audio.play();
  }

  movimientoVertical(){
    if(this.primerIngresoFlash){
      this.primerIngresoFlash ? this.flashlight.switchOn() : null;
      setTimeout(() => {
        this.primerIngresoFlash = false;
        this.flashlight.switchOff();
      }, 5000);
      this.primerIngreso = false;
    }
  }

  movimientoHorizontal(){
    if(this.posicionActualCelular!=this.posicionAnteriorCelular){
      this.posicionAnteriorCelular='plano';
      this.audio.src = this.audioHorizontal;
    }

    this.primerIngreso ? null : this.audio.play();
    this.primerIngreso ? null : this.vibration.vibrate(5000);
    this.primerIngreso = true;
    this.primerIngresoFlash = true;
  }


  cancelarDesactivar()
  {

    return this.showDialog = false;
  }

}
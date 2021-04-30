import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {BarcodeScannerOptions, BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { AlertController } from '@ionic/angular';

// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
// import {BarcodeScanner,BarcodeScannerOriginal, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import * as firebase from 'firebase';
import { exit } from 'process';
import { Creditos } from '../models/creditos';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public mostrar = true;
  public creditoActual: number = 0;
  public mensajeAlerta: string = "Sin mensaje actual";
  public usuarioActual: string = "";
  public creditos: Array<Creditos> = new Array<Creditos>();
  public creditosPorUsuario: Array<Creditos>;
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private router: Router, private barcodeScanner: BarcodeScanner, 
             private alertController: AlertController, private authService: AuthService) {
    this.usuarioActual = localStorage.getItem('usuarioActual');
    this.obtenerDatos();

    this.freno(300).then(() => {
      this.mostrar = false;
    });
  }

  ngOnInit() {
    this.usuarioActual = localStorage.getItem('usuarioActual');
    this.obtenerDatos();

    
    // this.guardarCredito({usuario: "admin", credito: 10, codigo: "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172" });
     //this.ValidarCodigoUnico({usuario: "admin", credito: 10, codigo: "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172" })

  }

  cargarCredito() {

    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.scannedData = barcodeData;
        let codigo = this.scannedData["text"]

        switch (codigo) { 
          case "8c95def646b6127282ed50454b73240300dccabc":
            this.ValidarCodigoUnico(new Creditos(this.usuarioActual, 10, this.scannedData["text"]));
            // this.guardarCredito(new Creditos(this.usuarioActual, 10, this.scannedData["text"]));
            break;
          case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
            this.ValidarCodigoUnico(new Creditos(this.usuarioActual, 100, this.scannedData["text"]));
            // this.guardarCredito(new Creditos(this.usuarioActual, 100, this.scannedData["text"]));
            break;
          default: 
          this.ValidarCodigoUnico(new Creditos(this.usuarioActual, 50, this.scannedData["text"]));
        }
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  ValidarCodigoUnico(objCredito: Creditos) {
    
    this.obtenerDatos();

    if (this.usuarioActual !== 'admin') {      
      
      if(this.creditos.length == 0) {
        this.guardarCredito(objCredito);
        exit();
      }
      
         this.creditos.forEach(resp => {  
         if (resp.codigo == objCredito.codigo) {
          this.CargaDuplicada('No puede cargar DOS veces el mismo código');
          exit();    
        }
      })
      this.guardarCredito(objCredito);
      exit();
      }      

      if (this.usuarioActual == 'admin') { 

        if(this.creditos.length == 0) {
          this.guardarCredito(objCredito);
          exit();
        }
        
        this.creditos.forEach(resp => {  

        //  if (resp.codigo != objCredito.codigo && this.ContarCargasDeAdmin(this.creditosPorUsuario, resp.codigo)) {
        //   this.guardarCredito(objCredito);
        //   exit();  
        // } else if (resp.codigo == objCredito.codigo && this.ContarCargasDeAdmin(this.creditosPorUsuario, resp.codigo)) {
        //   this.guardarCredito(objCredito);
        //   exit();       
        // } else
         if (resp.codigo == objCredito.codigo && !this.ContarCargasDeAdmin(this.creditos, resp.codigo)) {
          this.CargaDuplicada('No puede cargar TRES veces el mismo código');
          exit();
        } 
      })
      this.guardarCredito(objCredito);
      exit();
    }     
      
  }

  ContarCargasDeAdmin(creditosAdmin: Array<Creditos>, codigo:string): boolean {

    var contadorDeCargasDeCreditoAdmin = 0;
    creditosAdmin.forEach(resp => {
     
      if (resp.codigo == codigo) {
        contadorDeCargasDeCreditoAdmin += 1;
      }
    })

    if (contadorDeCargasDeCreditoAdmin >= 2) {
      return false;
    } else { 
      return true;
    }
  }


  guardarCredito(objetoCredito: Creditos) {

    var usuariosRef = firebase.database().ref('creditos/' + objetoCredito.usuario);
    usuariosRef.push({ usuario: objetoCredito.usuario, 
                       codigo: objetoCredito.codigo,
                       credito: objetoCredito.credito }).then(() => {                 
                       this.CargaExitosa(objetoCredito);
                       this.obtenerDatos();
                       
    }).catch(error => {
      this.CargaFallida(error.message);
    });
  
  }

  obtenerDatos() {
      this.creditos = new Array<Creditos>();
   
      var starCountRef = firebase.database().ref('creditos/' + this.usuarioActual);

      starCountRef.on('value', (snap) => {
        var data = snap.val(); 
        for(var key in data ) {
          this.creditos.push(data[key]); 
        }
      })      
    this.MostrarCargaCredito();
  }

  MostrarCargaCredito() { 

    var contadorCredito = 0;
    // this.CargarArrayCreditosPorUsuario();
    this.creditos.forEach(resp => {
      if (resp.usuario == this.usuarioActual) {
         contadorCredito += resp.credito;
      }

    })
    this.creditoActual = contadorCredito;
  }

  borrarCredito() {

      var usuariosRef = firebase.database().ref("creditos/" +  this.usuarioActual);
      usuariosRef.remove().then(resp => {
        this.creditoActual = 0;
        this.BorradoExitoso('Cargas borradas');
      });

  }

  salir() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  async freno(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

  public async CargaExitosa(credito: Creditos) {

    const alert = await  this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Carga exitosa',
      subHeader: 'Se acreditó ' + credito.credito + ' en el usuario ' + credito.usuario,
      buttons: ['OK']
    });
    await alert.present();
    this.router.navigate(['/home']);
  }

  public async CargaFallida(mensaje: string) {
    const alert = await  this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: mensaje,
      buttons: ['OK']
    });
    await alert.present();
    this.salir();
    // this.router.navigate(['/login']);
  }

  public async CargaDuplicada(mensaje: string) {

    const alert = await  this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: mensaje,
      buttons: ['OK']
    });
    await alert.present();
    this.salir();
    // this.router.navigate(['/login']);
  }

  public async BorradoExitoso(mensaje: string) {

    const alert = await  this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Borrado Exitoso',
      subHeader: mensaje,
      buttons: ['OK']
    });
    await alert.present();
    this.salir();
    // this.router.navigate(['/login']);
  }

}
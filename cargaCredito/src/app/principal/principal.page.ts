import { Creditos } from './../clases/creditos';
import { CreditoService } from './../services/credito.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  public unUsuario: Creditos;
  public monto: number;
  esconder: boolean;
  encodedData: any;
  scannedBarCode: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  public saldo: Creditos;

  usuarioLogeado: any;

  constructor(private router: Router, private scanner: BarcodeScanner, private creditoSvc: CreditoService, public toastController: ToastController) {
    this.unUsuario = new Creditos();

    this.unUsuario.usuario = localStorage.getItem('user');

    this.unUsuario.id = this.asignarIDUsuario();

    creditoSvc.traerCredito(this.unUsuario.id);

    this.esconder = false; //PUSE TRUE
    this.encodedData = "Programming isn't about what you know";

    console.log(this.unUsuario)

    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };


  }

  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Ese codigo ya fue redimido.',
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-custom-class'
    });
    toast.present();
  }





  scanBRcode() {
    this.scanner.scan().then(res => {
      this.scannedBarCode = res;
      this.monto = this.MontoQR(this.scannedBarCode["text"]);

    }).catch(err => {
      alert(err);
    });
  }





  ngOnInit() { }




  Logout() {
    localStorage.removeItem('user');

    this.esconder = false; //PUSE TRUE
    this.monto = 0;
    this.unUsuario.id = -1;
    this.unUsuario.usuario = "nadie";
    this.unUsuario.credito = 0;
    this.unUsuario.cargo10 = 0;
    this.unUsuario.cargo100 = 0;
    this.unUsuario.cargo50 = 0;
    console.log(this.unUsuario)
    this.router.navigateByUrl('/');


  }

  mostrarCredito() {
    this.unUsuario.credito = this.creditoSvc.userLog.credito
    console.log(this.unUsuario.credito)

    this.unUsuario.cargo10 = this.creditoSvc.userLog.cargo10
    console.log(this.unUsuario.credito)

    this.unUsuario.cargo50 = this.creditoSvc.userLog.cargo50
    console.log(this.unUsuario.credito)

    this.unUsuario.cargo100 = this.creditoSvc.userLog.cargo100
    console.log(this.unUsuario.credito)



  }


  esconderCreditos() {

    this.mostrarCredito();
    return this.esconder = !this.esconder;
  }

  asignarIDUsuario() {
    var correo = this.unUsuario.usuario

    switch (correo) {

      case "admin@admin.com":
        return 0;
        break;
      case "invitado@invitado.com":
        return 1;
        break;
      case "usuario@usuario.com":
        return 2;
        break;
      case "anonimo@anonimo.com":
        return 3;
        break;
      case "tester@tester.com":
        return 4;
        break;
      default:
        return 50;
    }

  }



  eliminarCreditos() {
    this.unUsuario.cargo10 = 0;
    this.unUsuario.cargo100 = 0;
    this.unUsuario.cargo50 = 0;
    this.unUsuario.credito = 0;

    this.creditoSvc.Cargar(this.unUsuario).then(() => {
      //  this.unUsuario.credito = 0;
      console.log('se envio la recarga');
    });
  }

  MontoQR(codigo: string): number {

    switch (codigo) {

      case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
        return 100;
        break;
      case "8c95def646b6127282ed50454b73240300dccabc":
        return 10;
        break;
      case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ":
        return 50;
        break;
        default:
          return 0;
          break;
    }

  }

  CargarCredito() {

    this.unUsuario.credito = this.unUsuario.credito + this.monto;


    if (!(this.unUsuario.id == 0)) {

      switch (this.monto) {

        case 100:
          if (this.unUsuario.cargo100 == 0) {

            this.unUsuario.cargo100 = 1;

            this.creditoSvc.Cargar(this.unUsuario).then(() => {
              console.log('se envio la recarga');
            });
          } else {

            this.unUsuario.credito = this.unUsuario.credito - this.monto;
            this.presentToast();

          }
          break;

        case 50:
          if (this.unUsuario.cargo50 == 0) {

            this.unUsuario.cargo50 = 1;

            this.creditoSvc.Cargar(this.unUsuario).then(() => {
              console.log('se envio la recarga');
            });
          } else {
            this.unUsuario.credito = this.unUsuario.credito - this.monto;
            this.presentToast();
          }
          break;

        case 10:
          if (this.unUsuario.cargo10 == 0) {

            this.unUsuario.cargo10 = 1;

            this.creditoSvc.Cargar(this.unUsuario).then(() => {
              console.log('se envio la recarga');
            });
          } else {
            this.unUsuario.credito = this.unUsuario.credito - this.monto;
            this.presentToast();
          }
          break;

        default:
          return 0;

      }
    }
    else {

      switch (this.monto) {

        case 100:
          if (this.unUsuario.cargo100 == 0) {

            this.unUsuario.cargo100 = 1;
            this.creditoSvc.Cargar(this.unUsuario).then(() => {
              console.log('se envio la recarga');            
              this.monto = 0;
            });
          } else if (this.unUsuario.cargo100 == 1) {

            this.unUsuario.cargo100 = 2;
            this.creditoSvc.Cargar(this.unUsuario).then(() => {
              console.log('se envio la recarga');
              this.monto = 0;
            });

          } else {

            this.unUsuario.credito = this.unUsuario.credito - this.monto;

            this.presentToast();

          }
          break;

        case 50:
          if (this.unUsuario.cargo50 == 0) {

            this.unUsuario.cargo50 = 1;

            this.creditoSvc.Cargar(this.unUsuario).then(() => {
              console.log('se envio la recarga');
              this.monto = 0;
            });
          } else if (this.unUsuario.cargo50 == 1) {

            this.unUsuario.cargo50 = 2;
            this.creditoSvc.Cargar(this.unUsuario).then(() => {
              console.log('se envio la recarga');
              this.monto = 0;
            });

          }
          else {
            this.unUsuario.credito = this.unUsuario.credito - this.monto;
            this.presentToast();
          }
          break;

        case 10:
          if (this.unUsuario.cargo10 == 0) {

            this.unUsuario.cargo10 = 1;

            this.creditoSvc.Cargar(this.unUsuario).then(() => {
              console.log('se envio la recarga');
              this.monto = 0;
            });
          } else if (this.unUsuario.cargo10 == 1) {

            this.unUsuario.cargo10 = 2;
            this.creditoSvc.Cargar(this.unUsuario).then(() => {
              console.log('se envio la recarga');
              this.monto = 0;
            });

          } else {
            this.unUsuario.credito = this.unUsuario.credito - this.monto;
            this.presentToast();
          }
          break;

        default:
          return 0;

      }
    }
  }




  

}


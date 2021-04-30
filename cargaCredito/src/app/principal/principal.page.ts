import { Creditos } from './../clases/creditos';

import { CreditoService } from './../services/credito.service';
import { Usuario } from './../clases/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";
import { Observable } from 'rxjs';


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

  constructor(private router: Router, private scanner: BarcodeScanner, private creditoSvc: CreditoService) {
    this.unUsuario = new Creditos();
    this.unUsuario.usuario = localStorage.getItem('user');
    //  this.unUsuario.credito = 500;
    this.esconder = true;

    this.encodedData = "Programming isn't about what you know";

    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }


  scanBRcode() {
    this.scanner.scan().then(res => {
      this.scannedBarCode = res;
      this.monto = this.MontoQR(this.scannedBarCode["text"] );
      
    }).catch(err => {
      alert(err);
    });
  }

  ngOnInit() {
  }

  Logout() {
    this.router.navigateByUrl('/');
  }

  mostrarCredito()
{

}


  esconderCreditos() {

    return this.esconder = !this.esconder;
  }

  eliminarCreditos() {

    this.unUsuario.credito = 0;
  }

  MontoQR(codigo: string): number {

    switch (codigo) {

      case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
        return 100;
        break;
      case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172":
        return 50;
        break;
      case "8c95def646b6127282ed50454b73240300dccabc":
        return 10;
        break;
      default:
        return 0;
    }

  }

  CargarCredito() {



    this.unUsuario.credito = this.unUsuario.credito + this.monto;


    this.creditoSvc.Cargar(this.unUsuario).then(() => {
     //  this.unUsuario.credito = 0;
      console.log('se envio la recarga');

    });


  }




}
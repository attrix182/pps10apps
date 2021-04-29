import { Usuario } from './../clases/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  public unUsuario: Usuario;
  esconder: boolean;

  encodedData: any;
  scannedBarCode: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private router: Router,private scanner: BarcodeScanner) {
    this.unUsuario = new Usuario();
    this.unUsuario.credito = 500;
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
      }).catch(err => {
        alert(err);
      });
  }

  ngOnInit() {
  }

  Logout() {
    this.router.navigateByUrl('/');
  }


  esconderCreditos() {

    return this.esconder = !this.esconder;
  }

  eliminarCreditos() {

    this.unUsuario.credito = 0;
  }


}
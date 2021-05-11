import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-mis-fotos',
  templateUrl: './mis-fotos.page.html',
  styleUrls: ['./mis-fotos.page.scss'],
})
export class MisFotosPage implements OnInit {

  title;
  verFotosLindas: boolean;
  imagenesRT: any[];
  flag = false;

 

  user:Usuario;

  constructor(private router: Router, public photoService: PhotoService, public usuarioSrv: UsuariosService) {
    
    this.user = <Usuario>JSON.parse(localStorage.getItem('user'));
    
    if (this.router.url === '/lista/cosasLindas') {
      this.title = 'Mis Fotos';
      this.verFotosLindas = true
    } else {
      this.title = 'Mis Fotos';
      this.verFotosLindas = false
    }
 
    this.imagenesRT = this.photoService.ObtenerTodos().reverse();
  


  }

  ngOnInit() {
    setTimeout(() => {

      this.imagenesRT.splice(0, this.imagenesRT.length)
      this.imagenesRT = this.photoService.ObtenerTodos();
      this.imagenesRT.reverse()

    }, 100);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.imagenesRT.splice(0, this.imagenesRT.length)
      this.imagenesRT = this.photoService.ObtenerTodos();
      this.imagenesRT.reverse()
      event.target.complete();
    }, 1000);
  }





}

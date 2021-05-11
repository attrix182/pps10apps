import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../models/usuario';


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {
  title:string;
  emoji:string;
  verFotosLindas: boolean;
  imagenesRT: any[];
  flag = false;
  constructor(private router: Router, public photoService: PhotoService, public usuarioSrv: UsuariosService) {
    if (this.router.url === '/lista/cosasLindas') {
      this.title = 'Cosas Lindas';
      this.emoji = '✔️';
      this.verFotosLindas = true
    } else {
      this.title = 'Cosas Feas';
      this.emoji = '❌';
      this.verFotosLindas = false
    }
    this.imagenesRT = this.photoService.ObtenerTodos().reverse();
  }

  ngOnInit() {
    setTimeout(() => {
      this.imagenesRT.reverse()
    }, 1550);

  }

  doRefresh(event) {
    setTimeout(() => {
      this.imagenesRT.splice(0, this.imagenesRT.length)
      this.imagenesRT = this.photoService.ObtenerTodos();
      this.imagenesRT.reverse()
      event.target.complete();
    }, 1000);
  }

  addPhotoToGallery() {
    this.photoService.sacarFoto().then((val) => {
      this.flag = true
      this.doRefresh(true);
    });


  }

  public cambiarFoto(unaFoto): string {
    let retorno = 'thumbs-up-outline';
    let user = <Usuario>JSON.parse(localStorage.getItem('user'));
    this.imagenesRT.forEach(function (unaImagen) {
      if (unaImagen.referencia == unaFoto.referencia) {
        unaImagen.like.forEach(element => {
          if (element == user.correo) {
            retorno = 'thumbs-up';
          }
        });
      }
    })
    return retorno;
  }


  public setLike(unaFoto) {
    let user = <Usuario>JSON.parse(localStorage.getItem('user'));
        for (let index = 0; index < unaFoto.like.length; index++) {
          var i = unaFoto.like.indexOf(user.correo);
          if (i==-1) {
              console.log("eaaa di like perry")
              unaFoto.votos++;
              unaFoto.like.push(user.correo);
              break;
          }
          if (i>-1) {
            unaFoto.votos--;
            unaFoto.like.splice(i, 1);
            console.log(unaFoto.like)
            break;
          }
        }
    this.photoService.modificarFoto(unaFoto, unaFoto.id)
  }
}

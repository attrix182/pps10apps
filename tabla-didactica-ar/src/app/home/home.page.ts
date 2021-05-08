import { Component } from '@angular/core';
import { Idioma,EtipoJuego, EtipoIdioma } from '../clases/idioma/idioma';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public manejadora:Idioma;
  public tipoJuego:string;
  

  constructor() 
  {
     this.manejadora = new Idioma();
  }

  public Reproducir (pathSonido:string) {
    
    
    let audio = new Audio();
    console.log(pathSonido);
    audio.src = pathSonido;
    
    audio.load();
    audio.play();
  }

  public CambiarIdioma(idioma:string)
  {
      switch (idioma) 
      {
        case "español":
          this.manejadora.Español();
          break;
        case "ingles":
          this.manejadora.Ingles();
          break;
        case "portugues":
          this.manejadora.Portugues();
          break;
      
      }
  }

  public CambiarJuego(tipoJuego:string)
  { 
    switch (tipoJuego) {
      case "colores":
        this.manejadora.tipoJuego=EtipoJuego.colores;
        break;
      case "numeros":
        this.manejadora.tipoJuego=EtipoJuego.numeros;
        break;
      case "animales":
        this.manejadora.tipoJuego=EtipoJuego.animales;
        break;      
    }
    this.CambiarIdioma(EtipoIdioma[this.manejadora.idiomaActual]);

  }


}


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router) {}

  cosasLindas(){
    localStorage.setItem('lindo','true');
    this.router.navigateByUrl('/lista/cosasLindas')
  }

  cosasFeas(){
    localStorage.setItem('lindo','false');
    this.router.navigateByUrl('/lista/cosasFeas')
  }

}

import { Component ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @Input() error: string = "";

  constructor(
    private router: Router,
    private auth : AuthService
  ) {}

  elegirAula(aula:any) {
    //descomentar hasta de hacer el apk
    this.auth.currentUser.aula=aula;
    this.router.navigateByUrl('main-app');
    console.log(aula);
  }

} 

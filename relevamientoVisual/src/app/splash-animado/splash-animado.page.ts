import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-animado',
  templateUrl: './splash-animado.page.html',
  styleUrls: ['./splash-animado.page.scss'],
})
export class SplashAnimadoPage implements OnInit {
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(()=>{
     this.router.navigateByUrl("login");
    },3000);
    
    
  }
}
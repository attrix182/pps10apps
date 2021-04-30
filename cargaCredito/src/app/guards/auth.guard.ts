import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private alertController: AlertController, private router: Router) {}
  canActivate( next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.authService.isLogged)
   if (this.authService.isLogged == true) {
    
     return true;
   } 
   this.AccesoDenegado();
   this.router.navigateByUrl('/home');
   return true;

  }
  private async AccesoDenegado() {

    const alert = await this.alertController.create({
      animated: true,
      backdropDismiss: true,
      cssClass: 'my-custom-class',
      header: 'Acceso denegado',
      message: 'Se requiere estar logueado al sistema',
      buttons: ['OK']
    });
     await alert.present();
  }
  
}

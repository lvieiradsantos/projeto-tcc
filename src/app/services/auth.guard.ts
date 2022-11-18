import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private utilService: UtilService,
    public router: Router) { }
  canActivate(): boolean {
    if (this.utilService.isLogged()) {
      this.utilService.emitIsLogged(true);
      return true;
    }
    this.utilService.emitIsLogged(false);
    this.router.navigate(['/login']);
    return false;
  }
}

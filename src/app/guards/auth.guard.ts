import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afsAuth: AngularFireAuth,
              public authService: AuthService,
              public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isLoggedIn !== true) {
        this.router.navigate(['/user/login']);
      }
      return true;
    }

  /*
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afsAuth.authState
    .pipe(take(1))
    .pipe(map(authState => !!authState))
    .pipe(tap(auth => {
      if (!auth) {
        this.router.navigate(['/user/login']);
      }
    }));
  }
  */
}

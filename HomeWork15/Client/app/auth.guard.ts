import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private tokenService: TokenService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if(this.tokenService.getUserInfo() != null)
        return true;
        this.router.navigate(['/error']);
        return false;
    }
}

import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ValidUserGuard implements CanActivate {

    constructor(private dataService: DataService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        console.log(route.params['uuid']);
        return this.dataService.getUser(route.params['uuid']);
    }

    // async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    //     console.log(route.params['uuid']);
    //     return await this.dataService.getUser(route.params['uuid']).toPromise();
    // }

    // async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    //     let uuid = await route.params.toPromise();
    //     let users = await this.dataService.getCachedData().toPromise()
    //     return !!users.results.filter(u => u.login.uuid == uuid)[0];
    // }
}

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, tap, take } from "rxjs/operators";
import { Route } from "@angular/compiler/src/core";

@Injectable({providedIn:'root'})
export class AuthGuardService implements CanActivate{

    constructor(private authSrv: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
       /*return this.authSrv.user.pipe(
            take(1),
            map(user=>
            {
                return !!user;
            }),tap(
                isAuth=>{
                    if(!isAuth)
                        return this.router.navigate(['/auth']);
                }
            ));*/

            const userData = this.authSrv.getLoggedInUser();
            if(userData == null)
                return this.router.navigate(['/auth']);
    }

}
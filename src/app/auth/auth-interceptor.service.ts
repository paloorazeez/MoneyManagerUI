import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from "rxjs/operators";
import { User } from "./user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authSrv: AuthService){}
  
    intercept(req: HttpRequest<any>, next:HttpHandler)
    {
        const userData = this.authSrv.getLoggedInUser();
        if(!userData)
        {
            return next.handle(req);
        }
        const modifiedReq = req.clone({setHeaders: {
            Authorization:'Bearer '+userData._token
        }
        });
        return next.handle(modifiedReq);

    }
}
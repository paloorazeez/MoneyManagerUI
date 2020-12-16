import { Component, EventEmitter, Output, OnInit, OnDestroy } from "@angular/core";
//import { DataStorageService } from "../shared/data-storage.service";
//import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy
{
    userSub:Subscription;
    isAuthenticated:boolean = false;
    constructor( private authSrv: AuthService){}
    


    ngOnInit()
    {

        const userData = this.authSrv.getLoggedInUser();
        this.isAuthenticated = (userData != null);
    }

    /*onSaveData()
    {
        this.dataSrc.storeRecipe();
    }

    fetchData()
    {
        this.dataSrc.fetchRecipe().subscribe();
    }*/


    ngOnDestroy()
    {
        this.userSub.unsubscribe();
    }

    onLogout()
    {
        this.authSrv.logout();
    }
}
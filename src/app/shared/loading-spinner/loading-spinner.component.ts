import { Component } from "@angular/core";

@Component({
    selector: 'app-spinner',
    template: '<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
     styleUrls: ['./loading-spinner.style.css']
})
export class LoadingSpinnerComponent
{

}
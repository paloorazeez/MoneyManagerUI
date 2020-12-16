import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdownDirective]'
})
export class DropdownDirectiveDirective {

  @HostBinding("class.open") isOpen = false;
  constructor() { }

  @HostListener('click') toggleOpen()
  {
    this.isOpen = !this.isOpen;
  }

}

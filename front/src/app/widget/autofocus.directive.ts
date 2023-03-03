import { Directive, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnDestroy {
  constructor() {
    console.log('autofocus instantiated');
  }

  ngOnDestroy(): void {
    console.log('autofocus destroyed');
  }
}

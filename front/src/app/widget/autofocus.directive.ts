import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnDestroy, OnInit {
  @Input('appAutofocus')
  mode = '';

  constructor(private readonly elt: ElementRef<HTMLInputElement>) {
    console.log('autofocus instantiated');
    console.log('this.elt.nativeElement: ', this.elt.nativeElement);
  }
  ngOnInit(): void {
    this.elt.nativeElement.focus();
    console.log('this.mode: ', this.mode);
    if (this.mode === 'selectall') {
      this.elt.nativeElement.select();
    }
  }

  ngOnDestroy(): void {
    console.log('autofocus destroyed');
  }
}

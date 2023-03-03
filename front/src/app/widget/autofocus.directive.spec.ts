import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AutofocusDirective } from './autofocus.directive';

@Component({
  selector: 'app-test',
  template: `
    <div>
      <input class="test" appAutofocus />
    </div>
  `,
})
export class TestComponent {}

describe('AutofocusDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, AutofocusDirective],
    }).compileComponents();
  });

  it('should autofocus', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input.test');
    if (input === null) {
      fail('no input found');
      return;
    }
    if (document.activeElement === null) {
      fail('no focus');
      return;
    }

    expect(input).toBe(document.activeElement);
  });
});

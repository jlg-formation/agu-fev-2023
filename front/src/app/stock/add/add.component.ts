import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  f = new FormGroup({
    name: new FormControl('Truc', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    qty: new FormControl(1, [Validators.required, Validators.min(0)]),
  });
  faPlus = faPlus;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.f.controls.qty.valueChanges.subscribe((value) => {
      if (value === null) {
        this.f.controls.qty.setValue(0, {
          emitEvent: false,
        });
        return;
      }
      console.log('value: ', value);
      this.f.controls.qty.setValue(Math.floor(value), {
        emitEvent: false,
      });
    });
  }

  submit() {
    console.log('submit');
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}

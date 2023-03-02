import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockObsComponent } from './stockobs.component';

describe('StockComponent', () => {
  let component: StockObsComponent;
  let fixture: ComponentFixture<StockObsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockObsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockObsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

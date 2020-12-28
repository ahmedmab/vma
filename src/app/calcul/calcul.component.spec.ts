import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculComponent } from './calcul.component';

describe('CalculComponent', () => {
  let component: CalculComponent;
  let fixture: ComponentFixture<CalculComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

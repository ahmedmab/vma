import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fractione30Component } from './fractione30.component';

describe('Fractione30Component', () => {
  let component: Fractione30Component;
  let fixture: ComponentFixture<Fractione30Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fractione30Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fractione30Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

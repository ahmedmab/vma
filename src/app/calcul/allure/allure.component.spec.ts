import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllureComponent } from './allure.component';

describe('AllureComponent', () => {
  let component: AllureComponent;
  let fixture: ComponentFixture<AllureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrainementComponent } from './entrainement.component';

describe('EntrainementComponent', () => {
  let component: EntrainementComponent;
  let fixture: ComponentFixture<EntrainementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrainementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrainementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

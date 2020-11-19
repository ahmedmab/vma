import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmaTrainerComponent } from './vma-trainer.component';

describe('VmaTrainerComponent', () => {
  let component: VmaTrainerComponent;
  let fixture: ComponentFixture<VmaTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmaTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VmaTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

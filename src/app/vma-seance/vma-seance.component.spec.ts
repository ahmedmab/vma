import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmaSeanceComponent } from './vma-seance.component';

describe('VmaSeanceComponent', () => {
  let component: VmaSeanceComponent;
  let fixture: ComponentFixture<VmaSeanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmaSeanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VmaSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

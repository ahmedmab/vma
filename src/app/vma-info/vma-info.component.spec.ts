import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmaInfoComponent } from './vma-info.component';

describe('VmaInfoComponent', () => {
  let component: VmaInfoComponent;
  let fixture: ComponentFixture<VmaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmaInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VmaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

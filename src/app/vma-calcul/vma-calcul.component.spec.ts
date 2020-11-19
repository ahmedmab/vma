import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmaCalculComponent } from './vma-calcul.component';

describe('VmaCalculComponent', () => {
  let component: VmaCalculComponent;
  let fixture: ComponentFixture<VmaCalculComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmaCalculComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VmaCalculComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMilitarComponent } from './manage-militar.component';

describe('ManageMilitarComponent', () => {
  let component: ManageMilitarComponent;
  let fixture: ComponentFixture<ManageMilitarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageMilitarComponent]
    });
    fixture = TestBed.createComponent(ManageMilitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilitarComponent } from './militar.component';

describe('MilitarComponent', () => {
  let component: MilitarComponent;
  let fixture: ComponentFixture<MilitarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MilitarComponent]
    });
    fixture = TestBed.createComponent(MilitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

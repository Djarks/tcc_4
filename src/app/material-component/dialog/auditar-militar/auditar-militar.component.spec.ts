import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditarMilitarComponent } from './auditar-militar.component';

describe('AuditarMilitarComponent', () => {
  let component: AuditarMilitarComponent;
  let fixture: ComponentFixture<AuditarMilitarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditarMilitarComponent]
    });
    fixture = TestBed.createComponent(AuditarMilitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditarComponent } from './auditar.component';

describe('AuditarComponent', () => {
  let component: AuditarComponent;
  let fixture: ComponentFixture<AuditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditarComponent]
    });
    fixture = TestBed.createComponent(AuditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

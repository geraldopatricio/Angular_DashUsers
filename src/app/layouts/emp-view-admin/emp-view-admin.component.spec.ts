import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpViewAdminComponent } from './emp-view-admin.component';

describe('EmpViewAdminComponent', () => {
  let component: EmpViewAdminComponent;
  let fixture: ComponentFixture<EmpViewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpViewAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

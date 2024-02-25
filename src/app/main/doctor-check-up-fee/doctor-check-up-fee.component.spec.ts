import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCheckUpFeeComponent } from './doctor-check-up-fee.component';

describe('DoctorCheckUpFeeComponent', () => {
  let component: DoctorCheckUpFeeComponent;
  let fixture: ComponentFixture<DoctorCheckUpFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCheckUpFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCheckUpFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

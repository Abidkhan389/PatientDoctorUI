import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDoctorCheckUpFeeComponent } from './add-edit-doctor-check-up-fee.component';

describe('AddEditDoctorCheckUpFeeComponent', () => {
  let component: AddEditDoctorCheckUpFeeComponent;
  let fixture: ComponentFixture<AddEditDoctorCheckUpFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDoctorCheckUpFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDoctorCheckUpFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

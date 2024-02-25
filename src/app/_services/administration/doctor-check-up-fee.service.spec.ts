import { TestBed } from '@angular/core/testing';

import { DoctorCheckUpFeeService } from './doctor-check-up-fee.service';

describe('DoctorCheckUpFeeService', () => {
  let service: DoctorCheckUpFeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorCheckUpFeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

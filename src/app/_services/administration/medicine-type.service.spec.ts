import { TestBed } from '@angular/core/testing';

import { MedicineTypeService } from './medicine-type.service';

describe('MedicineTypeService', () => {
  let service: MedicineTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

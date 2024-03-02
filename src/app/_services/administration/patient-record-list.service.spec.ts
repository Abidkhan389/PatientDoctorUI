import { TestBed } from '@angular/core/testing';

import { PatientRecordListService } from './patient-record-list.service';

describe('PatientRecordListService', () => {
  let service: PatientRecordListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientRecordListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

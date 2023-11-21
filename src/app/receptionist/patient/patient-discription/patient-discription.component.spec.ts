import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDiscriptionComponent } from './patient-discription.component';

describe('PatientDiscriptionComponent', () => {
  let component: PatientDiscriptionComponent;
  let fixture: ComponentFixture<PatientDiscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDiscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDiscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

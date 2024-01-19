import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTypeComponent } from './medicine-type.component';

describe('MedicineTypeComponent', () => {
  let component: MedicineTypeComponent;
  let fixture: ComponentFixture<MedicineTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

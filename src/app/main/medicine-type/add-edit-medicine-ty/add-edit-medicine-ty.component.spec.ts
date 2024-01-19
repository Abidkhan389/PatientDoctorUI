import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMedicineTyComponent } from './add-edit-medicine-ty.component';

describe('AddEditMedicineTyComponent', () => {
  let component: AddEditMedicineTyComponent;
  let fixture: ComponentFixture<AddEditMedicineTyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMedicineTyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMedicineTyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

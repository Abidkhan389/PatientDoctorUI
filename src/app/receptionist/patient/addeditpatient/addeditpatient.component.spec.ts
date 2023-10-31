import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditpatientComponent } from './addeditpatient.component';

describe('AddeditpatientComponent', () => {
  let component: AddeditpatientComponent;
  let fixture: ComponentFixture<AddeditpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditpatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

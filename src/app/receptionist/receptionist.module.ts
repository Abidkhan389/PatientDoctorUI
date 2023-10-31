import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetionistRoutingModule } from './receptionist-routing.module';
import { PatientComponent } from './patient/patient.component';
import { AddeditpatientComponent } from './patient/addeditpatient/addeditpatient.component';
import { ShareModule } from '../-share/-share.module';



@NgModule({
  declarations: [
      PatientComponent,
      AddeditpatientComponent
  ],
  imports: [
      CommonModule,
      RecetionistRoutingModule,
      ShareModule,

  ]
})
export class ReceptionistModule { }

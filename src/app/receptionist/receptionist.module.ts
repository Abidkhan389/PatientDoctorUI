import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetionistRoutingModule } from './receptionist-routing.module';
import { PatientComponent } from './patient/patient.component';
import { AddeditpatientComponent } from './patient/addeditpatient/addeditpatient.component';
import { ShareModule } from '../-share/-share.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SettingsComponent } from './settings/settings.component';



@NgModule({
  declarations: [
      PatientComponent,
      AddeditpatientComponent,
      SettingsComponent
  ],
  imports: [
      CommonModule,
      RecetionistRoutingModule,
      ShareModule,

  ]
})
export class ReceptionistModule { }

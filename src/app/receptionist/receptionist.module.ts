import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetionistRoutingModule } from './receptionist-routing.module';
import { PatientComponent } from './patient/patient.component';
import { AddeditpatientComponent } from './patient/addeditpatient/addeditpatient.component';
import { ShareModule } from '../-share/-share.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SettingsComponent } from './settings/settings.component';
import { PatientDiscriptionComponent } from './patient/patient-discription/patient-discription.component';
import { AppoitmentsComponent } from './appoitments/appoitments.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
      PatientComponent,
      AddeditpatientComponent,
      SettingsComponent,
      PatientDiscriptionComponent,
      AppoitmentsComponent
  ],
  imports: [
      CommonModule,
      RecetionistRoutingModule,
      ShareModule,

  ]
})
export class ReceptionistModule { }

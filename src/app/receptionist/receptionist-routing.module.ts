import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { SettingsComponent } from './settings/settings.component';
import { AppoitmentsComponent } from './appoitments/appoitments.component';


const routes: Routes = [
  // {path:'', redirectTo:'categories',pathMatch:'full'},
  {
    path: 'patientappoitment',
    component: PatientComponent
  },
  {
    path:'Setting',
    component: SettingsComponent
  },
  {
    path:'Appoitments',
    component: AppoitmentsComponent
  }
//   {
//     path: 'User',
//     component: UsersComponent
//   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecetionistRoutingModule { }

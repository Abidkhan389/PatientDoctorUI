import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MedicineTypeComponent } from './medicine-type/medicine-type.component';
import { MedicineComponent } from './medicine/medicine.component';
import { DoctorCheckUpFeeComponent } from './doctor-check-up-fee/doctor-check-up-fee.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';


const routes: Routes = [
  // {path:'', redirectTo:'categories',pathMatch:'full'},
  {
    path: 'Dashboard',
    component: DashboardComponent
  },
  {
    path: 'User',
    component: UsersComponent
  },
  {
    path: 'medicineType',
    component: MedicineTypeComponent 
  },
  {
    path: 'medicine',
    component: MedicineComponent 
  },
  {
    path: 'doctorCheckUpFee',
    component : DoctorCheckUpFeeComponent
  },
  {
    path: 'patientRecord',
    component: PatientRecordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

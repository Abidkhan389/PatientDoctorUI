import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MedicineTypeComponent } from './medicine-type/medicine-type.component';
import { MedicineComponent } from './medicine/medicine.component';


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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

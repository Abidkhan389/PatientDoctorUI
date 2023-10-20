import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { MainComponent } from './main.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  // {path:'', redirectTo:'categories',pathMatch:'full'},
  {
    path: 'admin',
    component: MainComponent
  },
  {
    path: 'User',
    component: UsersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

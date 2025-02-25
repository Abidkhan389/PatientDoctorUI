import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';
import { AuthGuard } from './_guard/authGuard';
import { HomeComponent } from './patient/home/home.component';
import { PermissionGuard } from './_guard/PermissionGuard';
import { PermissionGuardForReceptionist } from './_guard/PermissionGuardForReceptionist';
import { RoleGuard } from './_guard/RoleGuard ';
import { ROLES } from './Models/Guards/ROLES';
// // Pages



const routes: Routes = [
 {
    path:'',
    loadChildren: () => import('./patient/patient.module').then(p => p.PatientModule)
    
 },
  {
    path: '',
    component: BaseLayoutComponent,
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'main',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { requiredRoles: [ROLES.Doctor, ROLES.Admin] }

      },

    ]
  },
  {
    path: 'admin/patientappoitment',
    component: BaseLayoutComponent,
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'appoitment',
        redirectTo: 'appoitment',
        pathMatch: 'full'
      },
      {
        path: 'appoitment',
        loadChildren: () => import('./receptionist/receptionist.module').then(r => r.ReceptionistModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { requiredRoles: [ROLES.Doctor, ROLES.Admin,ROLES.Receptionist] }

      },

    ]
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

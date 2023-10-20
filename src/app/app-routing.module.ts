import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';
import { AuthGuard } from './_guard/authGuard';
import { HomeComponent } from './patient/home/home.component';

// // Pages



const routes: Routes = [
 {
    path:'',
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule)
    
 },
  {
    path: 'admin',
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
        canActivate: [AuthGuard]

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

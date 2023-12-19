import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ShareModule } from '../-share/-share.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UsersComponent } from './users/users.component';
import { AddEditUserComponent } from './users/add-edit-user/add-edit-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarchartComponent } from './barchart/barchart.component';


@NgModule({
    declarations: [
        MainComponent,
        UsersComponent,
        AddEditUserComponent,
        DashboardComponent,
        BarchartComponent,
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        ShareModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ]
})
export class MainModule { }

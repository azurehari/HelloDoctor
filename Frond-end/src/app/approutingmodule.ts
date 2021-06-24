import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentComponent } from './appointment/appointment.component'; 

const routes: Routes = [    
    { 
        path: '',
        loadChildren : () => import('./dashboard/dashboard.module').then( m => m.DashBoardModule)
    },
    { 
        path: 'appointment', 
        loadChildren : () => import('./appointment/appointment.module').then( m => m.AppointmentModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentRoutingModule } from './appointmentroutingmodule';
import { AppointmentComponent } from './appointment.component';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
    declarations: [AppointmentComponent],
    imports: [
        AppointmentRoutingModule,
        MatCardModule,
        MatDatepickerModule,
        NgxMaterialTimepickerModule,
        CommonModule
    ]
})

export class AppointmentModule { }
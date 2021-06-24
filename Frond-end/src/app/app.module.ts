import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';


import { MatNativeDateModule } from '@angular/material/core'

import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule  } from './approutingmodule';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,   
    BrowserAnimationsModule,
    MatNativeDateModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

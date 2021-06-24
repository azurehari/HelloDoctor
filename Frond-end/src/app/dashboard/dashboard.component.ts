import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentDate : Date | undefined;
  appointmentList : any;

  constructor(public api: ApiService) { 
    this.currentDate =  new Date();
  }

  ngOnInit(): void {
    this.api.APPOINTMENT_DETAILS().subscribe( result => {
      console.log('result...', result.data);
      this.appointmentList = result.data;
    })
  }

}

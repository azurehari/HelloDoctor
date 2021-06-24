import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  APPOINTMENT_DETAILS() {    
    let httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.get<any>('http://localhost:8080/api/appointments', httpOptions);
  }

  SAVE_SLOT(data:any){
    let httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<any>('http://localhost:8080/api/slots', data, httpOptions );
  }

  SLOTS_BY_DATE(date:any){
    let httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.get<any>('http://localhost:8080/api/slots/'+date,  httpOptions );
  }

  CHECK_SLOT_EXIST(data:any){
    let httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<any>('http://localhost:8080/api/validate', data, httpOptions );
  }

  BOOK_SLOT(data:any){
    let httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<any>('http://localhost:8080/api/bookslot', data, httpOptions );
  }

  CHECK_SLOT_BOOKED(data:any){
    let httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.get<any>('http://localhost:8080/api/slotlist/'+data,  httpOptions );
  }
  
}

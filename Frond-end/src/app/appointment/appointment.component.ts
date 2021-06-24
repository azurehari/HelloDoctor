import { Component,  OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgxTimepickerFieldComponent } from 'ngx-material-timepicker';
import { ApiService } from '../api.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  dummy : any;
  @ViewChild('slotFromTime') set slotFromTime(v : NgxTimepickerFieldComponent){
    this.dummy = v;
  }
  selectedDate: Date | undefined;
  trigger: string | undefined;
  @Input() fromTime: any;
  @Input() toTime: any;  
  slotFrom: any;
  slotTo: any;
  morningSlotFrom:any;
  morningSlotTo:any;
  eveningSlotFrom:any;
  eveningSlotTo:any;
  slot_type:any;
  morningSlotValFrom: any;
  morningSlotValTo: any;
  eveningSlotValFrom: any;
  eveningSlotValTo: any;
  morningSlotListItems : any;
  eveningSlotListItems : any;
  flag:boolean = false;
  errorMsg:any;
  showError:boolean | undefined;
  @Input() cancelBtnTmpl : any; 
  formattedTime: string = '';
  constructor(public api: ApiService, private toastr: ToastrService) { 
    this.selectedDate = new Date();
    // this.selectedDate.getTimezoneOffset();
    this.selectedDate.setMinutes( this.selectedDate.getMinutes() + this.selectedDate.getTimezoneOffset() );
    this.trigger = 'addSlotsPopUp';
    this.showError = false;
    this.formattedTime = '';
  }

  ngOnInit(): void { 
    let date = new Date().toISOString().slice(0, 10);     
    this.api.SLOTS_BY_DATE(date).subscribe( result =>{
      console.log('data......', result.data[0]);
      let data = result.data[0];
      if(data){
        if(data.morning_slot[0].from){
          const dt1 = new Date(date +','+data.morning_slot[0].from);
          const dt2 = new Date(date +','+data.morning_slot[0].to);
          let diff = this.diff_minutes(dt1, dt2);
          let count = diff/30;
          let arr = [];
  
          for(let i = 0; i < count; i++){
            let kk = dt1.setMinutes(dt1.getMinutes() + 30);
            let cc = new Date(kk);
            var hours = cc.getHours();
            let minutes = cc.getMinutes() as any;
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; 
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            var existingSlot = data.booked_slots.includes(strTime);
            arr.push({
              value : strTime,
              id: data._id,
              exist: existingSlot
            })
          }
          this.morningSlotListItems = arr;
          console.log('mor...', this.morningSlotListItems);
        }
        
        if(data.evening_slot[0].from){
          const dt1 = new Date(date +','+data.evening_slot[0].from);
          const dt2 = new Date(date +','+data.evening_slot[0].to);
          let diff = this.diff_minutes(dt1, dt2);
          let count = diff/30;
          let arr = [];
  
          for(let i = 0; i < count; i++){
            let kk = dt1.setMinutes(dt1.getMinutes() + 30);
            let cc = new Date(kk);
            var hours = cc.getHours();
            let minutes = cc.getMinutes() as any;
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; 
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            var existingSlot = data.booked_slots.includes(strTime);
            arr.push({
              value : strTime,
              id: data._id,
              exist: existingSlot
            })
          }
          this.eveningSlotListItems = arr;
          console.log('eve...', this.eveningSlotListItems)
        }

        
      this.morningSlotValFrom = data.morning_slot[0].from ? data.morning_slot[0].from : '00:00';
      this.morningSlotValTo = data.morning_slot[0].to ? data.morning_slot[0].to : '00:00';
      this.eveningSlotValFrom = data.evening_slot[0].from ? data.evening_slot[0].from : '00:00';
      this.eveningSlotValTo = data.evening_slot[0].to ? data.evening_slot[0].to : '00:00';
      } else{
        this.morningSlotListItems = [];
        this.eveningSlotListItems = [];

        this.morningSlotValFrom = '00:00';
        this.morningSlotValTo = '00:00';
        this.eveningSlotValFrom = '00:00';
        this.eveningSlotValTo = '00:00';
      }   
      
    })
  }

  getSelected(event : any){
    this.flag = true;   
    this.selectedDate = event;
    let dd = event;  
    let date = dd.toISOString().slice(0, 10);   
    let current_date = new Date(date);
    let current_date_plus_one = current_date.setDate(current_date.getDate() + 1);
    let new_date = new Date(current_date_plus_one);
    let pass_data = new_date.toISOString().slice(0, 10);
    this.api.SLOTS_BY_DATE(pass_data).subscribe( result =>{      
      if(result.data){        
        let data = result.data[0];
        if(data){
          if(data.morning_slot[0].from){
            const dt1 = new Date(date +','+data.morning_slot[0].from);
            const dt2 = new Date(date +','+data.morning_slot[0].to);
            let diff = this.diff_minutes(dt1, dt2);
            let count = diff/30;
            let arr = [];
    
            for(let i = 0; i < count; i++){
              let kk = dt1.setMinutes(dt1.getMinutes() + 30);
              let cc = new Date(kk);
              var hours = cc.getHours();
              let minutes = cc.getMinutes() as any;
              var ampm = hours >= 12 ? 'PM' : 'AM';
              hours = hours % 12;
              hours = hours ? hours : 12; 
              minutes = minutes < 10 ? '0'+minutes : minutes;
              var strTime = hours + ':' + minutes + ' ' + ampm;
              var existingSlot = data.booked_slots.includes(strTime);
              arr.push({
                value : strTime,
                id: data._id,
                exist: existingSlot
              })
            }
            this.morningSlotListItems = arr;
          }else{
            this.morningSlotListItems = [];
          }
          
          if(data.evening_slot[0].from){
            const dt1 = new Date(date +','+data.evening_slot[0].from);
            const dt2 = new Date(date +','+data.evening_slot[0].to);
            let diff = this.diff_minutes(dt1, dt2);
            let count = diff/30;
            let arr = [];
    
            for(let i = 0; i < count; i++){
              let kk = dt1.setMinutes(dt1.getMinutes() + 30);
              let cc = new Date(kk);
              var hours = cc.getHours();
              let minutes = cc.getMinutes() as any;
              var ampm = hours >= 12 ? 'PM' : 'AM';
              hours = hours % 12;
              hours = hours ? hours : 12; 
              minutes = minutes < 10 ? '0'+minutes : minutes;
              var strTime = hours + ':' + minutes + ' ' + ampm;
              var existingSlot = data.booked_slots.includes(strTime);
              arr.push({
                value : strTime,
                id: data._id,
                exist: existingSlot
              })
            }
            this.eveningSlotListItems = arr;
          }else{
            this.eveningSlotListItems = [];
          }
  
          
        this.morningSlotValFrom = data.morning_slot[0].from ? data.morning_slot[0].from : '00:00';
        this.morningSlotValTo = data.morning_slot[0].to ? data.morning_slot[0].to : '00:00';
        this.eveningSlotValFrom = data.evening_slot[0].from ? data.evening_slot[0].from : '00:00';
        this.eveningSlotValTo = data.evening_slot[0].to ? data.evening_slot[0].to : '00:00';
        } else{
          this.morningSlotListItems = [];
          this.eveningSlotListItems = [];
  
          this.morningSlotValFrom = '00:00';
          this.morningSlotValTo = '00:00';
          this.eveningSlotValFrom = '00:00';
          this.eveningSlotValTo = '00:00';
        }
      }
    })
  }
  closePopup(){
    console.log('Close Popup...')
    this.trigger = 'd-none';
    this.showError = false;
     this.errorMsg = "";
     this.formattedTime = '';
    //  slotFromTime
    this.dummy.timepickerTime = 'HH:MM AM'
    console.log('dummy...', this.dummy.de);
    
  }
  addSlots(when : any){
    this.trigger = 'addSlotsPopUp d-block';
    this.slot_type = when;
  }
  diff_minutes(dt2:any, dt1:any) {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));  
 }

 bookSlot(item:any){
  
   console.log('item...', item);

   this.api.CHECK_SLOT_BOOKED(item.id).subscribe( reslt => {
     console.log('reslt....', reslt);
     let val = reslt.data.booked_slots;
     if(val.includes(item.value)){
      this.toastr.error('Slot booked already!.');
     }else{
      this.api.BOOK_SLOT(item).subscribe( result => {
        console.log('booking....', result);
        this.toastr.success('Slot booked successfully!.');
        let date = new Date().toISOString().slice(0, 10);  
        let data = result.data;    
        
        if(data.morning_slot[0].from){
            const dt1 = new Date(date +','+data.morning_slot[0].from);
            const dt2 = new Date(date +','+data.morning_slot[0].to);
            let diff = this.diff_minutes(dt1, dt2);
            let count = diff/30;
            let arr = [];
    
            for(let i = 0; i < count; i++){
              let kk = dt1.setMinutes(dt1.getMinutes() + 30);
              let cc = new Date(kk);
              var hours = cc.getHours();
              let minutes = cc.getMinutes() as any;
              var ampm = hours >= 12 ? 'PM' : 'AM';
              hours = hours % 12;
              hours = hours ? hours : 12; 
              minutes = minutes < 10 ? '0'+minutes : minutes;
              var strTime = hours + ':' + minutes + ' ' + ampm;
              var existingSlot = data.booked_slots.includes(strTime);
               arr.push({
                 value : strTime,
                 id: data._id,
                 exist: existingSlot
               })
            }
            this.morningSlotListItems = arr;
          }
    
          if(data.evening_slot[0].from){
            const dt1 = new Date(date +','+data.evening_slot[0].from);
            const dt2 = new Date(date +','+data.evening_slot[0].to);
            let diff = this.diff_minutes(dt1, dt2);
            let count = diff/30;
            let arr = [];
    
            for(let i = 0; i < count; i++){
              let kk = dt1.setMinutes(dt1.getMinutes() + 30);
              let cc = new Date(kk);
              var hours = cc.getHours();
              let minutes = cc.getMinutes() as any;
              var ampm = hours >= 12 ? 'PM' : 'AM';
              hours = hours % 12;
              hours = hours ? hours : 12; 
              minutes = minutes < 10 ? '0'+minutes : minutes;
              var strTime = hours + ':' + minutes + ' ' + ampm;
              var existingSlot = data.booked_slots.includes(strTime);
               arr.push({
                 value : strTime,
                 id: data._id,
                 exist: existingSlot
               })
            }
            this.eveningSlotListItems = arr;
          }
      })
     }
   })

  
 }
 saveSlot(){
   console.log('*..', this.slotFrom);
   console.log('#..', this.slotTo);
   if(this.slotFrom == undefined && this.slotTo != undefined){
     this.showError = true;
     this.errorMsg = "Please select the From-time";
   }else if(this.slotTo == undefined && this.slotFrom != undefined){
     this.showError = true;
     this.errorMsg = "Please select the To-time";
   }else if(this.slotFrom == undefined && this.slotTo == undefined){
    this.showError = true;
    this.errorMsg = "Please select the From-time and To-time";
   }else{
     // do stuff
     this.showError = false;
     this.errorMsg = "";
     const dt1 = new Date(this.slotFrom);
     const dt2 = new Date(this.slotTo);
     let diff = this.diff_minutes(dt1, dt2);
 
    //  if(this.flag){
       this.selectedDate?.setDate(this.selectedDate.getDate() + 1);
    //  }    
 
     let data = {
       slot_date : this.selectedDate,
       morning_slot : {
         from : this.morningSlotFrom,
         to : this.morningSlotTo
       },
       evening_slot : {
         from : this.eveningSlotFrom,
         to : this.eveningSlotTo
       },
       default_duration : "30",
       has_morning_slot: false,
       has_evening_slot : false
     }
     if(this.slot_type == 'morning'){
       data.has_morning_slot = true
     }
     if(this.slot_type == 'evening'){
       data.has_evening_slot = true;
     }

     this.api.CHECK_SLOT_EXIST(data).subscribe( res => {
       console.log('res..', res);       
       if(res.data){
        this.trigger = 'd-none';
        this.toastr.error('Slot already exist. Same slot cannot be created again rather you can extend the slot!.');
       }else{
        this.api.SAVE_SLOT(data).subscribe( result => {  
          this.morningSlotFrom = undefined;
          this.morningSlotTo = undefined;
          this.eveningSlotFrom = undefined;
          this.eveningSlotTo = undefined;    
           console.log('save slot...', result.data);
           let data = result.data;
           this.trigger = 'd-none';   
     
           let date = new Date().toISOString().slice(0, 10);  
           if(data.morning_slot[0].from){
             const dt1 = new Date(date +','+data.morning_slot[0].from);
             const dt2 = new Date(date +','+data.morning_slot[0].to);
             let diff = this.diff_minutes(dt1, dt2);
             let count = diff/30;
             let arr = [];
     
             for(let i = 0; i < count; i++){
               let kk = dt1.setMinutes(dt1.getMinutes() + 30);
               let cc = new Date(kk);
               var hours = cc.getHours();
               let minutes = cc.getMinutes() as any;
               var ampm = hours >= 12 ? 'PM' : 'AM';
               hours = hours % 12;
               hours = hours ? hours : 12; 
               minutes = minutes < 10 ? '0'+minutes : minutes;
               var strTime = hours + ':' + minutes + ' ' + ampm;
               var existingSlot = data.booked_slots.includes(strTime);
                arr.push({
                  value : strTime,
                  id: data._id,
                  exist: existingSlot
                })
             }
             this.morningSlotListItems = arr;
           }
     
           if(data.evening_slot[0].from){
             const dt1 = new Date(date +','+data.evening_slot[0].from);
             const dt2 = new Date(date +','+data.evening_slot[0].to);
             let diff = this.diff_minutes(dt1, dt2);
             let count = diff/30;
             let arr = [];
     
             for(let i = 0; i < count; i++){
               let kk = dt1.setMinutes(dt1.getMinutes() + 30);
               let cc = new Date(kk);
               var hours = cc.getHours();
               let minutes = cc.getMinutes() as any;
               var ampm = hours >= 12 ? 'PM' : 'AM';
               hours = hours % 12;
               hours = hours ? hours : 12; 
               minutes = minutes < 10 ? '0'+minutes : minutes;
               var strTime = hours + ':' + minutes + ' ' + ampm;
               var existingSlot = data.booked_slots.includes(strTime);
                arr.push({
                  value : strTime,
                  id: data._id,
                  exist: existingSlot
                })
             }
             this.eveningSlotListItems = arr;
           }
           this.morningSlotValFrom = data.morning_slot[0].from ? data.morning_slot[0].from : '00:00';
           this.morningSlotValTo = data.morning_slot[0].to ? data.morning_slot[0].to : '00:00';
           this.eveningSlotValFrom = data.evening_slot[0].from ? data.evening_slot[0].from : '00:00';
           this.eveningSlotValTo = data.evening_slot[0].to ? data.evening_slot[0].to : '00:00';
         })
       }
     })
     
    
    
   }
    
 
 }
 fromT(event:any){  
    console.log('from..', this.cancelBtnTmpl);   
    if(this.slot_type == 'morning'){
      this.morningSlotFrom = event;
    }else{
      this.eveningSlotFrom = event;
    }
    const val = event.split(":");
    const hours = val[0];
    const minutes = val[1].substring(0, val[1].length - 3);
    //  const type = val[1].substring(val[1].length - 3);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    this.slotFrom = date;    
 }
 toT(event:any){  
  // console.log('to..', event);
  if(this.slot_type == 'morning'){
    this.morningSlotTo = event;
  }else{
    this.eveningSlotTo = event;
  }
    const val = event.split(":");
    const hours = val[0];
    const minutes = val[1].substring(0, val[1].length - 3);
  //  const type = val[1].substring(val[1].length - 3);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    this.slotTo = date;   
 }

}

import { Component, OnInit } from '@angular/core';
import { AllReqAccpted } from 'src/app/core/models/allReqAccepted.model';
import { RequestService } from 'src/app/core/services/request/request.service';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leave-calendar',
  templateUrl: './leave-calendar.component.html',
  styleUrls: ['./leave-calendar.component.scss'],
})
export class LeaveCalendarComponent implements OnInit {
  
  events$!: Observable<AllReqAccpted[]>;

  calendarOptions!: CalendarOptions;

  constructor(private reqs: RequestService) {}

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  } 

  ngOnInit() {  
    function getRandomColor() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      console.log(`rgb(${r}, ${g}, ${b})`);
      return `rgb(${r}, ${g}, ${b})`;
    }

    this.events$ = this.reqs.getAllReqsAccept();
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: 'fr',
      eventColor: getRandomColor(),
      dateClick: this.handleDateClick.bind(this)
    }
  }

  //converDate est une fonction qui convertie le format des dates
  convertDate(inputDateStr: any) {
    let dateObj = new Date(inputDateStr);
    let year = dateObj.getFullYear();
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2); 
    let day = ('0' + dateObj.getDate()).slice(-2);
    let formattedDateStr = `${year}-${month}-${day}`;
    return formattedDateStr
  }

}
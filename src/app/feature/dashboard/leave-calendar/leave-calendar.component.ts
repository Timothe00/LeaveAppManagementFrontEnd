import { Component } from '@angular/core';
import { AllReqAccpted } from 'src/app/core/models/allReqAccepted.model';
import { RequestService } from 'src/app/core/services/request/request.service';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-leave-calendar',
  templateUrl: './leave-calendar.component.html',
  styleUrls: ['./leave-calendar.component.scss'],
})
export class LeaveCalendarComponent {
  Events: AllReqAccpted[] = [];

  constructor(private reqs: RequestService) {}

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  } 

  ngOnInit() {
    this.reqs.getAllReqsAccept().subscribe(leaveRequests => {
      leaveRequests.map(event => {
        const eventObject = {
          title: event.title,
          start: this.convertDate(event.start),
          end: this.convertDate(event.end),
          userName: event.userName,
          color: '#0000ff'
        }
      this.Events.push(eventObject)
      });
      console.log("res", this.Events);
    });

    
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

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events: this.Events,
  };

}
//good
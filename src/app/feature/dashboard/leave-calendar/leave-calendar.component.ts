import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { AllReqAccpted } from 'src/app/core/models/allReqAccepted.model';
import { RequestService } from 'src/app/core/services/request/request.service';

import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-leave-calendar',
  templateUrl: './leave-calendar.component.html',
  styleUrls: ['./leave-calendar.component.scss']
})
export class LeaveCalendarComponent {
  Events: AllReqAccpted[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    initialView: 'dayGridMonth',

    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
  };
  constructor(private reqs: RequestService ) {}

  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }
  
  ngOnInit() {
    this.reqs.getAllReqsAccept()
    .subscribe((leaveRequests: AllReqAccpted[]) => {
      this.Events = leaveRequests.map((event: AllReqAccpted) => ({
        dateStart: event.dateStart,
        dateEnd: event.dateEnd,
        firstName: event.firstName,
        lastName: event.lastName,
        leaveTypeName: event.leaveTypeName
      }));

      console.log(this.Events);
      
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: this.Events,
        dateClick: this.onDateClick.bind(this)
      };
    });
  }


}

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
  Events: any[] = [{ title: 'event 1', date: '2023-12-01', color: '#0000ff'}];
  //  Events: any[]=[
  //   { title: 'event 1', date: '2023-12-01', color: '#0000ff'},
  //   { title: 'event 2', date: '2024-01-20', color: '#0000ff'}
  //  ]
  constructor(private reqs: RequestService) {}

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }

  ngOnInit() {
    this.reqs.getAllReqsAccept().subscribe((leaveRequests: AllReqAccpted[]) => {
      leaveRequests.map((event: AllReqAccpted) => {

        const eventObject = {
          title: event.userName,
          date: this.convertDate(event.start),
          color: '#0000ff'
        }

        this.Events.push(eventObject)
      });

      console.log(this.Events);
    });
  }

  convertDate(inputDateStr: any) {
    //let inputDateStr = '2024-01-16T00:00:00';
    let dateObj = new Date(inputDateStr);

    let year = dateObj.getFullYear();
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Months are zero indexed, hence "+1"
    let day = ('0' + dateObj.getDate()).slice(-2);

    let formattedDateStr = `${year}-${month}-${day}`;
    console.log("Outputs: 2024-01-16",formattedDateStr); // Outputs: 2024-01-16

    return formattedDateStr
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    //dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    events: this.Events,
  };
}

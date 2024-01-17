import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LeaveAppManagementFrontEnd';
  calendarOptions!: CalendarOptions;
}

import { Component, inject } from '@angular/core';
import { AppointmentsService } from '../../services/appointments/appointments.service';
import { Appointment } from '../../interfaces/appointments.interface';
import { State } from '../../interfaces/state.interface';
import { AppointmentsTableComponent } from '../../components/appointments-table/appointments-table.component';
@Component({ selector: 'app-appointments', templateUrl: './appointments.page.html', imports: [AppointmentsTableComponent] })
export class AppointmentsPage {
  appointments: Appointment[] = [];
  state: State = 'init';
  private readonly appointmentsService = inject(AppointmentsService);
  ngOnInit(): void { this.state = 'loading'; this.appointmentsService.getAllAppointments(10).subscribe({ next: (appointments) => { this.appointments = appointments; this.state = 'success'; }, error: () => { this.state = 'error'; } }); }
}

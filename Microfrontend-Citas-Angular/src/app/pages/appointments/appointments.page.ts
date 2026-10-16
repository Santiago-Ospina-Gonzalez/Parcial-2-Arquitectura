import { Component, inject } from '@angular/core';
import { GetAllAppointmentsUseCase } from '../../core/application/usecases/get-all-appointments.usecase';
import { Appointment } from '../../interfaces/appointments.interface';
import { State } from '../../interfaces/state.interface';
import { AppointmentsTableComponent } from '../../components/appointments-table/appointments-table.component';
@Component({ selector: 'app-appointments', templateUrl: './appointments.page.html', imports: [AppointmentsTableComponent] })
export class AppointmentsPage {
  appointments: Appointment[] = [];
  state: State = 'init';
  private readonly getAllAppointments = inject(GetAllAppointmentsUseCase);
  ngOnInit(): void { this.state = 'loading'; this.getAllAppointments.execute().subscribe({ next: (appointments) => { this.appointments = appointments; this.state = 'success'; }, error: () => { this.state = 'error'; } }); }
}

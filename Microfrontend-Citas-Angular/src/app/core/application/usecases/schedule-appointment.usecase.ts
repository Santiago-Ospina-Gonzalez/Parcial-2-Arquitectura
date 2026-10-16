import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../../../interfaces/appointments.interface';
import { AppointmentsService } from '../../../services/appointments/appointments.service';

@Injectable({ providedIn: 'root' })
export class ScheduleAppointmentUseCase {
  private readonly service = inject(AppointmentsService);

  execute(appointment: Omit<Appointment, 'id'>): Observable<Appointment> {
    return this.service.scheduleAppointment(appointment);
  }
}

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../../../interfaces/appointments.interface';
import { AppointmentsService } from '../../../services/appointments/appointments.service';

@Injectable({ providedIn: 'root' })
export class GetAllAppointmentsUseCase {
  private readonly service = inject(AppointmentsService);

  execute(): Observable<Appointment[]> {
    return this.service.getAllAppointments(10);
  }
}

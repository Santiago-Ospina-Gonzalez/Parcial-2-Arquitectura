import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../../../interfaces/appointments.interface';
import { AppointmentsService } from '../../../services/appointments/appointments.service';

@Injectable({ providedIn: 'root' })
export class GetAppointmentByIdUseCase {
  private readonly service = inject(AppointmentsService);

  execute(id: number): Observable<Appointment> {
    return this.service.getAppointmentById(id);
  }
}

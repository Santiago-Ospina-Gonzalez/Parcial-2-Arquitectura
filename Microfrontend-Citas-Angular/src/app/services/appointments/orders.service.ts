import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../../interfaces/appointments.interface';
@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  private readonly httpClient = inject(HttpClient);
  getAllAppointments(countAppointments: number): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`http://localhost:3003/api/appointments/${countAppointments}`);
  }
}

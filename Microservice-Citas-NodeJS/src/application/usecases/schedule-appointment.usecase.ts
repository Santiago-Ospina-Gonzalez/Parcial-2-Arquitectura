import { Appointment } from '../../domain/interfaces/order.interface';
import { AppointmentsService } from '../../presentation/modules/appointments/appointments.service';

export class ScheduleAppointmentUseCase {
  constructor(private readonly service: AppointmentsService) {}

  execute(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
    return this.service.scheduleAppointment(appointment);
  }
}

import { Appointment } from '../../domain/interfaces/order.interface';
import { AppointmentsService } from '../../presentation/modules/appointments/appointments.service';

export class ListAppointmentsUseCase {
  constructor(private readonly service: AppointmentsService) {}

  execute(count: number): Promise<Appointment[]> {
    return this.service.getAllAppointments(count);
  }
}

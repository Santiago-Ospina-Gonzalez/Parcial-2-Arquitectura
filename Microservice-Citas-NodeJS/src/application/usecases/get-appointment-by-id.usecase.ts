import { Appointment } from '../../domain/interfaces/order.interface';
import { AppointmentsService } from '../../presentation/modules/appointments/appointments.service';

export class GetAppointmentByIdUseCase {
  constructor(private readonly service: AppointmentsService) {}

  execute(id: number): Promise<Appointment> {
    return this.service.getAppointmentById(id);
  }
}

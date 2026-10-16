import { faker } from '@faker-js/faker';
import { Appointment, AppointmentStatus } from '../../../domain/interfaces/appointment.interface';

/** Genera citas ficticias para pruebas y demostraciones. */
export class AppointmentsService {
  private readonly statuses: AppointmentStatus[] = [
    'Pendiente',
    'Procesando',
    'Enviada',
    'Entregada',
  ];

  public async getAllAppointments(countAppointments: number): Promise<Appointment[]> {
    return Array.from({ length: countAppointments }, (_, index) => this.generateAppointment(index + 1));
  }

  private generateAppointment(id: number): Appointment {
    return {
      id,
      customerName: faker.person.fullName(),
      total: Number(faker.commerce.price({ min: 20, max: 500, dec: 2 })),
      status: faker.helpers.arrayElement(this.statuses),
      createdAt: faker.date.recent({ days: 30 }).toISOString(),
    };
  }
}

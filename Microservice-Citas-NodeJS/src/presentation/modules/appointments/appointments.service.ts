import { faker } from '@faker-js/faker';
import { Appointment, AppointmentStatus } from '../../../domain/interfaces/order.interface';

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

  public async getAppointmentById(id: number): Promise<Appointment> {
    return this.generateAppointment(id);
  }

  public async scheduleAppointment(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
    return { id: Date.now(), ...appointment };
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

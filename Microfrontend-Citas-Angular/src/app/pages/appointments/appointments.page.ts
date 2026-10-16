import { Component, inject } from '@angular/core';
import { GetAllAppointmentsUseCase } from '../../core/application/usecases/get-all-appointments.usecase';
import { GetAppointmentByIdUseCase } from '../../core/application/usecases/get-appointment-by-id.usecase';
import { ScheduleAppointmentUseCase } from '../../core/application/usecases/schedule-appointment.usecase';
import { Appointment } from '../../interfaces/appointments.interface';
import { State } from '../../interfaces/state.interface';
import { AppointmentsTableComponent } from '../../components/appointments-table/appointments-table.component';
@Component({ selector: 'app-appointments', templateUrl: './appointments.page.html', imports: [AppointmentsTableComponent] })
export class AppointmentsPage {
  appointments: Appointment[] = [];
  state: State = 'init';
  private readonly getAllAppointments = inject(GetAllAppointmentsUseCase);
  private readonly getAppointmentById = inject(GetAppointmentByIdUseCase);
  private readonly scheduleAppointment = inject(ScheduleAppointmentUseCase);
  appointmentId = '';
  customerName = '';
  actionMessage = '';
  ngOnInit(): void { this.state = 'loading'; this.getAllAppointments.execute().subscribe({ next: (appointments) => { this.appointments = appointments; this.state = 'success'; }, error: () => { this.state = 'error'; } }); }

  findAppointment(): void {
    const id = Number(this.appointmentId);
    if (!Number.isInteger(id) || id < 1) {
      this.actionMessage = 'Ingrese un ID de cita válido.';
      return;
    }
    this.getAppointmentById.execute(id).subscribe({
      next: (appointment) => this.actionMessage = `Cita encontrada para ${appointment.customerName}.`,
      error: () => this.actionMessage = 'No fue posible consultar la cita.',
    });
  }

  saveAppointment(): void {
    this.scheduleAppointment.execute({
      customerName: this.customerName,
      total: 0,
      status: 'Pendiente',
      createdAt: new Date().toISOString(),
    }).subscribe({
      next: (appointment) => {
        this.appointments = [...this.appointments, appointment];
        this.actionMessage = `Cita agendada para ${appointment.customerName}.`;
      },
      error: () => this.actionMessage = 'No fue posible agendar la cita.',
    });
  }
}

import { Request, Response } from 'express';
import { AppointmentsService } from './appointments.service';
import { ListAppointmentsUseCase } from '../../../application/usecases/list-appointments.usecase';
import { GetAppointmentByIdUseCase } from '../../../application/usecases/get-appointment-by-id.usecase';
import { ScheduleAppointmentUseCase } from '../../../application/usecases/schedule-appointment.usecase';

export class AppointmentsController {
  private readonly appointmentsService = new AppointmentsService();
  private readonly listAppointments = new ListAppointmentsUseCase(this.appointmentsService);
  private readonly getAppointmentByIdUseCase = new GetAppointmentByIdUseCase(this.appointmentsService);
  private readonly scheduleAppointmentUseCase = new ScheduleAppointmentUseCase(this.appointmentsService);

  getAllAppointments = (req: Request, res: Response): void => {
    const countAppointments = Number(req.params['countAppointments']);

    if (!Number.isInteger(countAppointments) || countAppointments < 1 || countAppointments > 100) {
      res.status(400).json({ error: 'countAppointments debe ser un entero entre 1 y 100' });
      return;
    }

    this.listAppointments
      .execute(countAppointments)
      .then((appointments) => res.status(200).json(appointments))
      .catch(() => res.status(500).json({ error: 'Internal Server error' }));
  };

  getAppointmentById = (req: Request, res: Response): void => {
    this.getAppointmentByIdUseCase.execute(Number(req.params.id))
      .then((appointment) => res.status(200).json(appointment))
      .catch(() => res.status(500).json({ error: 'Internal Server error' }));
  };

  scheduleAppointment = (req: Request, res: Response): void => {
    this.scheduleAppointmentUseCase.execute(req.body)
      .then((appointment) => res.status(201).json(appointment))
      .catch(() => res.status(500).json({ error: 'Internal Server error' }));
  };
}

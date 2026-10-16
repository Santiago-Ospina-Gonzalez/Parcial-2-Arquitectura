import { Request, Response } from 'express';
import { AppointmentsService } from './appointments.service';

export class AppointmentsController {
  private readonly appointmentsService = new AppointmentsService();

  getAllAppointments = (req: Request, res: Response): void => {
    const countAppointments = Number(req.params['countAppointments']);

    if (!Number.isInteger(countAppointments) || countAppointments < 1 || countAppointments > 100) {
      res.status(400).json({ error: 'countAppointments debe ser un entero entre 1 y 100' });
      return;
    }

    this.appointmentsService
      .getAllAppointments(countAppointments)
      .then((appointments) => res.status(200).json(appointments))
      .catch(() => res.status(500).json({ error: 'Internal Server error' }));
  };

  getAppointmentById = (req: Request, res: Response): void => {
    this.appointmentsService.getAppointmentById(Number(req.params.id))
      .then((appointment) => res.status(200).json(appointment))
      .catch(() => res.status(500).json({ error: 'Internal Server error' }));
  };

  scheduleAppointment = (req: Request, res: Response): void => {
    this.appointmentsService.scheduleAppointment(req.body)
      .then((appointment) => res.status(201).json(appointment))
      .catch(() => res.status(500).json({ error: 'Internal Server error' }));
  };
}

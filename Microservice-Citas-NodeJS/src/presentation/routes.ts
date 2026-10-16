import { Router } from 'express';
import { AppointmentsRoutes } from './modules/appointments/appointments.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/appointments', AppointmentsRoutes.routes);
    return router;
  }
}

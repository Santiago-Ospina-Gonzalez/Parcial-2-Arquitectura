import { Router } from 'express';
import { AppointmentsController } from './appointments.controller';

export class AppointmentsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AppointmentsController();

    /**
     * @openapi
     * /api/appointments/{countAppointments}:
     *   get:
     *     summary: Obtener citas simuladas
     *     tags: [Appointments]
     *     parameters:
     *       - in: path
     *         name: countAppointments
     *         required: true
     *         schema: { type: integer, minimum: 1, maximum: 100, example: 10 }
     *     responses:
     *       200:
     *         description: Lista de citas
     *       400:
     *         description: Cantidad inválida
     */
    router.get('/:countAppointments', controller.getAllAppointments);
    return router;
  }
}

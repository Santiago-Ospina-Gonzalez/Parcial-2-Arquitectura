import { Router } from "express";
import { PatientsController } from "./patients.controller";

export class PatientsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PatientsController();

    /**
     * @openapi
     * /api/patients/{countPatients}:
     *   get:
     *     summary: Obtener listado de patientos
     *     description: Retorna una lista de patientos generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Patients
     *     parameters:
     *       - in: path
     *         name: countPatients
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de patientos a generar
     *     responses:
     *       200:
     *         description: Lista de patientos generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Patient'
     *       400:
     *         description: Parámetro inválido
     */
    router.get("/:countPatients", controller.getAllPatients);

    return router;
  }
}
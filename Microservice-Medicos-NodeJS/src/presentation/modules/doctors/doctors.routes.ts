import { Router } from "express";
import { DoctorsController } from "./doctors.controller";

export class DoctorsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new DoctorsController();

    /**
     * @openapi
     * /api/doctors/{countDoctors}:
     *   get:
     *     summary: Obtener listado de médicos
     *     description: Retorna una lista de médicos generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Doctors
     *     parameters:
     *       - in: path
     *         name: countDoctors
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de médicos a generar
     *     responses:
     *       200:
     *         description: Lista de médicos generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Doctor'
     *       400:
     *         description: Parámetro inválido
     */
    router.get("/id/:id", controller.getDoctorById);
    router.post("/", controller.registerDoctor);
    router.get("/:countDoctors", controller.getAllDoctors);

    return router;
  }
}
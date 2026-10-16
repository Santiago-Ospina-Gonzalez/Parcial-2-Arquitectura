import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { PatientsService } from "./patients.service";

/**
 * Controlador de patientos.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con patientos,
 * delegando la lógica de negocio al `PatientsService`.
 */
export class PatientsController {

  /**
   * Servicio de patientos.
   */
  private readonly patientsService = new PatientsService();

  /**
   * Maneja la petición HTTP para obtener un listado de patientos.
   *
   * @remarks
   * El número de patientos a generar se obtiene desde los
   * parámetros de la ruta.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /patients/10
   * ```
   */
  getAllPatients = (req: Request, res: Response): void => {
    const { countPatients } = req.params;

    setTimeout(() => {
      this.patientsService
      .getAllPatients(Number(countPatients))
      .then((patients) => res.status(201).json(patients))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };
}

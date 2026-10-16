import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { DoctorsService } from "./doctors.service";

/**
 * Controlador de médicos.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con médicos,
 * delegando la lógica de negocio al `DoctorsService`.
 */
export class DoctorsController {

  /**
   * Servicio de médicos.
   */
  private readonly doctorsService = new DoctorsService();

  /**
   * Maneja la petición HTTP para obtener un listado de médicos.
   *
   * @remarks
   * El número de médicos a generar se obtiene desde los
   * parámetros de la ruta.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /doctors/10
   * ```
   */
  getAllDoctors = (req: Request, res: Response): void => {
    const { countDoctors } = req.params;

    setTimeout(() => {
      this.doctorsService
      .getAllDoctors(Number(countDoctors))
      .then((doctors) => res.status(201).json(doctors))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };
}
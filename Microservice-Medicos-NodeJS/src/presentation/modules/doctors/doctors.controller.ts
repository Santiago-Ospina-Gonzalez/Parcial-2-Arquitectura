import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { DoctorsService } from "./doctors.service";
import { ListDoctorsUseCase } from "../../../application/usecases/list-doctors.usecase";
import { GetDoctorByIdUseCase } from "../../../application/usecases/get-doctor-by-id.usecase";
import { RegisterDoctorUseCase } from "../../../application/usecases/register-doctor.usecase";

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
  private readonly listDoctors = new ListDoctorsUseCase(this.doctorsService);
  private readonly getDoctorByIdUseCase = new GetDoctorByIdUseCase(this.doctorsService);
  private readonly registerDoctorUseCase = new RegisterDoctorUseCase(this.doctorsService);

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
      this.listDoctors
      .execute(Number(countDoctors))
      .then((doctors) => res.status(201).json(doctors))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };

  getDoctorById = (req: Request, res: Response): void => {
    this.getDoctorByIdUseCase.execute(Number(req.params.id))
      .then((doctor) => res.status(200).json(doctor))
      .catch((error) => HandleError.error(error, res));
  };

  registerDoctor = (req: Request, res: Response): void => {
    this.registerDoctorUseCase.execute(req.body)
      .then((doctor) => res.status(201).json(doctor))
      .catch((error) => HandleError.error(error, res));
  };
}
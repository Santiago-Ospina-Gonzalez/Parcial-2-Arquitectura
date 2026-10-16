import { DoctorEngineering, Doctor } from "../../../domain/interfaces/doctor.interface";
import { faker } from '@faker-js/faker';

/**
 * Servicio encargado de la generación y gestión de médicos.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar médicos
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class DoctorsService {

  /**
   * Lista de ingenierías disponibles para los médicos.
   *
   * @remarks
   * Se utiliza para asignar aleatoriamente una carrera
   * a cada usuario generado.
   */
  private DoctorEngineerings: DoctorEngineering[] = [
    'Sistemas',
    'Electronica',
    'Biomedica',
    'Industrial',
    'Ambiental',
  ];

  /**
   * Obtiene un listado de médicos generados dinámicamente.
   *
   * @param countDoctors Cantidad de médicos a generar
   * @returns Promesa que resuelve un arreglo de médicos
   *
   * @example
   * ```ts
   * const doctors = await doctorsService.getAllDoctors(5);
   * ```
   */
  public async getAllDoctors(countDoctors: number): Promise<Doctor[]> {
    const doctors: Promise<Doctor>[] = [];

    for (let i = 1; i <= countDoctors; i++) {
      doctors.push(this.generateDoctor(i));
    }

    return Promise.all(doctors);
  }

  /**
   * Genera un usuario ficticio.
   *
   * @param id Identificador único del usuario
   * @returns Promesa que resuelve un usuario generado
   */
  private generateDoctor(id: number): Promise<Doctor> {
    return Promise.resolve({
      id,
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 65 }),
      email: faker.internet.email(),
      engineering: faker.helpers.arrayElement(this.DoctorEngineerings),
    });
  }
}

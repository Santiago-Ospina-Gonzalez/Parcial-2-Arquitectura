import { faker } from '@faker-js/faker';
import { Patient, PatientCategory } from '../../../domain/interfaces/patient.interface';

/**
 * Servicio encargado de la generación y gestión de patientos.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar patientos
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class PatientsService {

  /**
   * Categorías disponibles para los patientos.
   *
   * @remarks
   * Se utilizan para asignar aleatoriamente una categoría
   * a cada patiento generado.
   */
  private categories: PatientCategory[] = [
    'Carnes',
    'Frutas',
    'Lacteos',
    'Verduras'
  ];

  /**
   * Obtiene un listado de patientos generados dinámicamente.
   *
   * @param countPatients Cantidad de patientos a generar
   * @returns Promesa que resuelve un arreglo de patientos
   *
   * @example
   * ```ts
   * const patients = await patientsService.getAllPatients(10);
   * ```
   */
  public async getAllPatients(countPatients: number): Promise<Patient[]> {
    const patients: Promise<Patient>[] = [];

    for (let i = 1; i <= countPatients; i++) {
      patients.push(this.generatePatient(i));
    }

    return Promise.all(patients);
  }

  /**
   * Genera un patiento ficticio.
   *
   * @param id Identificador único del patiento
   * @returns Promesa que resuelve un patiento generado
   */
  private generatePatient(id: number): Promise<Patient> {
    return Promise.resolve({
      id,
      name: faker.commerce.patientName(),
      price: Number(
        faker.commerce.price({ min: 1, max: 100, dec: 2 })
      ),
      category: faker.helpers.arrayElement(this.categories),
    });
  }
}

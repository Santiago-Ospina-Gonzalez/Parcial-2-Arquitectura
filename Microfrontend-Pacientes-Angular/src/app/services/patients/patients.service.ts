import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../interfaces/patients.interface';

/**
 * Servicio encargado de la gestión de patientos.
 *
 * Proporciona métodos para obtener información de patientos
 * desde la API REST.
 *
 * @example
 * ```ts
 * constructor(private patientsService: PatientsService) {}
 *
 * this.patientsService.getAllPatients(10).subscribe(patients => {
 *   console.log(patients);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class PatientsService {

  /**
   * Cliente HTTP de Angular para realizar peticiones a la API.
   * Se inyecta usando la función `inject`.
   */
  private httpClient = inject(HttpClient);

  /**
   * Obtiene una lista de patientos desde el backend.
   *
   * @param countPatients Número de patientos a obtener.
   * @returns Observable que emite un array de patientos.
   *
   * @example
   * ```ts
   * this.patientsService.getAllPatients(5).subscribe(patients => {
   *   console.log(patients);
   * });
   * ```
   */
  getAllPatients(countPatients: number): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(`http://localhost:3002/api/patients/${countPatients}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../interfaces/doctors.interface';

/**
 * Servicio encargado de la gestión de médicos.
 *
 * Proporciona métodos para obtener información de médicos
 * desde la API REST.
 *
 * @example
 * ```ts
 * constructor(private doctorsService: DoctorsService) {}
 *
 * this.doctorsService.getAllDoctors(10).subscribe(doctors => {
 *   console.log(doctors);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class DoctorsService {

  /**
   * Cliente HTTP de Angular para realizar peticiones a la API.
   * Se inyecta usando la función `inject`.
   */
  private httpClient = inject(HttpClient);

  /**
   * Obtiene una lista de médicos desde el backend.
   *
   * @param countDoctors Número de médicos a obtener.
   * @returns Observable que emite un array de médicos.
   *
   * @example
   * ```ts
   * this.doctorsService.getAllDoctors(5).subscribe(doctors => {
   *   console.log(doctors);
   * });
   * ```
   */
  getAllDoctors(countDoctors: number): Observable<Doctor[]> {
    return this.httpClient.get<Doctor[]>(`http://localhost:3001/api/doctors/${countDoctors}`);
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.httpClient.get<Doctor>(`http://localhost:3001/api/doctors/id/${id}`);
  }

  registerDoctor(doctor: Omit<Doctor, 'id'>): Observable<Doctor> {
    return this.httpClient.post<Doctor>('http://localhost:3001/api/doctors', doctor);
  }
}
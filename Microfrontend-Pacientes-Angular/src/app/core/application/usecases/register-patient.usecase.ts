import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../../interfaces/patients.interface';
import { PatientsService } from '../../../services/patients/patients.service';

@Injectable({ providedIn: 'root' })
export class RegisterPatientUseCase {
  private readonly service = inject(PatientsService);

  execute(patient: Omit<Patient, 'id'>): Observable<Patient> {
    return this.service.registerPatient(patient);
  }
}

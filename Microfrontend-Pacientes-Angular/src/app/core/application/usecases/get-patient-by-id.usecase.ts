import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../../interfaces/patients.interface';
import { PatientsService } from '../../../services/patients/patients.service';

@Injectable({ providedIn: 'root' })
export class GetPatientByIdUseCase {
  private readonly service = inject(PatientsService);

  execute(id: number): Observable<Patient> {
    return this.service.getPatientById(id);
  }
}

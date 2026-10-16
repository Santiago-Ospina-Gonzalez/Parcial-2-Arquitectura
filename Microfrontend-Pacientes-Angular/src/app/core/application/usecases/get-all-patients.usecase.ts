import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../../interfaces/patients.interface';
import { PatientsService } from '../../../services/patients/patients.service';

@Injectable({ providedIn: 'root' })
export class GetAllPatientsUseCase {
  private readonly service = inject(PatientsService);

  execute(): Observable<Patient[]> {
    return this.service.getAllPatients();
  }
}

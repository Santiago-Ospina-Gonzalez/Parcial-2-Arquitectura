import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../../interfaces/doctors.interface';
import { DoctorsService } from '../../../services/doctors/doctors.service';

@Injectable({ providedIn: 'root' })
export class GetDoctorByIdUseCase {
  private readonly service = inject(DoctorsService);

  execute(id: number): Observable<Doctor> {
    return this.service.getDoctorById(id);
  }
}

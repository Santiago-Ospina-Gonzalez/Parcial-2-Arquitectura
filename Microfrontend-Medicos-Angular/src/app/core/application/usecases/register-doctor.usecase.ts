import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../../interfaces/doctors.interface';
import { DoctorsService } from '../../../services/doctors/doctors.service';

@Injectable({ providedIn: 'root' })
export class RegisterDoctorUseCase {
  private readonly service = inject(DoctorsService);

  execute(doctor: Omit<Doctor, 'id'>): Observable<Doctor> {
    return this.service.registerDoctor(doctor);
  }
}

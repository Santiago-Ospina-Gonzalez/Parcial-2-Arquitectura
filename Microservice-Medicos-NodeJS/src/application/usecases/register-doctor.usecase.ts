import { Doctor } from '../../domain/interfaces/user.interface';
import { DoctorsService } from '../../presentation/modules/doctors/doctors.service';

export class RegisterDoctorUseCase {
  constructor(private readonly service: DoctorsService) {}

  execute(doctor: Omit<Doctor, 'id'>): Promise<Doctor> {
    return this.service.registerDoctor(doctor);
  }
}

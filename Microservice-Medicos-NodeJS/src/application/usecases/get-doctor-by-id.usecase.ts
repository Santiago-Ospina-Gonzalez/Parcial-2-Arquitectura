import { Doctor } from '../../domain/interfaces/user.interface';
import { DoctorsService } from '../../presentation/modules/doctors/doctors.service';

export class GetDoctorByIdUseCase {
  constructor(private readonly service: DoctorsService) {}

  execute(id: number): Promise<Doctor> {
    return this.service.getDoctorById(id);
  }
}

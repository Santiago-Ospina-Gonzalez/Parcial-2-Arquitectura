import { Doctor } from '../../domain/interfaces/user.interface';
import { DoctorsService } from '../../presentation/modules/doctors/doctors.service';

export class ListDoctorsUseCase {
  constructor(private readonly service: DoctorsService) {}

  execute(count: number): Promise<Doctor[]> {
    return this.service.getAllDoctors(count);
  }
}

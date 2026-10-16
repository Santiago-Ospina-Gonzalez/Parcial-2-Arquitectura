import { Component, inject } from '@angular/core';
import { DoctorsTableComponent } from '../../components/doctors-table/doctors-table.component';
import { Doctor } from '../../interfaces/doctors.interface';
import { GetAllDoctorsUseCase } from '../../core/application/usecases/get-all-doctors.usecase';
import { GetDoctorByIdUseCase } from '../../core/application/usecases/get-doctor-by-id.usecase';
import { RegisterDoctorUseCase } from '../../core/application/usecases/register-doctor.usecase';
import { State } from '../../interfaces/state.interface';
import { AlertComponent } from '../../components/alert/alert.component';

/**
 * Componente contenedor de médicos.
 *
 * Se utiliza para gestionar y mostrar un listado de médicos
 * utilizando el componente `TableDoctorsComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `DoctorsService`
 * para obtener los médicos y pasarlos al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 *
 */
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.page.html',
  imports: [DoctorsTableComponent, AlertComponent],
})
export class DoctorsPage {
  /**
   * Listado de médicos obtenidos desde el servicio.
   * @type {Doctor[]}
   */
  doctors: Doctor[] = [];
  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Servicio para obtener médicos.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private getAllDoctors = inject(GetAllDoctorsUseCase);
  private getDoctorById = inject(GetDoctorByIdUseCase);
  private registerDoctor = inject(RegisterDoctorUseCase);
  doctorId = '';
  doctorName = '';
  doctorLastName = '';
  doctorEmail = '';
  selectedDoctor: Doctor | null = null;
  actionMessage = '';

  /**
   * Inicializa el componente y carga los médicos.
   * @remarks
   * Se suscribe al método `getAllDoctors()` del servicio y
   * asigna los datos recibidos a la propiedad `doctors`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllDoctors.execute().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error)
        this.state = 'error';
      },
    })
  }

  findDoctor(): void {
    const id = Number(this.doctorId);
    if (!Number.isInteger(id) || id < 1) {
      this.actionMessage = 'Ingrese un ID de médico válido.';
      return;
    }
    this.getDoctorById.execute(id).subscribe({
      next: (doctor) => {
        this.selectedDoctor = doctor;
        this.actionMessage = `Médico encontrado: ${doctor.name} ${doctor.lastName}`;
      },
      error: () => this.actionMessage = 'No fue posible consultar el médico.',
    });
  }

  saveDoctor(): void {
    this.registerDoctor.execute({
      name: this.doctorName,
      lastName: this.doctorLastName,
      age: 30,
      email: this.doctorEmail,
      engineering: 'Sistemas',
    }).subscribe({
      next: (doctor) => {
        this.doctors = [...this.doctors, doctor];
        this.actionMessage = `Médico registrado: ${doctor.name}`;
      },
      error: () => this.actionMessage = 'No fue posible registrar el médico.',
    });
  }
}
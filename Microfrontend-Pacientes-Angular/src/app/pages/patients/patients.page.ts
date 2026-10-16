import { Component, inject } from '@angular/core';
import { PatientsTableComponent } from '../../components/patients-table/patients-table.component';
import { Patient } from '../../interfaces/patients.interface';
import { GetAllPatientsUseCase } from '../../core/application/usecases/get-all-patients.usecase';
import { GetPatientByIdUseCase } from '../../core/application/usecases/get-patient-by-id.usecase';
import { RegisterPatientUseCase } from '../../core/application/usecases/register-patient.usecase';
import { State } from '../../interfaces/state.interface';
import { AlertComponent } from '../../components/alert/alert.component';

/**
 * Componente contenedor de pacientes.
 *
 * Se utiliza para gestionar y mostrar un listado de pacientes
 * utilizando el componente `PatientsTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `PatientsService`
 * para obtener los pacientes y pasarlos al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 *
 */
@Component({
  selector: 'app-patients',
  templateUrl: `./patients.page.html`,
  imports: [PatientsTableComponent, AlertComponent]
})
export class PatientsPage {
  /**
   * Listado de pacientes obtenidos desde el servicio.
   * @type {Patient[]}
   */
  patients: Patient[] = [];
  /**
     * Estado actual del componente.
     *
     * @default 'init'
     */
    state: State = 'init';
  

  /**
   * Servicio para obtener pacientes.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private getAllPatients = inject(GetAllPatientsUseCase);
  private getPatientById = inject(GetPatientByIdUseCase);
  private registerPatient = inject(RegisterPatientUseCase);
  patientId = '';
  patientName = '';
  patientDocument = '';
  patientPhone = '';
  selectedPatient: Patient | null = null;
  actionMessage = '';

  /**
   * Inicializa el componente y carga los pacientes.
   * @remarks
   * Se suscribe al método `getAllPatients()` del servicio y
   * asigna los datos recibidos a la propiedad `patients`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllPatients.execute().subscribe({
      next: (patients) => {
        this.patients = patients;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error)
        this.state = 'error';
      },
    })
  }

  findPatient(): void {
    const id = Number(this.patientId);
    if (!Number.isInteger(id) || id < 1) {
      this.actionMessage = 'Ingrese un ID de paciente válido.';
      return;
    }
    this.getPatientById.execute(id).subscribe({
      next: (patient) => {
        this.selectedPatient = patient;
        this.actionMessage = `Paciente encontrado: ${patient.nombre}`;
      },
      error: () => this.actionMessage = 'No fue posible consultar el paciente.',
    });
  }

  savePatient(): void {
    this.registerPatient.execute({
      nombre: this.patientName,
      documento: this.patientDocument,
      telefono: this.patientPhone,
    }).subscribe({
      next: (patient) => {
        this.patients = [...this.patients, patient];
        this.actionMessage = `Paciente registrado: ${patient.nombre}`;
      },
      error: () => this.actionMessage = 'No fue posible registrar el paciente.',
    });
  }
}

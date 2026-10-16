import { Component, inject } from '@angular/core';
import { PatientsTableComponent } from '../../components/patients-table/patients-table.component';
import { Patient } from '../../interfaces/patients.interface';
import { GetAllPatientsUseCase } from '../../core/application/usecases/get-all-patients.usecase';
import { State } from '../../interfaces/state.interface';
import { AlertComponent } from '../../components/alert/alert.component';

/**
 * Componente contenedor de patientos.
 *
 * Se utiliza para gestionar y mostrar un listado de patientos
 * utilizando el componente `PatientsTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `PatientsService`
 * para obtener los patientos y pasarlos al componente de tabla.
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
   * Listado de patientos obtenidos desde el servicio.
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
   * Servicio para obtener patientos.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private getAllPatients = inject(GetAllPatientsUseCase);

  /**
   * Inicializa el componente y carga los patientos.
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
}

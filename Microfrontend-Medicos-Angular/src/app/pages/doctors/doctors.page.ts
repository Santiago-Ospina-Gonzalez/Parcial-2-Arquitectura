import { Component, inject } from '@angular/core';
import { DoctorsTableComponent } from '../../components/doctors-table/doctors-table.component';
import { Doctor } from '../../interfaces/doctors.interface';
import { GetAllDoctorsUseCase } from '../../core/application/usecases/get-all-doctors.usecase';
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
}
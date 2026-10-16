import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { DoctorEngineering, Doctor } from '../../interfaces/doctors.interface';

/**
 * Componente de tabla de médicos.
 *
 * Se utiliza para mostrar un listado de médicos en una tabla,
 * mostrando información como id, nombre, apellido, email y un badge
 * visual que indica la ingenieria de cada usuario.
 *
 * @remarks
 * Este componente recibe los médicos desde un componente padre
 * a través del Input `doctors` y utiliza el mapeo `engineeringMap`
 * para asignar colores a los badges según la categoría.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-doctors-table [doctors]="doctorsList"></app-doctors-table>
 * ```
 */
@Component({
  selector: 'app-doctors-table',
  templateUrl: './doctors-table.component.html',
  imports: [BadgeAtom],
})
export class DoctorsTableComponent {
  /**
   * Listado de médicos que se mostrarán en la tabla.
   * @type {Doctor[]}
   * @remarks
   * Este Input permite pasar un array de médicos desde un componente padre,
   * generalmente `ListDoctorsComponent`. Cada usuario debe cumplir la interfaz `Doctor`.
   */
  @Input() doctors: Doctor[] = [];
  /**
   * Mapeo de ingenierias de médicos a tipos de Badge.
   * @type {Record<Category, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada ingenieria:
   * - 'Sistemas' → 'success' (verde)
   * - 'Electronica' → 'primary' (azul)
   * - 'Biomedica' → 'warning' (amarillo)
   * - 'Industrial' → 'danger' (rojo)
   * - 'Ambiental' → 'secondary' (gris)
   *
   * Esto permite que en la tabla cada usuario tenga un badge visual que indique su ingenieria
   * de forma clara para el usuario.
   */
  engineeringMap: Record<DoctorEngineering, BadgeType> = {
    'Sistemas' : 'success',
    'Electronica': 'primary',
    'Biomedica': 'warning',
    'Industrial': 'danger',
    'Ambiental': 'secondary'
  }
}

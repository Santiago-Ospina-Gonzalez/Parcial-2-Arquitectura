import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Patient } from '../../interfaces/patients.interface';

/**
 * Componente de tabla de patientos.
 *
 * Se utiliza para mostrar un listado de patientos en una tabla,
 * mostrando información como nombre, categoría, precio y un badge
 * visual que indica la categoría de cada patiento.
 *
 * @remarks
 * Este componente recibe los patientos desde un componente padre
 * a través del Input `patients` y utiliza el mapeo `categoryMap`
 * para asignar colores a los badges según la categoría.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-patients-table [patients]="patientsList"></app-patients-table>
 * ```
 */
@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  imports: [CommonModule],
})
export class PatientsTableComponent {
  /**
   * Listado de patientos que se mostrarán en la tabla.
   * @type {Patient[]}
   * @remarks
   * Este Input permite pasar un array de patientos desde un componente padre,
   * generalmente `ListPatientsComponent`. Cada patiento debe cumplir la interfaz `Patient`.
   */
  @Input() patients: Patient[] = [];
  /**
   * Mapeo de categorías de patientos a tipos de Badge.
   * @type {Record<PatientCategory, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada categoría:
   * - 'Carnes' → 'danger' (rojo)
   * - 'Frutas' → 'warning' (amarillo)
   * - 'Lacteos' → 'primary' (azul)
   * - 'Verduras' → 'success' (verde)
   *
   * Esto permite que en la tabla cada patiento tenga un badge visual que indique su categoría
   * de forma clara para el usuario.
   */
}

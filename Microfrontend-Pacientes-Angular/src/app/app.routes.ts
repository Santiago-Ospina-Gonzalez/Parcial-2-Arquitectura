import { Routes } from '@angular/router';
import { PatientsPage } from './pages/patients/patients.page';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes correspondientes.
 *
 * Incluye:
 * - Rutas de navegación principales
 * - Redirección por defecto para rutas no existentes
 *
 * @see {@link PatientsPage}
 */
export const routes: Routes = [
  /**
   * Ruta de médicos.
   *
   * @remarks
   * Renderiza el componente `PatientsPage`, encargado
   * de mostrar y gestionar el listado de médicos.
   */
  { path: '', loadComponent: () => import('./pages/patients/patients.page').then((m) => m.PatientsPage)},
];
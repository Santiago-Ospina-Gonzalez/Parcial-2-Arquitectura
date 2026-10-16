import { Routes } from '@angular/router';
import { DoctorsPage } from './pages/doctors/doctors.page';

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
 * @see {@link DoctorsPage}
 */
export const routes: Routes = [
  /**
   * Ruta de médicos.
   *
   * @remarks
   * Renderiza el componente `DoctorsPage`, encargado
   * de mostrar y gestionar el listado de médicos.
   */
  { path: '', loadComponent: () => import('./pages/doctors/doctors.page').then((m) => m.DoctorsPage)},
];
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

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
 * @see {@link PatientsPage}
 */
export const routes: Routes = [

  /**
   * Ruta de médicos.
   *
   * @remarks
   * Renderiza el componente `DoctorsPage`, encargado
   * de mostrar y gestionar el listado de médicos.
   */
  {
        path: 'doctors',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4201/remoteEntry.js',
                exposedModule: './DoctorsPage',
        }).then(m => m.DoctorsPage),
    },
    
    {
        path: '',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4204/remoteEntry.js',
                exposedModule: './Page',
            }).then(m => m.Page),
    },

    {
        path: 'appointments',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4203/remoteEntry.js',
                exposedModule: './AppointmentsPage',
            }).then(m => m.AppointmentsPage),
    },
  /**
   * Ruta de patientos.
   *
   * @remarks
   * Renderiza el componente `PatientsPage`, encargado
   * de mostrar y gestionar el listado de patientos.
   */
    {
        path: 'patients',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4202/remoteEntry.js',
                exposedModule: './PatientsPage',
        }).then(m => m.PatientsPage),
    },

  /**
   * Ruta comodín.
   *
   * @remarks
   * Captura cualquier ruta no definida y redirige
   * automáticamente a la ruta de médicos.
   */
  { path: '**', redirectTo: 'doctors' },
];
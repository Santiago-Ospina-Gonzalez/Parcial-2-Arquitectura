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
 * @see {@link PatientsPage}
 */
export const routes: Routes = [

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
   * Ruta de pacientes.
   *
   * @remarks
   * Renderiza el componente `PatientsPage`, encargado
   * de mostrar y gestionar el listado de pacientes.
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
   * automáticamente a la ruta de pacientes.
   */
  { path: '**', redirectTo: 'patients' },
];
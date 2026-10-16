import { Routes } from '@angular/router';
export const routes: Routes = [{ path: '', loadComponent: () => import('./pages/appointments/appointments.page').then((m) => m.AppointmentsPage) }];

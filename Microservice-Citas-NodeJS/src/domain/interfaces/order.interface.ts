/** Representa una orden generada por el microservicio. */
export interface Appointment {
  id: number;
  customerName: string;
  total: number;
  status: AppointmentStatus;
  createdAt: string;
}

export type AppointmentStatus = 'Pendiente' | 'Procesando' | 'Enviada' | 'Entregada';

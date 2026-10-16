/**
 * Interfaz que representa un paciente.
 *
 * Contiene la información básica necesaria para mostrar un paciente
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada paciente debe tener un `id` único, nombre, documento y teléfono.
 *
 * @example
 * ```ts
 * const paciente: Patient = {
 *   id: 1,
 *   nombre: 'Ana Pérez',
 *   documento: '1001',
 *   telefono: '3001001001'
 * };
 * ```
 */
export interface Patient {
  id: number;
  nombre: string;
  documento: string;
  telefono: string;
}
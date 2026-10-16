/**
 * Interfaz que representa un paciente.
 *
 * Contiene la información básica necesaria para mostrar un paciente
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada paciente debe tener un `id` único, un `name` descriptivo,
 * una `category` válida y un `price` en pesos colombianos.
 *
 * @example
 * ```ts
 * const paciente: Patient = {
 *   id: 1,
 *   name: 'Leche entera',
 *   category: 'Lacteos',
 *   price: 4500
 * };
 * ```
 */
export interface Patient {
  id: number;
  name: string;
  document: string;
  phone: string;
}
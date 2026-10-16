/**
 * Interfaz que representa un patiento.
 *
 * Contiene la información básica necesaria para mostrar un patiento
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada patiento debe tener un `id` único, un `name` descriptivo,
 * una `category` válida y un `price` en pesos colombianos.
 *
 * @example
 * ```ts
 * const patiento: Patient = {
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
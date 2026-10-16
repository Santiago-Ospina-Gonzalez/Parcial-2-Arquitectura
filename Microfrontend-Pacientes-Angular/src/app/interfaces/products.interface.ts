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
    /** Identificador único del patiento */
    id: number;

    /** Nombre o descripción del patiento */
    name: string;

    /** Categoría del patiento */
    category: PatientCategory;

    /** Precio del patiento en pesos */
    price: number;
}

/**
 * Tipo de categoría de patiento.
 *
 * @remarks
 * Este tipo restringe las categorías a los valores predefinidos:
 * - 'Lacteos'
 * - 'Carnes'
 * - 'Frutas'
 * - 'Verduras'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const categoria: PatientCategory = 'Frutas';
 * ```
 */
export type PatientCategory = 'Lacteos' | 'Carnes' | 'Frutas' | 'Verduras';
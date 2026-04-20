import { Category, Service } from './types';

export const CATEGORIES: Category[] = [
  { id: 1, nombre: 'Taquizas' },
  { id: 2, nombre: 'Barras de Snacks' },
  { id: 3, nombre: 'Bebidas' },
  { id: 4, nombre: 'Canapés' },
  { id: 5, nombre: 'Personal' },
  { id: 7, nombre: 'Callejoneadas' },
  { id: 6, nombre: 'Eventos Especiales' },
];

export const SERVICES: Service[] = [
  // Taquizas
  { id: 1, categoria_id: 1, nombre: 'Taquiza Guisos (Adulto)', precio_base: 110.00, unidad_medida: 'persona', descripcion: 'Incluye frijoles, arroz, salsas y tortillas.' },
  { id: 2, categoria_id: 1, nombre: 'Taquiza Guisos (Niño)', precio_base: 70.00, unidad_medida: 'persona' },
  { id: 3, categoria_id: 1, nombre: 'Taquiza Especial (Adulto)', precio_base: 130.00, unidad_medida: 'persona', descripcion: 'Bistec, pastor, brocheta, birria y más.' },
  { id: 4, categoria_id: 1, nombre: 'Taquiza Especial (Niño)', precio_base: 70.00, unidad_medida: 'persona' },
  
  // Snacks
  { id: 5, categoria_id: 2, nombre: 'Barra de Snacks (Base fruta/fritura)', precio_base: 45.00, unidad_medida: 'persona', descripcion: 'Incluye 7 tipos de toppings a elegir.' },
  { id: 6, categoria_id: 2, nombre: 'Barra de Maruchan', precio_base: 65.00, unidad_medida: 'persona', descripcion: 'Variedad de salsas y toppings.' },
  { id: 7, categoria_id: 2, nombre: 'Barra de Paletas de Hielo', precio_base: 35.00, unidad_medida: 'persona' },
  { id: 8, categoria_id: 2, nombre: 'Barra de Elotes (6oz)', precio_base: 35.00, unidad_medida: 'persona' },
  { id: 9, categoria_id: 2, nombre: 'Barra de Elotes (8oz)', precio_base: 45.00, unidad_medida: 'persona' },
  
  // Bebidas
  { id: 10, categoria_id: 3, nombre: 'Barra de Cantaritos', precio_base: 125.00, unidad_medida: 'persona' },
  { id: 11, categoria_id: 3, nombre: 'Cantarito Loco (20L)', precio_base: 1500.00, unidad_medida: 'lote' },
  { id: 12, categoria_id: 3, nombre: 'Clericot (20L)', precio_base: 1200.00, unidad_medida: 'lote' },
  { id: 13, categoria_id: 3, nombre: 'Aguas naturales (20L)', precio_base: 300.00, unidad_medida: 'lote', descripcion: 'Diferentes sabores disponibles.' },
  
  // Canapés
  { id: 14, categoria_id: 4, nombre: 'Canapés y fruta', precio_base: 80.00, unidad_medida: 'persona' },
  { id: 15, categoria_id: 4, nombre: 'Canapés, fruta y Café', precio_base: 90.00, unidad_medida: 'persona' },
  
  // Personal
  { id: 16, categoria_id: 5, nombre: 'Meseros', precio_base: 500.00, unidad_medida: 'unidad' },
  { id: 17, categoria_id: 5, nombre: 'Edecanes', precio_base: 500.00, unidad_medida: 'unidad' },
  { id: 20, categoria_id: 5, nombre: 'Barman', precio_base: 500.00, unidad_medida: 'unidad' },
  { id: 21, categoria_id: 5, nombre: 'Bartender', precio_base: 600.00, unidad_medida: 'unidad' },
  { id: 22, categoria_id: 5, nombre: 'Capitán de meseros', precio_base: 800.00, unidad_medida: 'unidad' },

  // Otros (No cotizables según requerimiento pero deben aparecer)
  { id: 19, categoria_id: 6, nombre: 'Organización de Eventos', precio_base: 0, unidad_medida: 'servicio', descripcion: 'Coordinación completa o por día del evento.' },

  // Callejoneadas
  { id: 30, categoria_id: 7, nombre: 'Callejoneada Pequeña (50-69 pers.) - Con Verbena', precio_base: 410.00, unidad_medida: 'persona' },
  { id: 31, categoria_id: 7, nombre: 'Callejoneada Pequeña (50-69 pers.) - Sin Verbena', precio_base: 280.00, unidad_medida: 'persona' },
  { id: 32, categoria_id: 7, nombre: 'Callejoneada Mediana (70-99 pers.) - Con Verbena', precio_base: 330.00, unidad_medida: 'persona' },
  { id: 33, categoria_id: 7, nombre: 'Callejoneada Mediana (70-99 pers.) - Sin Verbena', precio_base: 200.00, unidad_medida: 'persona' },
  { id: 34, categoria_id: 7, nombre: 'Callejoneada Grande (100+ pers.) - Con Verbena', precio_base: 280.00, unidad_medida: 'persona' },
  { id: 35, categoria_id: 7, nombre: 'Callejoneada Grande (100+ pers.) - Sin Verbena', precio_base: 150.00, unidad_medida: 'persona' },
];

export interface Category {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Service {
  id: number;
  categoria_id: number;
  nombre: string;
  precio_base: number;
  unidad_medida: 'persona' | 'unidad' | 'lote' | 'servicio';
  descripcion?: string;
  image?: string;
}

export interface QuoteItem extends Service {
  cantidad: number;
}

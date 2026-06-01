export type Language = 'ge' | 'en' | 'ru';
export type Theme = 'light' | 'dark';

export interface Product {
  id: string;
  title: Record<Language, string>;
  category: string;
  price: number;
  discountPrice?: number;
  inStock: boolean;
  harvestDate?: string; // e.g. "2023-10-25"
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'saved' | 'ordered' | 'on_the_way' | 'cancelled';
  items: CartItem[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  images: string[];
  specs: { [key: string]: string };
  reviews: Review[];
  rating: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

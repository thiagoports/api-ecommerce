export type Category = {
  id: number;
  name: string;
  img: string | null;
  description?: string | null;
  products?: Product[];
};

export type Product = {
  id: number;
  name: string;
  img: string | null;
  description: string;
  price: string;
  stock: number;
  category: number | Category;
};

export type Cliente = {
  cpf?: string | null;
  telefone?: string | null;
  data_nascimento?: string | null;
};

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
};

export type Cart = {
  id: number;
  cliente: number;
  items: CartItem[];
};

export type Payment = {
  id: number;
  payment_method: "credit_card" | "pix" | "boleto" | "debit_card" | "cash";
  amount: string;
  status: "pending" | "approved" | "rejected" | "refunded" | "canceled";
  paid_at?: string | null;
  cart: Cart;
};

export type UserMinimal = {
  id: number;
  username: string;
  email: string;
};

export type LoginResponse = {
  access: string;
  refresh: string;
  user: UserMinimal;
};

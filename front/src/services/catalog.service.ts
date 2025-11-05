import api from "../lib/http";
import type { Category, Product } from "../types/api";
import { asArray } from "../utils/asArray";

export async function listCategories() {
  const res = await api.get<Category[]>("v1/categories/");
  return asArray(res.data);
}

export async function listProducts(params?: {
  search?: string;
  page?: number;
}) {
  const res = await api.get<Product[]>("v1/products/", { params });
  return asArray(res.data);
}

export async function getProduct(id: number) {
  const { data } = await api.get<Product>(`v1/products/${id}/`);
  return data;
}

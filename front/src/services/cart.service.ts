import api from "../lib/http";
import type { Cart, CartItem } from "../types/api";
import { asArray } from "../utils/asArray";

export async function getMyCart(): Promise<Cart> {
    const { data } = await api.get<Cart[]>("v1/carts/");
    if (!data.length) {
        const created = await api.post<Cart>("v1/carts/", {});
        return created.data;
    }
    return data[0];
}

export async function listCartItems() {
    const { data } = await api.get<CartItem[]>("v1/cart-items/");
    return asArray(data);
}

export async function addItemToCart(productId: number, quantity = 1) {
    const payload = { product_id: productId, quantity };
    return await api.post<CartItem>("v1/cart-items/", payload);
}

export async function updateCartItem(itemId: number, quantity: number) {
    return await api.patch<CartItem>(`v1/cart-items/${itemId}/`, { quantity });
}

export async function removeCartItem(itemId: number) {
    await api.delete(`v1/cart-items/${itemId}/`);
}

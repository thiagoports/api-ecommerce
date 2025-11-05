import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listCartItems, addItemToCart, updateCartItem, removeCartItem, getMyCart } from "../services/cart.service";

export const useMyCart = () =>
    useQuery({ queryKey: ["cart"], queryFn: getMyCart });

export const useCartItems = () =>
    useQuery({ queryKey: ["cartItems"], queryFn: listCartItems });

export const useAddItem = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ productId, quantity }: { productId: number; quantity?: number }) =>
            addItemToCart(productId, quantity),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["cartItems"] });
            qc.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};

export const useUpdateItem = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
            updateCartItem(id, quantity),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["cartItems"] });
            qc.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};

export const useRemoveItem = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => removeCartItem(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["cartItems"] });
            qc.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};

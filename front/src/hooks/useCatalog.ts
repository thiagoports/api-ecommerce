import { useQuery } from "@tanstack/react-query";
import { listCategories, listProducts, getProduct } from "../services/catalog.service";

export const useCategories = () =>
    useQuery({ queryKey: ["categories"], queryFn: listCategories });

export const useProducts = (search?: string) =>
    useQuery({
        queryKey: ["products", { search }],
        queryFn: () => listProducts({ search }),
    });

export const useProduct = (id?: number) =>
    useQuery({
        queryKey: ["product", id],
        queryFn: () => getProduct(id!),
        enabled: !!id,
    });

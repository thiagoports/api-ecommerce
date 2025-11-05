'use client';
import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Skeleton } from "./ui/skeleton";

import { useCategories, useProducts } from "../hooks/useCatalog";
import type { Product as FEProduct, Category as FECategory } from "../types";
import type { Product as ApiProduct } from "../types/api";
import { slugify } from "../utils/slug";

function mapApiProductToFE(p: ApiProduct): FEProduct {
  const priceNumber =
    typeof p.price === "string" ? parseFloat(p.price) : ((p.price as unknown) as number);

  const categoryName =
    typeof p.category === "number"
      ? String(p.category)
      : (p.category as any)?.name ?? String((p.category as any)?.id ?? "");

  return {
    id: Number(p.id),
    name: p.name,
    price: priceNumber,
    description: p.description ?? "",
    category: categoryName,
    image: "",
    images: [],
    specs: {},
    reviews: [],
    rating: 0,
    isNew: false,
    isBestSeller: false,
  };
}

interface FilterContentProps {
  categories: FECategory[];
  selectedCategories: string[];
  toggleCategory: (slug: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  clearFilters: () => void;
  loadingCats: boolean;
}

const FilterContent: React.FC<FilterContentProps> = ({
  categories,
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  clearFilters,
  loadingCats,
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg text-gray-900 mb-4">Categorias</h3>
      <div className="space-y-3">
        {loadingCats ? (
          <>
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-48" />
          </>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${category.slug}`}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => toggleCategory(category.slug)}
              />
              <Label
                htmlFor={`cat-${category.slug}`}
                className="text-sm cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))
        )}
      </div>
    </div>

    <div>
      <h3 className="text-lg text-gray-900 mb-4">Faixa de Preço</h3>
      <div className="space-y-4">
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1000}
          step={10}
          className="w-full"
        />
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>R$ {priceRange[0]}</span>
          <span>R$ {priceRange[1]}</span>
        </div>
      </div>
    </div>

    <Button
      variant="outline"
      className="w-full border-[#6A1B9A] text-[#6A1B9A] hover:bg-[#E0BFEF]"
      onClick={clearFilters}
    >
      Limpar Filtros
    </Button>
  </div>
);

export const ProductListing: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("categoria") || "";

  const { data: apiCategories, isLoading: loadingCats } = useCategories();
  const { data: apiProducts, isLoading: loadingProds } = useProducts();

  const categories: FECategory[] = useMemo(() => {
    if (!apiCategories) return [];
    return apiCategories.map((c, idx) => ({
      id: Number(c.id ?? idx + 1),
      name: c.name,
      image: "https://images.unsplash.com/photo-1512446816042-444d641267ee?w=400",
      slug: slugify(c.name),
    }));
  }, [apiCategories]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFilter ? [categoryFilter] : []
  );
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("popular");

  const products: FEProduct[] = useMemo(() => {
    if (!apiProducts) return [];
    return (apiProducts as ApiProduct[]).map(mapApiProductToFE);
  }, [apiProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(slugify(p.category))
      );
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        break;
      case "popular":
      default:
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategories, priceRange, sortBy]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
  };

  const isLoading = loadingProds;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-gray-900 mb-2">
          {searchQuery ? `Resultados para "${searchQuery}"` : "Todos os Produtos"}
        </h1>
        <p className="text-gray-600">
          {isLoading ? "Carregando..." : `${filteredAndSortedProducts.length} ${filteredAndSortedProducts.length === 1 ? "produto" : "produtos"} encontrados`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-[#6A1B9A]" />
              <h2 className="text-xl text-gray-900">Filtros</h2>
            </div>
            <FilterContent
              categories={categories}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              clearFilters={clearFilters}
              loadingCats={loadingCats}
            />
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent
                    categories={categories}
                    selectedCategories={selectedCategories}
                    toggleCategory={toggleCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    clearFilters={clearFilters}
                    loadingCats={loadingCats}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden sm:block">Ordenar por:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Mais Populares" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Mais Populares</SelectItem>
                  <SelectItem value="newest">Novidades</SelectItem>
                  <SelectItem value="price-asc">Menor Preço</SelectItem>
                  <SelectItem value="price-desc">Maior Preço</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">Nenhum produto encontrado</p>
              <Button
                variant="outline"
                className="border-[#6A1B9A] text-[#6A1B9A]"
                onClick={clearFilters}
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

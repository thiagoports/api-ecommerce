'use client';
import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, ChevronDown } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { products, categories } from "../data/mockData";
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

interface FilterContentProps {
  selectedCategories: string[];
  toggleCategory: (slug: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  clearFilters: () => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  clearFilters,
}) => (
  <div className="space-y-6">
    {/* Categories */}
    <div>
      <h3 className="text-lg text-gray-900 mb-4">Categorias</h3>
      <div className="space-y-3">
        {categories.map((category) => (
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
        ))}
      </div>
    </div>

    {/* Price Range */}
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

    {/* Clear Filters */}
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

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFilter ? [categoryFilter] : []
  );
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("popular");
  const [isLoading, setIsLoading] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "popular":
      default:
        filtered.sort(
          (a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)
        );
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategories, priceRange, sortBy]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-gray-900 mb-2">
          {searchQuery
            ? `Resultados para "${searchQuery}"`
            : "Todos os Produtos"}
        </h1>
        <p className="text-gray-600">
          {filteredAndSortedProducts.length}{" "}
          {filteredAndSortedProducts.length === 1
            ? "produto encontrado"
            : "produtos encontrados"}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-[#6A1B9A]" />
              <h2 className="text-xl text-gray-900">Filtros</h2>
            </div>
            <FilterContent
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              clearFilters={clearFilters}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filter and Sort */}
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            {/* Mobile Filter Button */}
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
                    selectedCategories={selectedCategories}
                    toggleCategory={toggleCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    clearFilters={clearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden sm:block">
                Ordenar por:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
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

          {/* Products Grid */}
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
              <p className="text-xl text-gray-600 mb-4">
                Nenhum produto encontrado
              </p>
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

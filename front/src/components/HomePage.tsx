import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Truck, Shield, RefreshCw, CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { ProductCard } from "./ProductCard";
import { CategoryCard } from "./CategoryCard";
import { ImageWithFallback } from "../ImageWithFallback";

import { useCategories, useProducts } from "../hooks/useCatalog";
import type { Category as FECategory, Product as FEProduct } from "../types";
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

export const HomePage: React.FC = () => {
  const { data: apiCategories, isLoading: loadingCats } = useCategories();
  const { data: apiProducts, isLoading: loadingProds } = useProducts();

  const categories: FECategory[] = useMemo(() => {
    if (!apiCategories) return [];
    return apiCategories.map((c: any, idx) => ({
      id: Number(c.id ?? idx + 1),
      name: c.name,
      image:
        "https://images.unsplash.com/photo-1512446816042-444d641267ee?w=400",
      slug: slugify(c.name),
    }));
  }, [apiCategories]);

  const featuredProducts: FEProduct[] = useMemo(() => {
    if (!apiProducts) return [];
    return (apiProducts as ApiProduct[]).slice(0, 6).map(mapApiProductToFE);
  }, [apiProducts]);

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-[#FFFFFF] to-[#F1F1F1] text-[#6A1B9A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                Bem-vindo(a)!
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-[#6A1B9A]">
                Os melhores produtos com os melhores preços. Compre agora e
                aproveite nossas ofertas exclusivas!
              </p>
              <Link to="/produtos">
                <Button
                  size="lg"
                  className="bg-[#6A1B9A] text-[#FFFFFF] hover:bg-gray-100 text-lg px-8 py-6 rounded-xl"
                >
                  Ver Produtos
                </Button>
              </Link>
            </div>
            <div className="hidden md:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800"
                alt="Shopping"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Categorias
          </h2>
        </div>

        {loadingCats ? (
          <div className="text-center text-gray-600">Carregando categorias…</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
              Produtos em Destaque
            </h2>
          </div>

          {loadingProds ? (
            <div className="text-center text-gray-600">Carregando produtos…</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/produtos">
              <Button
                variant="outline"
                size="lg"
                className="border-[#6A1B9A] text-[#6A1B9A] hover:bg-[#E0BFEF] px-8"
              >
                Ver Todos os Produtos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-[#E0BFEF]/20 rounded-xl">
            <div className="w-16 h-16 bg-[#6A1B9A] rounded-full flex items-center justify-center mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Frete Rápido</h3>
            <p className="text-gray-600">Entrega expressa para todo o Brasil</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-[#E0BFEF]/20 rounded-xl">
            <div className="w-16 h-16 bg-[#6A1B9A] rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Compra Segura</h3>
            <p className="text-gray-600">Pagamento 100% seguro e protegido</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-[#E0BFEF]/20 rounded-xl">
            <div className="w-16 h-16 bg-[#6A1B9A] rounded-full flex items-center justify-center mb-4">
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Troca Fácil</h3>
            <p className="text-gray-600">30 dias para trocar ou devolver</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-[#E0BFEF]/20 rounded-xl">
            <div className="w-16 h-16 bg-[#6A1B9A] rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Parcelamento</h3>
            <p className="text-gray-600">Até 12x sem juros no cartão</p>
          </div>
        </div>
      </section>
    </div>
  );
};

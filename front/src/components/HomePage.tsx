import React from "react";
import { Link } from "react-router-dom";
import { Truck, Shield, RefreshCw, CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { ProductCard } from "./ProductCard";
import { CategoryCard } from "./CategoryCard";
import { products, categories } from "../data/mockData";
import { ImageWithFallback } from "../ImageWithFallback";

export const HomePage: React.FC = () => {
  const featuredProducts = products
    .filter((p) => p.isBestSeller || p.isNew)
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Categorias
          </h2>
          <p className="text-lg text-gray-600">
            Explore nossa seleção de produtos por categoria
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-lg text-gray-600">
              Os produtos mais vendidos e novidades da semana
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

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

      {/* Value Propositions */}
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

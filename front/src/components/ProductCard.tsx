import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "../types/index";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success("Produto adicionado ao carrinho!", {
      duration: 2000,
    });
  };

  return (
    <Link
      to={`/produto/${product.id}`}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isNew && (
          <Badge className="absolute top-3 left-3 bg-[#6A1B9A] text-white">
            Novo
          </Badge>
        )}
        {product.isBestSeller && (
          <Badge className="absolute top-3 right-3 bg-green-600 text-white">
            Mais Vendido
          </Badge>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-gray-900 mb-2 line-clamp-2 group-hover:text-[#6A1B9A] transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl text-[#6A1B9A]">
              R$ {product.price.toFixed(2)}
            </p>
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-[#6A1B9A] hover:bg-[#7D22B2] text-white rounded-lg"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

'use client';
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Plus, Minus, ShoppingCart, Heart, Share2, ChevronLeft } from 'lucide-react';
import { products } from '../data/mockData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl text-gray-900 mb-4">Produto não encontrado</h2>
        <Button onClick={() => navigate('/produtos')} className="bg-[#6A1B9A] hover:bg-[#7D22B2]">
          Ver Produtos
        </Button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${quantity === 1 ? 'item adicionado' : 'itens adicionados'} ao carrinho!`);
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-[#6A1B9A]">Início</Link>
        <span>/</span>
        <Link to="/produtos" className="hover:text-[#6A1B9A]">Produtos</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 -ml-4"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative group">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm bg-black/50 px-3 py-1 rounded">
                Clique para ampliar
              </span>
            </div>
            {product.isNew && (
              <Badge className="absolute top-4 left-4 bg-[#6A1B9A] text-white">
                Novo
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                Mais Vendido
              </Badge>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-[#6A1B9A] ring-2 ring-[#6A1B9A]/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews.length} avaliações)
              </span>
            </div>

            <p className="text-4xl text-[#6A1B9A] mb-6">
              R$ {product.price.toFixed(2)}
            </p>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Quantidade:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 border-x border-gray-300 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-[#6A1B9A] hover:bg-[#7D22B2] text-white h-12 text-lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
              <Button variant="outline" className="h-12 px-6 border-[#6A1B9A] text-[#6A1B9A] hover:bg-[#E0BFEF]">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="h-12 px-6 border-gray-300 hover:bg-gray-50">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-[#E0BFEF]/20 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Em estoque - pronta entrega</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Frete grátis para compras acima de R$ 200</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Até 12x sem juros no cartão</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="specs" className="mb-16">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="specs"
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#6A1B9A] rounded-none px-6 py-3"
          >
            Especificações Técnicas
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#6A1B9A] rounded-none px-6 py-3"
          >
            Avaliações ({product.reviews.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="specs" className="mt-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <span className="w-1/3 text-gray-600">{key}</span>
                  <span className="flex-1 text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          {product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map(review => (
                <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-gray-900 mb-1">{review.author}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-600">Ainda não há avaliações para este produto.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl md:text-3xl text-gray-900 mb-8">
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

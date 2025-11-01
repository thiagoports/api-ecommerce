'use client';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { toast } from 'sonner';

export const ShoppingCart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [cep, setCep] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  const calculateShipping = () => {
    if (cep.length === 8) {
      // Mock shipping calculation
      const cost = Math.random() * 30 + 10;
      setShippingCost(cost);
      toast.success('Frete calculado com sucesso!');
    } else {
      toast.error('Por favor, digite um CEP válido');
    }
  };

  const handleCheckout = () => {
    toast.success('Redirecionando para o pagamento...');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
            Seu carrinho está vazio
          </h2>
          <p className="text-gray-600 mb-8">
            Adicione produtos ao seu carrinho para continuar comprando
          </p>
          <Link to="/produtos">
            <Button className="bg-[#6A1B9A] hover:bg-[#7D22B2] text-white">
              Ver Produtos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const total = subtotal + (shippingCost || 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl md:text-4xl text-gray-900 mb-8">
        Carrinho de Compras
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div
              key={item.product.id}
              className="bg-white rounded-xl border border-gray-200 p-4 md:p-6"
            >
              <div className="flex gap-4">
                <Link
                  to={`/produto/${item.product.id}`}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-100 shrink-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    to={`/produto/${item.product.id}`}
                    className="text-lg text-gray-900 hover:text-[#6A1B9A] mb-2 block"
                  >
                    {item.product.name}
                  </Link>

                  <p className="text-2xl text-[#6A1B9A] mb-4">
                    R$ {item.product.price.toFixed(2)}
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 min-w-[50px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => {
                        removeFromCart(item.product.id);
                        toast.success('Item removido do carrinho');
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Subtotal: <span className="text-gray-900">R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl text-gray-900 mb-6">
              Resumo do Pedido
            </h2>

            {/* Shipping Calculator */}
            <div className="mb-6">
              <label className="text-sm text-gray-700 mb-2 block">
                Calcular Frete
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  maxLength={8}
                  className="flex-1"
                />
                <Button
                  onClick={calculateShipping}
                  variant="outline"
                  className="border-[#6A1B9A] text-[#6A1B9A] hover:bg-[#E0BFEF]"
                >
                  OK
                </Button>
              </div>
              {shippingCost !== null && (
                <p className="text-sm text-green-600 mt-2">
                  Frete: R$ {shippingCost.toFixed(2)}
                </p>
              )}
            </div>

            <Separator className="my-6" />

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              {shippingCost !== null && (
                <div className="flex justify-between text-gray-700">
                  <span>Frete</span>
                  <span>R$ {shippingCost.toFixed(2)}</span>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-gray-900">Total</span>
              <span className="text-2xl text-[#6A1B9A]">
                R$ {total.toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              className="w-full bg-[#6A1B9A] hover:bg-[#7D22B2] text-white h-12 text-lg"
            >
              Continuar para Pagamento
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            {/* Additional Info */}
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Pagamento 100% seguro
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Parcelamento em até 12x
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Frete grátis acima de R$ 200
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

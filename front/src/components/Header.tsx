"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Header: React.FC = () => {
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?search=${searchQuery}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#6A1B9A] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="https://res.cloudinary.com/dqkpkmicx/image/upload/v1762015890/Group_fkek73.png"
              alt="Ternurinhas Shop"
              className="h-10 mb-0 brightness-0 invert"
            />
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-2xl mx-8"
          >
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 rounded-lg bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white focus:text-gray-900 focus:border-white focus:ring-white"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/carrinho"
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#6A1B9A] text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-white">Olá, {user.username}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="border-[#6A1B9A] text-[#6A1B9A] hover:text-[#6A1B9A]"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  size="sm"
                  className="bg-white text-[#6A1B9A] hover:bg-white hover:text-[#6A1B9A]"
                >
                  <User className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-lg text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/20 bg-[#6A1B9A]">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            <Link
              to="/carrinho"
              className="flex items-center justify-between p-3 hover:bg-white/10 rounded-lg text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Carrinho
              </span>
              {cartCount > 0 && (
                <span className="bg-white text-[#6A1B9A] text-xs px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <div className="p-3 bg-white/10 rounded-lg">
                  <p className="text-sm text-white/80">Logado como</p>
                  <p className="text-white">{user.username}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-[#6A1B9A]"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sair
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-white text-[#6A1B9A] hover:bg-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  Entrar / Cadastrar
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

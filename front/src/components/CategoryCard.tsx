import React from 'react';
import { Link } from 'react-router-dom';
import { type Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/produtos?categoria=${category.slug}`}
      className="group relative overflow-hidden rounded-xl aspect-square"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
        <h3 className="text-white text-xl group-hover:text-[#E0BFEF] transition-colors">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

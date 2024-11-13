import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductCard({
  name,
  price,
  image,
  description,
}: ProductProps) {
  const phoneNumber = '573115557460'; // Reemplaza con tu número de WhatsApp
  const message = encodeURIComponent(
    `Hola! Me interesa el producto: ${name} por $${price}`
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="h-64 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-emerald-600">${price}</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <MessageSquare size={20} />
            <span>Consultar</span>
          </a>
        </div>
      </div>
    </div>
  );
}

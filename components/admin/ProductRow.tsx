'use client';

import { useState, useTransition } from 'react';
import { updateProductPrice, toggleProductAvailability } from '@/lib/actions/products';

interface Product {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  updatedAt: Date;
}

export function ProductRow({ product }: { product: Product }) {
  const [price, setPrice] = useState(String(product.price));
  const [available, setAvailable] = useState(product.isAvailable);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handlePriceSave = () => {
    const parsed = parseFloat(price);
    if (isNaN(parsed) || parsed < 0) return;
    startTransition(async () => {
      await updateProductPrice(product.id, parsed);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    });
  };

  const handleToggle = () => {
    const next = !available;
    setAvailable(next);
    startTransition(async () => {
      await toggleProductAvailability(product.id, next);
    });
  };

  return (
    <tr
      style={{
        borderBottom: '1px solid #E8DCC8',
        opacity: isPending ? 0.6 : 1,
        transition: 'opacity 0.2s',
      }}
    >
      {/* Name */}
      <td className="py-4 pr-6" style={{ color: '#241D19', fontWeight: 500 }}>
        {product.name}
      </td>

      {/* Price */}
      <td className="py-4 pr-6">
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: '#524F45' }}>EGP</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handlePriceSave()}
            className="w-24 px-2 py-1 rounded text-sm border text-right"
            style={{
              borderColor: '#CDBE8B',
              backgroundColor: '#FDF2CC',
              color: '#241D19',
              outline: 'none',
            }}
          />
          <button
            onClick={handlePriceSave}
            disabled={isPending}
            className="text-xs px-2.5 py-1 rounded transition-colors"
            style={{
              backgroundColor: saved ? '#6B4C3B' : '#C66C3C',
              color: '#FDF2CC',
            }}
          >
            {saved ? 'Saved ✓' : 'Save'}
          </button>
        </div>
      </td>

      {/* Availability toggle */}
      <td className="py-4 pr-6">
        <button
          onClick={handleToggle}
          disabled={isPending}
          role="switch"
          aria-checked={available}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C66C3C]"
          style={{ backgroundColor: available ? '#C66C3C' : '#CDBE8B' }}
        >
          <span
            className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
            style={{ transform: available ? 'translateX(24px)' : 'translateX(4px)' }}
          />
        </button>
        <span className="ml-2 text-xs" style={{ color: available ? '#6B4C3B' : '#9a8a7a' }}>
          {available ? 'Available' : 'Hidden'}
        </span>
      </td>

      {/* Last updated */}
      <td className="py-4 text-xs" style={{ color: '#9a8a7a' }}>
        {new Date(product.updatedAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </td>
    </tr>
  );
}

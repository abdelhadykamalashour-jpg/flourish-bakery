'use client';

import { useState, useTransition } from 'react';
import { updateOrderStatus } from '@/lib/actions/products';

const STATUS_OPTIONS = ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending:   { bg: '#FDF2CC', text: '#C66C3C' },
  confirmed: { bg: '#E8F5E9', text: '#2E7D32' },
  preparing: { bg: '#E3F2FD', text: '#1565C0' },
  delivered: { bg: '#F3E5F5', text: '#6A1B9A' },
  cancelled: { bg: '#FDECEA', text: '#B71C1C' },
};

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: string }) {
  const [current, setCurrent] = useState(status);
  const [isPending, startTransition] = useTransition();
  const colors = STATUS_COLORS[current] ?? STATUS_COLORS.pending;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    setCurrent(next);
    startTransition(async () => {
      await updateOrderStatus(orderId, next);
    });
  };

  return (
    <select
      value={current}
      onChange={handleChange}
      disabled={isPending}
      className="text-xs font-medium px-2 py-1 rounded-full border-0 capitalize cursor-pointer"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        outline: 'none',
        opacity: isPending ? 0.6 : 1,
      }}
    >
      {STATUS_OPTIONS.map(s => (
        <option key={s} value={s} style={{ backgroundColor: '#fff', color: '#241D19' }}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
}

import { prisma } from '@/lib/prisma';
import { OrderStatusSelect } from '@/components/admin/OrderStatusSelect';

export const dynamic = 'force-dynamic';

function formatItems(items: unknown): string {
  if (!Array.isArray(items)) return '—';
  return items
    .map((i: { name: string; quantity: number }) => `${i.quantity}× ${i.name}`)
    .join(', ');
}

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });

  const total = orders.reduce((sum, o) => sum + o.total, 0);
  const pending = orders.filter(o => o.status === 'pending').length;

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 700,
            color: '#241D19',
          }}
        >
          Order Management
        </h1>
        <p className="mt-1 text-sm" style={{ color: '#524F45' }}>
          Incoming orders — most recent first.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: orders.length },
          { label: 'Pending', value: pending },
          { label: 'Total Revenue', value: `EGP ${total.toFixed(0)}` },
        ].map(stat => (
          <div
            key={stat.label}
            className="rounded-xl px-5 py-4"
            style={{ backgroundColor: '#F0DFB1' }}
          >
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#6B4C3B' }}>
              {stat.label}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 24,
                fontWeight: 700,
                color: '#241D19',
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Orders table */}
      {orders.length === 0 ? (
        <div
          className="text-center py-20 rounded-2xl"
          style={{ backgroundColor: '#F0DFB1', color: '#524F45' }}
        >
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20 }}>
            No orders yet.
          </p>
          <p className="text-sm mt-2">Orders will appear here as customers check out.</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E8DCC8' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ backgroundColor: '#fff' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8F5F0', borderBottom: '1px solid #E8DCC8' }}>
                  {['Ref ID', 'Customer', 'Phone', 'Address', 'Items', 'Total', 'Status', 'Date'].map(h => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: '#6B4C3B' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr
                    key={order.id}
                    style={{ borderBottom: '1px solid #F0E8D8' }}
                    className="hover:bg-[#FDFAF5] transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: '#C66C3C' }}>
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-4 py-3 font-medium" style={{ color: '#241D19' }}>
                      {order.customerName}
                    </td>
                    <td className="px-4 py-3" style={{ color: '#524F45' }}>
                      {order.customerPhone}
                    </td>
                    <td
                      className="px-4 py-3 max-w-[180px] truncate"
                      style={{ color: '#524F45' }}
                      title={order.customerAddress}
                    >
                      {order.customerAddress}
                    </td>
                    <td
                      className="px-4 py-3 max-w-[200px] truncate"
                      style={{ color: '#524F45' }}
                      title={formatItems(order.items)}
                    >
                      {formatItems(order.items)}
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: '#241D19' }}>
                      EGP {order.total.toFixed(0)}
                    </td>
                    <td className="px-4 py-3">
                      <OrderStatusSelect orderId={order.id} status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: '#9a8a7a' }}>
                      {new Date(order.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}

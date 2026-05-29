import { prisma } from '@/lib/prisma';
import { ProductRow } from '@/components/admin/ProductRow';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { name: 'asc' } });

  const available = products.filter(p => p.isAvailable).length;

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
          Inventory &amp; Pricing
        </h1>
        <p className="mt-1 text-sm" style={{ color: '#524F45' }}>
          Adjust prices and toggle product availability. Changes reflect on the menu instantly.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm">
        {[
          { label: 'Total Products', value: products.length },
          { label: 'Available', value: available },
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

      {/* Products table */}
      {products.length === 0 ? (
        <div
          className="text-center py-20 rounded-2xl"
          style={{ backgroundColor: '#F0DFB1', color: '#524F45' }}
        >
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20 }}>
            No products found in the database.
          </p>
          <p className="text-sm mt-2">
            Run the seed script to populate products from your menu data.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E8DCC8' }}>
          <table className="w-full text-sm" style={{ backgroundColor: '#fff' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8F5F0', borderBottom: '1px solid #E8DCC8' }}>
                {['Product', 'Price (EGP)', 'Availability', 'Last Updated'].map(h => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#6B4C3B' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <ProductRow key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

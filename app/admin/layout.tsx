import { AdminNav } from '@/components/admin/AdminNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: '#FAF6F0',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AdminNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}

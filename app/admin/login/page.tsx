'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const router = useRouter();
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Invalid access key. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#FAF6F0' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        {/* Brand mark */}
        <div className="text-center mb-10">
          <p
            className="tracking-[0.25em] uppercase text-xs mb-3"
            style={{ color: '#C66C3C', fontFamily: 'var(--font-sans)' }}
          >
            Flourish Bakery
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 6vw, 36px)',
              fontWeight: 700,
              color: '#241D19',
              lineHeight: 1.2,
            }}
          >
            Admin Portal
          </h1>
          <p className="mt-2 text-sm" style={{ color: '#524F45' }}>
            Enter your access key to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="key"
              className="block text-sm font-medium mb-1.5"
              style={{ color: '#241D19' }}
            >
              Access Key
            </label>
            <input
              id="key"
              type="password"
              required
              autoComplete="current-password"
              value={key}
              onChange={e => setKey(e.target.value)}
              placeholder="••••••••••••"
              className="form-field w-full"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-center"
              style={{ color: '#C66C3C' }}
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
            style={{ opacity: loading ? 0.65 : 1 }}
          >
            <span className="btn-text-wrap">
              <span className="btn-text-default">{loading ? 'Verifying…' : 'Enter Dashboard'}</span>
              <span className="btn-text-hover">{loading ? 'Verifying…' : 'Enter Dashboard'}</span>
            </span>
            <span className="btn-circle">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </form>
      </motion.div>
    </div>
  );
}

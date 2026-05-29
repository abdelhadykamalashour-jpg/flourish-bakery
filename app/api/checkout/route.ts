import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface CheckoutBody {
  formData: {
    fullName: string;
    phone: string;
    address: string;
  };
  items: CartItem[];
  total: number;
}

export async function POST(req: NextRequest) {
  const body: CheckoutBody = await req.json();
  const { formData, items, total } = body;

  // ── 1. Persist order to database ─────────────────────────────────────────
  let orderId = 'N/A';
  try {
    const order = await prisma.order.create({
      data: {
        customerName: formData.fullName,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        items: items as unknown as Parameters<typeof prisma.order.create>[0]['data']['items'],
        total,
        status: 'pending',
      },
    });
    orderId = order.id.slice(0, 8).toUpperCase();
  } catch {
    // DB write failed — continue to notify anyway, log is best-effort
  }

  // ── 2. Build WhatsApp notification ───────────────────────────────────────
  const orderLines = items
    .map(item => `${item.quantity}x ${item.name} - ${(item.price * item.quantity).toFixed(0)} EGP`)
    .join('\n');

  const message =
    `🥐 New Order — Flourish Bakery\n` +
    `Order Ref: #${orderId}\n\n` +
    `Name: ${formData.fullName}\n` +
    `Phone: ${formData.phone}\n` +
    `Address: ${formData.address}\n\n` +
    `Order:\n` +
    `${orderLines}\n\n` +
    `Total: ${total.toFixed(0)} EGP`;

  const url =
    process.env.GREENAPI_URL +
    '/waInstance' +
    process.env.GREENAPI_ID_INSTANCE +
    '/sendMessage/' +
    process.env.GREENAPI_API_TOKEN;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chatId: process.env.ORDER_PHONE_NUMBER + '@c.us',
      message,
    }),
  });

  return NextResponse.json({ success: true });
}

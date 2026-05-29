'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateProductPrice(id: string, price: number) {
  await prisma.product.update({ where: { id }, data: { price } });
  revalidatePath('/');
  revalidatePath('/menu');
  revalidatePath('/admin/products');
}

export async function toggleProductAvailability(id: string, isAvailable: boolean) {
  await prisma.product.update({ where: { id }, data: { isAvailable } });
  revalidatePath('/');
  revalidatePath('/menu');
  revalidatePath('/admin/products');
}

export async function updateOrderStatus(id: string, status: string) {
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath('/admin');
}

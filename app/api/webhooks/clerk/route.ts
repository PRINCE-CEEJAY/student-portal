import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === 'user.created' || evt.type === 'user.updated') {
      const { id, email_addresses, first_name, last_name, image_url } =
        evt.data;

      await prisma.user.upsert({
        where: { clerkId: id },

        update: {
          email: email_addresses[0]?.email_address ?? '',
          firstName: first_name as string,
          lastName: last_name as string,
          imageUrl: image_url,
        },

        create: {
          clerkId: id,
          email: email_addresses[0]?.email_address ?? '',
          firstName: first_name as string,
          lastName: last_name as string,
          imageUrl: image_url,
        },
      });
    }

    if (evt.type === 'user.deleted') {
      await prisma.user
        .delete({
          where: { clerkId: evt.data.id },
        })
        .catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Webhook verification failed:', err);

    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }
}

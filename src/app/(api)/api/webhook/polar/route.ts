// src/app/api/webhook/polar/route.ts
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onSubscriptionActive: async (payload) => {
    /* Update the user subscription status to active */
    console.log(payload);
  },
  onSubscriptionRevoked: async (payload) => {
    /* Update the user subscription status to revoked */
    console.log(payload);
  },
});

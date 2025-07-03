import { subscriptionsService } from "@/entities/subscription/service";
import { stripe } from "@/shared/lib/stripe";
import Stripe from "stripe";

export async function POST(request: Request): Promise<Response> {
  let event: Stripe.Event | null = null;
  try {
    const sig = request.headers.get('stripe-signature');
    if (!sig) {
      throw new Error("Missing stripe signature")
    }
    event = stripe.webhooks.constructEvent(await request.text(), sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    })
  }
  console.log("EVENT", event.data.object)
  let intent = null;
  switch (event['type']) {
    case 'payment_intent.succeeded':
      intent = event.data.object;
      const subscriptionId = intent.metadata.subscriptionId
      const userId = intent.metadata.userId
      if (!subscriptionId || !userId) throw new Error("invalid metadata: " + intent.metadata)
      await subscriptionsService.upgradeSubscriptionConfirm(subscriptionId, userId)
      break;
    case 'payment_intent.payment_failed':
      intent = event.data.object;
      const message = intent.last_payment_error && intent.last_payment_error.message;
      console.log('Failed:', intent.id, message);
      break;
  }
  return new Response(null, { status: 200 })
}

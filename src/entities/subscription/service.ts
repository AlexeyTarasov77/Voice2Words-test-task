import { auth, clerkClient } from "@clerk/nextjs/server"
import { subscriptionsRepo } from "./repository"
import { stripe } from "@/shared/lib/stripe"
import { getSubscriptionName, SubscriptionLevelEntity } from "./domain"
import { notFound } from "next/navigation"

export const subscriptionsService = {
  listSubscriptions: async () => {
    return await subscriptionsRepo.listSubscriptions()
  },
  getCurrentSub: async () => {
    const { sessionClaims } = await auth()
    const subId = sessionClaims?.subscriptionId
    if (!subId) {
      return await subscriptionsRepo.getSubscription({ level: SubscriptionLevelEntity.FREE })
    }
    return await subscriptionsRepo.getSubscription({ id: subId })
  },
  upgradeSubscriptionInitPayment: async (subscriptionId: string, userId: string, origin: string) => {
    const subscription = await subscriptionsRepo.getSubscription({ id: subscriptionId })
    if (!subscription) return notFound()
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: process.env.NEXT_PUBLIC_APP_CURRENCY!,
            unit_amount_decimal: (subscription.price * 100).toFixed(2),
            product_data: {
              name: getSubscriptionName(subscription) + " subscription",
            }
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      payment_intent_data: { metadata: { subscriptionId, userId } },
    });
    return session.url!
  },
  upgradeSubscriptionConfirm: async (subscriptionId: string, userId: string) => {
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, { publicMetadata: { subscriptionId } })
  },
  getDefaultSubscription: async () => {
    return await subscriptionsRepo.getSubscription({ level: SubscriptionLevelEntity.FREE })
  }
}

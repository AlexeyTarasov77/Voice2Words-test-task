import { auth } from "@clerk/nextjs/server"
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
    if (!subId) throw new Error("user does not have subscription")
    return await subscriptionsRepo.getSubscription({ id: subId })
  },
  upgradeSubscription: async (subscriptionId: string, origin: string) => {
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
    });
    return session.url!
  },
  getDefaultSubscription: async () => {
    return await subscriptionsRepo.getSubscription({ level: SubscriptionLevelEntity.FREE })
  }
}

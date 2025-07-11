import { auth, clerkClient } from "@clerk/nextjs/server"
import { stripe } from "@/shared/lib/stripe"
import { subscriptionsRepo } from "./repository"
import { getSubscriptionName, SubscriptionEntity, SubscriptionLevelEntity } from "./domain"
import { notFound } from "next/navigation"

export const subscriptionsService = {
  listSubscriptions: async () => {
    return await subscriptionsRepo.listSubscriptions()
  },
  getCurrentSubscriptionLevel: async () => {
    const { sessionClaims } = await auth()
    if (!sessionClaims) return null
    return sessionClaims.subscriptionLevel || SubscriptionLevelEntity.FREE
  },
  getCurrentSub: async () => {
    const currentLevel = await subscriptionsService.getCurrentSubscriptionLevel()
    if (!currentLevel) throw new Error("Unauthenticated")
    const subscription = await subscriptionsRepo.getSubscription({ level: currentLevel })
    if (!subscription) throw new Error("Unable to find current or default subscription!")
    return subscription
  },
  upgradeSubscriptionInitPayment: async (level: SubscriptionLevelEntity, userId: string, origin: string) => {
    const subscription = await subscriptionsRepo.getSubscription({ level })
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
      payment_intent_data: { metadata: { level, userId } },
    });
    return session.url!
  },
  upgradeSubscriptionConfirm: async (subscriptionLevel: SubscriptionLevelEntity, userId: string) => {
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, { publicMetadata: { subscriptionLevel } })
  },
}

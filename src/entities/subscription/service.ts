import { auth } from "@clerk/nextjs/server"
import { subscriptionsRepo } from "./repository"
import { stripe } from "@/shared/lib/stripe"
import { SubscriptionEntity, SubscriptionLevelEntity } from "./domain"

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
  upgradeSubscription: async (subscription: SubscriptionEntity) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=true`,
    });
    console.log("STRIPE SESSION")
    return session.url!
  },
  getDefaultSubscription: async () => {
    return await subscriptionsRepo.getSubscription({ level: SubscriptionLevelEntity.FREE })
  }
}

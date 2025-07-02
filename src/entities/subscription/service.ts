import { auth } from "@clerk/nextjs/server"
import { subscriptionsRepo } from "./repository"

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
  upgradeSubscription: async (toSubId: string) => { },
  getDefaultSubscription: async () => {
    return await subscriptionsRepo.getSubscription({ price: 0 })
  }
}

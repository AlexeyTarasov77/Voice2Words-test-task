import { Prisma, Subscription } from "@/generated/prisma";
import { SubscriptionEntity } from "./domain";
import { prisma } from "@/shared/lib/db";


export const subscriptionsRepo = {
  listSubscriptions: async (where?: Prisma.SubscriptionWhereInput): Promise<SubscriptionEntity[]> => {
    return await prisma.subscription.findMany({ where })
  },
  getSubscription: async (where: Prisma.SubscriptionWhereInput): Promise<SubscriptionEntity | null> => {
    return await prisma.subscription.findFirst({ where })
  }
}

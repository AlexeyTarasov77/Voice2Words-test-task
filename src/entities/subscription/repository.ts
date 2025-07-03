import { Prisma, Subscription, SubscriptionLevel } from "@/generated/prisma";
import { SubscriptionEntity, SubscriptionLevelEntity } from "./domain";
import { prisma } from "@/shared/lib/db";


const mapToEntity = (dbRecord: Subscription): SubscriptionEntity => {
  return { ...dbRecord, level: SubscriptionLevelEntity[dbRecord.level] }
}

export const subscriptionsRepo = {
  listSubscriptions: async (where?: Prisma.SubscriptionWhereInput): Promise<SubscriptionEntity[]> => {
    const subscriptions = await prisma.subscription.findMany({ where })
    return subscriptions.map(mapToEntity)
  },
  getSubscription: async (where: Prisma.SubscriptionWhereInput & { level?: SubscriptionLevelEntity }): Promise<SubscriptionEntity | null> => {
    if (where.level !== undefined) {
      where.level = SubscriptionLevelEntity[where.level] as any
    }
    const subscription = await prisma.subscription.findFirst({ where })
    return subscription ? mapToEntity(subscription) : null
  }
}

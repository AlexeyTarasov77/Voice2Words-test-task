"use server"

import { SubscriptionLevelEntity } from "@/entities/subscription/domain"
import { subscriptionsService } from "@/entities/subscription/service"
import { auth } from "@clerk/nextjs/server"
import { headers } from 'next/headers'
import { redirect } from "next/navigation"

export const upgradeSubscriptionAction = async (level: SubscriptionLevelEntity) => {
  const { userId } = await auth.protect()
  const headersList = await headers()
  const origin = headersList.get('origin')
  if (!origin) throw new Error("Invalid request without origin header")
  const checkoutUrl = await subscriptionsService.upgradeSubscriptionInitPayment(level, userId, origin)
  return redirect(checkoutUrl)
}

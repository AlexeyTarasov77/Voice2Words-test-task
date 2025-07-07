import { SubscriptionCard } from "./subscription-card";
import { use } from "react";
import { subscriptionsService } from "@/entities/subscription/service";
import { auth } from "@clerk/nextjs/server";

export function SubscriptionsList() {
  const subscriptions = use(subscriptionsService.listSubscriptions())
  if (!subscriptions.length) throw new Error("subscriptions are not available now")
  const { isAuthenticated } = use(auth())
  let currentSubscription = null
  if (isAuthenticated) {
    currentSubscription = use(subscriptionsService.getCurrentSub())
  }
  return (
    <div className="grid grid-cols-2 gap-10">
      {subscriptions.map(sub => (
        <SubscriptionCard
          key={sub.level}
          subscription={sub}
          currentLevel={currentSubscription?.level}
        />
      ))}
    </div>
  )
}

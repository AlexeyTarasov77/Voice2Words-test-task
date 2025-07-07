import { SubscriptionCard } from "./subscription-card";
import { use } from "react";
import { subscriptionsService } from "@/entities/subscription/service";

export function SubscriptionsList() {
  const subscriptions = use(subscriptionsService.listSubscriptions())
  if (!subscriptions.length) throw new Error("subscriptions are not available now")
  const currentSubscriptionLevel = use(subscriptionsService.getCurrentSubscriptionLevel())
  return (
    <div className="grid grid-cols-2 gap-10">
      {subscriptions.map(sub => (
        <SubscriptionCard
          key={sub.level}
          subscription={sub}
          currentLevel={currentSubscriptionLevel}
        />
      ))}
    </div>
  )
}

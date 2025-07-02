import { SubscriptionCard } from "./subscription-card";
import { use } from "react";
import { subscriptionsService } from "@/entities/subscription/service";
import { notFound } from "next/navigation";

export function SubscriptionsList() {
  const subscriptions = use(subscriptionsService.listSubscriptions())
  if (!subscriptions.length) throw new Error("subscriptions are not available now")
  const currentSubscription = use(subscriptionsService.getCurrentSub())
  if (!currentSubscription) return notFound()
  const handleUpgrade = async (subId: string) => {

  }
  return (
    <div className="grid grid-cols-2 gap-10">
      {subscriptions.map(sub => (
        <SubscriptionCard
          key={sub.id}
          {...sub}
          isCurrent={sub.id == currentSubscription.id}
          onUpgrade={() => handleUpgrade(sub.id)}
        />
      ))}
    </div>
  )
}

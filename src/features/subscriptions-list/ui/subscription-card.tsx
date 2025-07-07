import { Button } from "@/shared/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { UpgradeBtn } from "./upgrade-btn";
import { getSubscriptionName, SubscriptionEntity, SubscriptionLevelEntity } from "@/entities/subscription/domain";



export function SubscriptionCard({ subscription, currentLevel }: { currentLevel?: SubscriptionLevelEntity, subscription: SubscriptionEntity }) {
  const renderFooterButton = () => {
    if (currentLevel == subscription.level) {
      return <Button disabled={true}>Current plan</Button>
    }
    if (subscription.level == SubscriptionLevelEntity.FREE) {
      return <Button disabled={true}>Default</Button>
    }
    if (!currentLevel || subscription.level > currentLevel) {
      return <UpgradeBtn subscriptionLevel={subscription.level} />
    }
    if (subscription.level < currentLevel) {
      return <Button disabled={true}>Downgrade</Button>
    }
  }
  return (
    <Card className="min-w-80 min-h-96">
      <CardHeader>
        <CardTitle>{getSubscriptionName(subscription)}</CardTitle>
        <CardTitle className="text-2xl font-bold">${subscription.price.toFixed(2)}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {subscription.features.map((feature, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Check className="size-4" />
            <p>{feature}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        {renderFooterButton()}
      </CardFooter>
    </Card>
  )
}

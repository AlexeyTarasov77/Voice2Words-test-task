import { Button } from "@/shared/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { capitalize } from "@/shared/utils/text";

export function SubscriptionCard({ features, isCurrent, price, name, onUpgrade }: { features: string[], isCurrent: boolean, price: number, name: string, onUpgrade: () => void }) {
  return (
    <Card className="min-w-80 min-h-96">
      <CardHeader>
        <CardTitle>{capitalize(name)}</CardTitle>
        <CardTitle className="text-2xl font-bold">${Math.round(price * 100) / 100}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {features.map(feature => (
          <div className="flex gap-2 items-center">
            <Check className="size-4" />
            <p>{feature}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button disabled={isCurrent} >{isCurrent ? "Current plan" : "Upgrade"}</Button>
      </CardFooter>
    </Card>
  )
}

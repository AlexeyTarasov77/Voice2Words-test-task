"use client"

import { Button } from "@/shared/ui/button"
import { startTransition, useActionState } from "react"
import { upgradeSubscriptionAction } from "../api/upgrade-subcription"
import { SubscriptionLevelEntity } from "@/entities/subscription/domain"

export function UpgradeBtn({ subscriptionLevel }: { subscriptionLevel: SubscriptionLevelEntity }) {
  const [_, dispatch, isPending] = useActionState(() => upgradeSubscriptionAction(subscriptionLevel), null)
  return <Button isLoading={isPending} onClick={() => startTransition(dispatch)}>Upgrade</Button>
}

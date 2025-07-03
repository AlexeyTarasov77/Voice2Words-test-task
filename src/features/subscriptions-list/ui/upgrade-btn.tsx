"use client"

import { Button } from "@/shared/ui/button"
import { startTransition, useActionState } from "react"
import { upgradeSubscriptionAction } from "../api/upgrade-subcription"

export function UpgradeBtn({ subscriptionId }: { subscriptionId: string }) {
  const [_, dispatch, isPending] = useActionState(() => upgradeSubscriptionAction(subscriptionId), {} as unknown)
  return <Button isLoading={isPending} onClick={() => startTransition(dispatch)}>Upgrade</Button>
}

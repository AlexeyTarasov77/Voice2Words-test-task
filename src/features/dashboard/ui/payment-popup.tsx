import { SubscriptionLevelEntity } from "@/entities/subscription/domain"
import { UpgradeBtn } from "@/features/subscriptions-list/ui/upgrade-btn"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { capitalize } from "@/shared/utils/text"
import { DialogProps } from "@radix-ui/react-dialog"
import { FC } from "react"

export function PaymentPopup({ nextLevel, ...dialogProps }: { nextLevel: SubscriptionLevelEntity } & React.ComponentProps<FC<DialogProps>>) {
  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscription's limit reached</DialogTitle>
          <DialogDescription>
            You've reached limit of transcriptions in your current subscription.
            Please upgrade to {capitalize(SubscriptionLevelEntity[nextLevel])} to continue further.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <UpgradeBtn subscriptionLevel={nextLevel} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

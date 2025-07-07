import { getSubscriptionName, SubscriptionLevelEntity } from "@/entities/subscription/domain"
import { UpgradeSubscriptionBtn } from "@/features/subscriptions-list"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { capitalize } from "@/shared/utils/text"

export function PaymentPopup({ open }: { open: boolean }) {
  const currentSub = subscriptionsService.getCurrentSub()
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscription's limit reached</DialogTitle>
          <DialogDescription>
            You've reached limit of transcriptions in your current {getSubscriptionName(currentSub)} subscription.
            Please upgrade to {capitalize(SubscriptionLevelEntity[currentSub.level + 1])} to continue further.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <UpgradeSubscriptionBtn subscriptionId={} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

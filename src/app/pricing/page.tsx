import { SubscriptionsList } from "@/features/subscriptions-list";

export default function PricingPage() {
  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col">
        <p className="text-3xl font-bold leading-tight mb-5 min-w-72">Choose the plan that's right for you</p>
        <SubscriptionsList />
      </div>
    </div>
  )
}

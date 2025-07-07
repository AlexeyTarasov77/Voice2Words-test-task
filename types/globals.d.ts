import { SubscriptionLevelEntity } from "@/entities/subscription/domain"

export { }

declare global {
  interface CustomJwtSessionClaims {
    subscriptionLevel: SubscriptionLevelEntity
  }
}

import { PublicUserData } from "@clerk/types";
import { SubscriptionEntity } from "../subscription/domain"

export type UserEntity = {
  subscription: SubscriptionEntity;
} & PublicUserData

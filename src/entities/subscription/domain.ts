import { capitalize } from "@/shared/utils/text";

export enum SubscriptionLevelEntity {
  FREE,
  PREMIUM
}

export type SubscriptionEntity = {
  level: SubscriptionLevelEntity;
  maxRecords: number;
  price: number;
  features: string[]
};

export const getSubscriptionName = (sub: SubscriptionEntity): string => {
  return capitalize(SubscriptionLevelEntity[sub.level])
}

export const checkCanCreateRecord = (sub: SubscriptionEntity, currRecordsCount: number): boolean => {
  return sub.maxRecords == -1 || currRecordsCount + 1 <= sub.maxRecords
}


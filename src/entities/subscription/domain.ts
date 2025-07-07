import { capitalize } from "@/shared/utils/text";

export enum SubscriptionLevelEntity {
  FREE = 1,
  PREMIUM
}

export type SubscriptionEntity = {
  level: SubscriptionLevelEntity;
  maxRecords: number;
  price: number;
  features: string[]
};

export const getNextLevel = (currLevel: SubscriptionLevelEntity): SubscriptionLevelEntity => SubscriptionLevelEntity[currLevel + 1] !== undefined ? currLevel + 1 : currLevel

export const getSubscriptionName = (sub: SubscriptionEntity): string => {
  return capitalize(SubscriptionLevelEntity[sub.level])
}

export const checkCanCreateRecord = (sub: SubscriptionEntity, currRecordsCount: number): boolean => {
  return sub.maxRecords == -1 || currRecordsCount + 1 <= sub.maxRecords
}


export enum SubscriptionLevelEntity {
  FREE,
  PREMIUM
}

export type SubscriptionEntity = {
  id: string;
  level: SubscriptionLevelEntity;
  maxRecords: number;
  price: number;
  features: string[]
};

export const checkCanCreateRecord = (sub: SubscriptionEntity, currRecordsCount: number): boolean => {
  return sub.maxRecords == -1 || currRecordsCount + 1 <= sub.maxRecords
}


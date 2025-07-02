export type SubscriptionEntity = {
  id: string;
  name: string;
  maxRecords: number;
  price: number;
  features: string[]
};

export const checkCanCreateRecord = (sub: SubscriptionEntity, currRecordsCount: number): boolean => {
  return sub.maxRecords == -1 || currRecordsCount + 1 <= sub.maxRecords
}


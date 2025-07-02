export type Subscription = {
  name: string;
  maxRecords: number;
  total: number;
};

export const FreeSubscription: Subscription = {
  name: "Free",
  maxRecords: 2,
  total: 0,
};

export const PaidSubscription: Subscription = {
  name: "Paid",
  maxRecords: -1,
  total: 19.99,
};

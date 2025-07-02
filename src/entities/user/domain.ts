import { PublicUserData } from "@clerk/types";
import { Subscription } from "../subscription/domain"

export type User = {
  subscription: Subscription;
} & PublicUserData

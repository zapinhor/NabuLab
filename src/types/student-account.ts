import type { StudentSubscription } from "@/lib/entitlements";

export interface StudentAccount {
  id: string;
  email: string;
  username: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  subscription: StudentSubscription | null;
}

import type { StudentSubscription } from "@/lib/entitlements";
import type { StudyFocus } from "@/lib/study-focus";

export interface StudentAccount {
  id: string;
  email: string;
  username: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  subscription: StudentSubscription | null;
  studyFocus: StudyFocus | null;
}

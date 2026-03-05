import { Timestamp } from "firebase/firestore";

/** Shape of a tutorial document as received from Firestore / Redux store */
export interface Tutorial {
  tutorial_id: string;
  title: string;
  summary?: string;
  created_by: string;
  owner?: string;
  createdAt?: Timestamp;
  tut_tags?: string[];
  featured_image?: string;
}

/** Slice of the Redux profile state used by the Card components */
export interface UserProfile {
  photoURL?: string;
  displayName?: string;
}

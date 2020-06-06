export interface Account {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  locale: string;
  previouslyReviewedVersion?: string;
}

export type Offering = 'S1' | 'S2' | 'S3';

export type UnitCode = string;

export interface IAssessment {
  name: string;
  weight: number;
}

export interface IReview {
  content: string;
  rating: number;
  author: string;
  dateCreated: number;
}

export interface IUnit {
  code: string;
  title: string;
  description: string;
  offerings: Offering[];
  scheduledActivities: string[];
  nonScheduledActivities: string[];
  assessments: IAssessment[];
  credits: number;
  department: string;
  faculty: string;
  group: string;
  level: string;
  prerequisites: UnitCode[];
  nccw: UnitCode[];
  outcomes: string[];
  rating: number;
  reviews: IReview[];
}

export interface IUser {
  username: string;
  dateCreated: Date;
  passwordHash: string;
}

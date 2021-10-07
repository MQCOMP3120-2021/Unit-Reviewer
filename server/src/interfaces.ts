export type UnitCode = string;

export interface IActivity {
  description: string;
  name: string;
  offerings: string[];
}

export interface IActivities {
  scheduled: IActivity[];
  nonScheduled: IActivity[];
}
export interface IAssessment {
  title: string;
  description: string;
  hurdle: boolean;
  type: string;
  weighting: number;
}

export interface IOffering {
  attendance: string;
  location: string;
  period: string;
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
  description?: string;
  offerings?: IOffering[];
  activities?: IActivities;
  assessments?: IAssessment[];
  credits?: number;
  department?: string;
  faculty?: string;
  group?: string;
  level?: string;
  prerequisites?: UnitCode[];
  nccw?: UnitCode[];
  outcomes?: string[];
  rating?: number;
  reviews?: IReview[];
}

export interface IUser {
  username: string;
  dateCreated: Date;
  passwordHash: string;
}

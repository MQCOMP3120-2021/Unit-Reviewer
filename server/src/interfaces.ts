export type Offering = 'S1' | 'S2' | 'S3';

export interface IReview {
  content: string;
  rating: number;
  author: string;
  dateCreated: Date;
}

export interface IUnit {
  code: string;
  name: string;
  description: string;
  offerings: Offering[];
  rating: number;
  reviews: IReview[];
}


export interface IUser {
  username: string;
  dateCreated: Date;
  passwordHash: string;
}

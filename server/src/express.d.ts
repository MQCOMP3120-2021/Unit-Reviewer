/* eslint-disable no-unused-vars */
declare namespace Express {
  // interface User {
  //   username: string;
  //   admin: boolean;
  // }
  export interface Request {
    user: {
      username: string;
      admin: boolean;
    }
  }
}

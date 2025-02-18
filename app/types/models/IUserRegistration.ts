// models/IUserRegistration.ts
export interface IUserRegistration {
    username: string;
    email?: string
    firstName?: string; // Optional field
    lastName: string;  // Optional field
    phone?: string;
  }
  
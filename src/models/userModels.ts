export interface User {
  email: string;
  username: string;
  currency: string;
  // salary: number;
  emailConfirmed: boolean;
  // savingInNumber: number;
  // savingPercentage: number;
  // bills: Bill[];
  // debts: Debt[];
  token: string;
}

export type AuthFormType = "login" | "register" | "forgotPass";

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  email: string;
  username: string;
  password: string;
  currency: string;
  link?: string;
  // salary: number;
  // savingInNumber: number;
  // savingPercentage: number;
}

export interface Currency {
  code: string;
  countryName: string;
}

export type EditProfile = {
  email: string;
  username: string;
  currency: string;
  link?: string;
}

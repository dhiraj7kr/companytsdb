// src/types/Employee.ts
export interface Employee {
  id?: number; // Optional because a new employee won't have an ID yet
  firstName: string;
  lastName: string;
  email: string;
  salary: number;
}
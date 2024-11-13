import { employees } from './data.js';

export const resolvers = {
  Query: {
    employees: () => employees,
  },
};

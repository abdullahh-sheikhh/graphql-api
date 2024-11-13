export const typeDefs = `#graphql
  type Employee {
    ID: String,
    name: String,
    age: String,
    department: String,
    position: String,
    attendance: String,
  },
  type Query {
    employees: [Employee]
  }
`;

export const typeDefs = `#graphql
  type Employee {
    ID: Int,
    name: String,
    age: Int,
    department: String,
    position: String,
    attendance: String,
  },

  type Query {
    employees(
      name: String,
      department: String,
      position: String,
      age: Int,
      limit: Int,
      offset: Int,
      sortBy: String,
      sortOrder: String
    ): [Employee],
    employee(ID: Int!): [Employee],
  }
    
  type Mutation {
    addEmployee(
    name: String!,
    age: Int!,
    department: String,
    position: String,
    attendance: String
  ): Employee,

  updateEmployee(
    ID: Int!,
    name: String,
    age: Int,
    department: String,
    position: String,
    attendance: String
  ): Employee
}
`;

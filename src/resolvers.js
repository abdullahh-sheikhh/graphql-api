import { employees } from './data.js';
import { getRole } from './utils/authMiddleware.js';

export const resolvers = {
  Query: {
    employees: (
      _,
      {
        name,
        department,
        position,
        age,
        limit = 10,
        offset = 0,
        sortBy = 'name',
        sortOrder = 'asc',
      },
      req
    ) => {
      let filteredEmployees = employees;

      getRole('admin')(req);

      if (name) {
        filteredEmployees = filteredEmployees.filter((employee) =>
          employee.name.toLowerCase().includes(name.toLowerCase())
        );
      }

      if (department) {
        filteredEmployees = filteredEmployees.filter((employee) =>
          employee.department.toLowerCase().includes(department.toLowerCase())
        );
      }

      if (position) {
        filteredEmployees = filteredEmployees.filter((employee) =>
          employee.position.toLowerCase().includes(position.toLowerCase())
        );
      }

      if (age) {
        filteredEmployees = filteredEmployees.filter(
          (employee) => employee.age === age
        );
      }
      filteredEmployees = filteredEmployees.sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortBy === 'age') {
          return sortOrder === 'asc' ? a.age - b.age : b.age - a.age;
        }
        return 0;
      });

      return filteredEmployees.slice(offset, offset + limit);
    },

    employee: (_, { ID }, req) => {
      getRole('employee')(req);
      return employees.find((employee) => employee.ID === ID);
    },
  },

  Mutation: {
    addEmployee: (_, { name, age, department, position, attendance }, req) => {
      getRole('admin')(req);
      const newID = (employees.length + 1).toString(); // Simple ID generation
      const newEmployee = {
        ID: newID,
        name,
        age,
        department,
        position,
        attendance,
      };
      employees.push(newEmployee);
      return newEmployee;
    },

    updateEmployee: (
      _,
      { ID, name, age, department, position, attendance },
      req
    ) => {
      getRole('admin')(req);
      const employee = employees.find((emp) => emp.ID === ID);
      if (!employee) {
        throw new Error(`Employee with ID ${ID} not found.`);
      }

      // Update employee fields
      if (name !== undefined) employee.name = name;
      if (age !== undefined) employee.age = age;
      if (department !== undefined) employee.department = department;
      if (position !== undefined) employee.position = position;
      if (attendance !== undefined) employee.attendance = attendance;

      return employee;
    },
  },
};

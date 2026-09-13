import {
  ALUMNI_CONTACTS_DEPARTMENT_FILTER_OPTION,
  type AlumniContactsDepartmentFilterOption,
} from '../config';

const departmentsInOrder = Object.keys(
  ALUMNI_CONTACTS_DEPARTMENT_FILTER_OPTION,
) as AlumniContactsDepartmentFilterOption[];

export const normalizeAlumniContactsDepartments = (
  departments: AlumniContactsDepartmentFilterOption[],
) => {
  const selectedDepartments = new Set(departments);

  return departmentsInOrder.filter((department) =>
    selectedDepartments.has(department),
  );
};

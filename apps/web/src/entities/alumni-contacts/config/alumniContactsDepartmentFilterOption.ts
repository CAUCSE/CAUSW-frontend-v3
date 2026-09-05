import {
  ACCOUNT_DEPARTMENT_LABEL,
  type AccountDepartment,
} from '@/entities/user';

export type AlumniContactsDepartmentFilterOption = AccountDepartment;

export const ALUMNI_CONTACTS_DEPARTMENT_FILTER_OPTION = Object.fromEntries(
  Object.entries(ACCOUNT_DEPARTMENT_LABEL).map(([value, label]) => {
    const department = value as AlumniContactsDepartmentFilterOption;
    return [department, { label, value: department }];
  }),
) as Record<
  AlumniContactsDepartmentFilterOption,
  { label: string; value: AlumniContactsDepartmentFilterOption }
>;

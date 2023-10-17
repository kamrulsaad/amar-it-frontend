import FormSelectField, { SelectOptions } from "./FormSelectField";
import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";

type ACDepartmentFieldProps = {
  name: string;
  label: string;
};

const ACDepartmentField = ({ name, label }: ACDepartmentFieldProps) => {
  const { data } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });

  const academicDepartments = data?.academicDepartments;
  const acDepartmentOption = academicDepartments?.map((department) => ({
    label: department.title,
    value: department.id,
  }));

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acDepartmentOption as SelectOptions[]}
      size="large"
    />
  );
};

export default ACDepartmentField;

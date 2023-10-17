"use-client";

import { Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

export type SelectOptions = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  label: string;
  defaultValue?: SelectOptions;
  placeholder?: string;
};

const FormSelectField = ({
  name,
  size,
  value,
  label,
  options,
  defaultValue,
  placeholder,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            style={{ width: "100%" }}
            onChange={onChange}
            size={size}
            options={options}
            value={value}
            loading={!options}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        )}
      />
    </>
  );
};

export default FormSelectField;

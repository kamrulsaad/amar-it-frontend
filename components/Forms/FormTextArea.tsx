import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
  rows?: number;
  value?: string | string[] | undefined;
  placeholder?: string;
  label: string;
  required?: boolean;
};

const FormTextArea = ({
  name,
  label,
  rows,
  value,
  placeholder,
  required,
}: TextAreaProps) => {
  const { control } = useFormContext();

  return (
    <div>
      {required ? (
        <span
          style={{
            color: 'red',
          }}
        >
          *
        </span>
      ) : null}
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input.TextArea
            rows={rows}
            placeholder={placeholder}
            {...field}
            defaultValue={value}
          />
        )}
      />
    </div>
  )
};

export default FormTextArea;

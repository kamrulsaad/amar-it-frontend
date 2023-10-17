import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

type FormYearPickerProps = {
  name: string;
  label?: string;
  picker: "year" | "time";
};

const FormYearPicker = ({ name, label, picker }: FormYearPickerProps) => {
  const { control } = useFormContext();

  return (
    <div>
      {label ? label : null}
      <br />
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            style={{ width: "100%" }}
            defaultValue={field.value}
            value={field.value ? dayjs().year(field.value) : null}
            picker={picker}
            size="large"
            onChange={(_, dateString) => field.onChange(dateString)}
          />
        )}
      />
    </div>
  );
};

export default FormYearPicker;

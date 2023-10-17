import { DatePicker, DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

type UMDatePickerProps = {
  name: string;
  value?: Dayjs;
  label?: string;
  onChange?: (valone: Dayjs | null, valTwo: string) => void;
  size?: "large" | "small";
};

const FormDatePicker = ({
  name,
  label,
  value,
  onChange,
  size,
}: UMDatePickerProps) => {
  const { control, setValue } = useFormContext();

  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange ? onChange(date, dateString) : null;
    setValue(name, dateString);
  };

  return (
    <div>
      {label ? label : null}
      <br />
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            defaultValue={dayjs(field.value) || ""}
            size={size}
            style={{ width: "100%" }}
            onChange={handleOnChange}
          />
        )}
      />
    </div>
  );
};

export default FormDatePicker;

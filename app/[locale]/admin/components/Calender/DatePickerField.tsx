import React from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import type { Value } from "react-multi-date-picker";
interface DatePickerFieldProps {
  value: Value;
  onChange: (value: Value) => void;
  error: string | undefined;
  touched: boolean | undefined;
  mutable?: boolean;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  value,
  onChange,
  error,
  touched,
  mutable,
}) => {
  const MS_IN_MINUTE = 1000 * 60;
  const minDate = new Date(new Date().getTime() - 5 * MS_IN_MINUTE);

  return (
    <div>
      <DatePicker
        value={value}
        onChange={onChange}
        placeholder="MM/DD/YYYY-HH:mm"
        format="MM/DD/YYYY HH:mm:ss"
        minDate={minDate}
        multiple={mutable ?? false}
        plugins={[<TimePicker position="bottom" />, <DatePanel markFocused />]}
      />
      {error && touched && <span className="text-danger-color">{error}</span>}
    </div>
  );
};

export default DatePickerField;

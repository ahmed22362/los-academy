"use client";

import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import type { Value } from "react-multi-date-picker";

export default function Test() {
  const [values, setValues] = useState<Value>(null);
  return (
    <>
      <DatePicker
        value={values}
        onChange={setValues}
        format="MM/DD/YYYY HH:mm:ss"
        multiple
        plugins={[<TimePicker position="bottom" />, <DatePanel markFocused />]}
      />
    </>
  );
}

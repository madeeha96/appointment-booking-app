import "react-datepicker/dist/react-datepicker.css";
import React, { FunctionComponent, ReactElement } from "react";
import RDatePicker, { registerLocale } from "react-datepicker";
import { de } from "date-fns/locale";

interface IDatePickerProps {
  /** The date to display. */
  date?: Date;
  /** The minimum date value that is considered valid. */
  minDate?: Date;
  /** The maximum date value that is considered valid. */
  maxDate?: Date;
  /** The callback to call when the date changes. */
  onChange: (date: Date) => void;
  /** The label to display. */
  label?: string;
  /** The placeholder for the date picker. */
  placeholder?: string;
}

registerLocale("de", de);

/**
 * Basic date picker.
 *
 * @param {IDatePickerProps} props The component properties.
 * @returns {ReactElement} The date picker component.
 */
const DatePicker: FunctionComponent<IDatePickerProps> = (
  props
): ReactElement => {
  return (
    <div className="form-control w-full max-w-full">
      <h3 className="font-semibold py-3">Pick a date</h3>
      {props.label && props.label !== "" && <p>{props.label}</p>}
      <RDatePicker
        selected={props.date}
        onChange={(newValue: Date | null) => {
          if (newValue) {
            props.onChange(newValue);
          }
        }}
        locale={"de"}
        minDate={props.minDate}
        maxDate={props.maxDate}
        dateFormat={"dd.MM.yyyy"}
        placeholderText={props.placeholder}
        showPopperArrow={false}
        className={"w-full p-3 border border-gray-300 rounded-md"}
      />
    </div>
  );
};

export default DatePicker;

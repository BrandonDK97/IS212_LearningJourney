import React, { useContext } from "react";
import { SelectedContext } from "../components/RolePlannerContext"
const CheckBox = React.forwardRef(
  (
    {
      id,
      className = `text-black-4`,
      labelText,
      onChange,
      onClick,
      hideLabel,
      invalid,
      invalidText,
      value,
      name,
      checked,
      option,
      title = "",
      disabled,
      hidden,
      type,
      ...other
    },
    ref
  ) => {
    const { selected, setSelected } = useContext(SelectedContext)
    const labelClasses = [
      "text-base",
      "text-black-7",
      "leading-6",
      "cursor-pointer",
      "w-full",
      "text-start",
      "grid grid-rows-2"
    ];

    if (hideLabel) {
      labelClasses.push("hidden");
    }
    const errorId = id + "-error-msg";

    const error = invalid ? (
      <div
        className={` text-sm leading-normal mt-2 text-red-dark font-normal `}
        id={errorId}
      >
        {invalidText}
      </div>
    ) : null;

    const inputClasses = [
      "form-checkbox",
      "h-4",
      "w-4",
      "bg-green-100",
      "cursor-pointer",
      "border-0",
      "mr-3",
    ];


    if (error) {
      inputClasses.push("bg-error-light", "border-1", "border-error");
    } else {
      inputClasses.push("transition", "duration-150", "ease-in-out");
    }

    const label = labelText ? (
      <label htmlFor={id} className={labelClasses.join(" ")}>
        {labelText}
        <span className='text-xs text-gray-600'>{type}</span>
      </label>
    ) : null;
    const handleOnchange = (e) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={hidden == true ? "hidden" : "flex hover:bg-gray-200 rounded-md w-full"}>
        <div className="flex items-center m-2 w-full">
          <input
            type="checkbox"
            className={inputClasses.join(" ")}
            onChange={handleOnchange}
            value={value}
            checked={true ? selected.includes(value) : false}
            id={id}
            disabled={disabled}
          />
       {label}
        </div>
      </div>

    );
  }
);

CheckBox.defaultProps = {
  onChange: () => { },
  onClick: () => { },
  invalid: false,
  value: "",
  checked: false
};

export default CheckBox;
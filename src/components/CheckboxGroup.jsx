import React, { useState, useCallback, useContext } from "react";
import CheckBox from "./Checkbox";
import { SelectedContext } from "./RolePlannerContext";

const CheckBoxGroup = React.forwardRef(
  (
    {
      options,
      id,
      name,
      onChange,
      onClick,
      errorText,
      checked,
      // remove,
      handleRemove,
      disabled
    },
    ref
  ) => {
    const error = errorText ? (
      <p className="mt-2 text-sm text-red-600">{errorText}</p>
    ) : null;
    //Mimicing the force update in the fucntional component
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const {selected, setSelected} = useContext(SelectedContext)
    const handleOnchange = (val, checked) => {
      if (onChange) {
        if (checked) {
          let index = selected.indexOf(val);
          if (index === -1) {
            selected.push(val);
          }
        } else {
          let index = selected.indexOf(val);
          if (index !== -1) {
            selected.splice(index, 1);
          }
        }
        onChange([...selected]);
        
      }
      console.log(selected)

      // force update in functional component
      forceUpdate();
    };
    return (
      <div className="flex flex-col m-3">
        <div className="flex flex-col">
          {options.map((option, index) => {
            return (
              <div className="flex items-center justify-between" key={index}>
                <CheckBox
                  hidden = {options.hidden}
                  type = {options.type}
                  disabled = {disabled}
                  id={option.label}
                  labelText={option.label}
                  value={option.value}
                  name={option.value}
                  onChange={(e) => {
                    handleOnchange(option.value, e.target.checked);
                  }}
                  checked={
                    checked ? checked : selected.includes(option.value)
                  }
                  {...option}
                />
                {/* {remove && (
                  <div
                    className="flex h-6 w-6 pt-2 items-center justify-between cursor-pointer"
                    onClick={() => handleRemove(option.value)}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                )} */}
              </div>
              
            );
          })}
        </div>
        {error}
      </div>
    );
  }
);

CheckBoxGroup.defaultProps = {
  indeterminate: false,
  onChange: () => {},
  errorText: "",
  onClick: () => {},
  selectedValues: [],
  options: [],
  // remove: false,
  handleRemove: () => {}
};
export default CheckBoxGroup;

//SET OF OPTIONS ARE PASSED
//SET OF SELECTED OPTIONS ARE PASSED=
//WHENEVER CHANGED GIVE THE USER SELECTED ONES

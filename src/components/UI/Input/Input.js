import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  const inputtClass = [classes.InputElement];
  let inputElement = "";
  let validationError = null;
  if (props.inValid && props.shouldValidate && props.istouched) {
    inputtClass.push(classes.Invalid);
    validationError = (
      <p className={classes.ValidationError}>
        Please enter a valid {props.valueType}!
      </p>
    );
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputtClass.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textArea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          className={inputtClass.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputtClass.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputtClass.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};
export default input;

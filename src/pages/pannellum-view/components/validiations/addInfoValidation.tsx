import { useEffect, useState } from "react";

const PostContactForm = async (
  values: any,
  successCallback: any,
  errorCallback: any
) => {
  // do stuff
  // if successful
  if (true) successCallback();
  else errorCallback();
};

const initialFormValues = {
  title: "",
  type: "",
  sname: "",
  formSubmitted: false,
  success: false,
};

export const useFormControls = (props) => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);

  useEffect(() => {
    setValues(initialFormValues);
    setErrors({});
  }, [props.open]);

  useEffect(() => {
    if (props.isInfo === true) {
      setValues((s) => ({ ...s, sname: " " }));
    } else {
      setValues((s) => ({ ...s, sname: "" }));
    }
  }, [props.isScene, props.isInfo]);

  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors };

    if ("title" in fieldValues)
      temp.title = fieldValues.title ? "" : "This field is required.";

    if ("type" in fieldValues)
      temp.type = fieldValues.type ? "" : "This field is required.";

    if ("sname" in fieldValues)
      temp.sname = fieldValues.sname ? "" : "This field is required.";

    setErrors({
      ...temp,
    });
  };

  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const handleSuccess = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: true,
    });
  };

  const handleError = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: false,
    });
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.title &&
      fieldValues.type &&
      fieldValues.sname &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const isValid =
      Object.values(errors).every((x) => x === "") && formIsValid();
    if (isValid) {
      await PostContactForm(values, handleSuccess, handleError);
    }
  };

  return {
    values,
    errors,
    handleInputValue,
    handleFormSubmit,
    formIsValid,
  };
};

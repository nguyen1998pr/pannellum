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
  sceneName: "",
  hotSpotName: "",
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
    setErrors((s) => ({ ...s, hotSpotName: "" }));
  }, [props.sceneID]);

  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors };

    if ("sceneName" in fieldValues)
      temp.sceneName = fieldValues.sceneName ? "" : "This field is required.";

    if ("hotSpotName" in fieldValues)
      temp.hotSpotName = fieldValues.hotSpotName
        ? ""
        : "This field is required.";

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
      fieldValues.sceneName &&
      fieldValues.hotSpotName &&
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

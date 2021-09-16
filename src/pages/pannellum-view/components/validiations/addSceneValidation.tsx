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
  sceneID: "",
  imageSource: "",
  sceneName: "",
  author: "",
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

  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors };

    if ("sceneID" in fieldValues)
      temp.sceneID = fieldValues.sceneID ? "" : "This field is required.";

    if ("imageSource" in fieldValues)
      temp.imageSource = fieldValues.imageSource
        ? ""
        : "This field is required.";

    if ("sceneName" in fieldValues)
      temp.sceneName = fieldValues.sceneName ? "" : "This field is required.";

    if ("author" in fieldValues)
      temp.author = fieldValues.author ? "" : "This field is required.";

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
      fieldValues.sceneID &&
      fieldValues.sceneName &&
      fieldValues.imageSource &&
      fieldValues.author &&
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
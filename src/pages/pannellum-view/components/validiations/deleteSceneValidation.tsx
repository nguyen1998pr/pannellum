import { useEffect, useState } from "react";
import { getCurrentScene } from "../../libs/react-pannellum/dist";

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
  formSubmitted: false,
  success: false,
};

export const useFormControls = (props) => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);
  const currentScene: string = getCurrentScene()?.toString();

  useEffect(() => {
    setValues(initialFormValues);
    setErrors({});
  }, [props.open]);

  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors };

    if ("sceneName" in fieldValues) {
      temp.sceneName = fieldValues.sceneName ? "" : "This field is required.";
      if (fieldValues.sceneName) {
        temp.sceneName =
          fieldValues.sceneName.toString() !== currentScene
            ? ""
            : "Can not delete this scene";
      }
    }

    setErrors({
      ...temp,
    });
  };

  const handleInputValue = (e: any) => {
    console.log(e.target);
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
      fieldValues.sceneName && Object.values(errors).every((x) => x === "");

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

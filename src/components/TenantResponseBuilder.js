//@flow

import React, { useState } from "react";
import { useFormState } from "informed";

import { sendFixedResponse } from "../helpers/sendFixedResponse";

const TenantResponseBuilder = ({
  hideModal,
  property,
  request
}: {
  hideModal: any,
  property: any,
  request: any
}) => {
  const [succes, setSuccess] = useState(false);
  const formState = useFormState();

  const { submits, errors, values } = formState;

  if (submits === 1 && !errors.length && !succes) {
    console.log("SUBMITTING", formState);
    sendFixedResponse(values, property, request).then(data => {
      if (data.error) {
        console.error("There was an error", data.error);
      }

      setSuccess(true);
    });
  }

  if (succes) {
    hideModal();
  }

  return null;
};

export default TenantResponseBuilder;

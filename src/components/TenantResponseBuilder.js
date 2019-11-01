//@flow

import React, { useState } from "react";
import { useFormState } from "informed";

const TenantResponseBuilder = ({
  hideModal,
  property,
  notification
}: {
  hideModal: any,
  property: any,
  notification: any
}) => {
  const [succes, setSuccess] = useState(false);
  const formState = useFormState();

  const { submits, errors, values } = formState;

  if (submits === 1 && !errors.length && !succes) {
    console.log("SUBMITTING", formState);
    // buildManagerResponse(values, property, notification).then(data => {
    //   if (data.error) {
    //     console.error("There was an error", data.error);
    //   }

    //   setSuccess(true);
    // });
  }

  if (succes) {
    hideModal();
  }

  return null;
};

export default TenantResponseBuilder;

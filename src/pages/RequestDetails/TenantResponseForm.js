import React, { useState } from "react";
import { Form, TextArea, useFormState, Select, Option } from "informed";

import { Button } from "../../components/Button";

import { sendFixedResponse } from "../../helpers/sendFixedResponse";
import { validate } from "../../helpers/validation";

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

const TenantResponseForm = ({ request, hideModal }) => {
  const isActionable = request.fields.status === "repair";

  return (
    <>
      <Form>
        {isActionable ? (
          <label>
            <TextArea
              //className={styles.Field}
              field="response"
              validate={validate}
            />
          </label>
        ) : null}
        <div>
          {isActionable ? <Button type="submit">Fixed</Button> : null}
          <Button onClick={hideModal}>Close</Button>
        </div>
        <TenantResponseBuilder
          hideModal={hideModal}
          property={request.fields.property}
          request={request}
        />
      </Form>
    </>
  );
};

export default TenantResponseForm;

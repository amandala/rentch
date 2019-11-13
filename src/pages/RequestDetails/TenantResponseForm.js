import React, { useState } from "react";
import { Form, TextArea, useFormState, Select, Option } from "informed";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Button } from "../../components/Button";

import { sendFixedResponse } from "../../helpers/sendFixedResponse";
import { validate } from "../../helpers/validation";

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
          <Button>
            <Link to="/">Close</Link>
          </Button>
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

const TenantResponseBuilder = ({
  hideModal,
  property,
  request
}: {
  hideModal: any,
  property: any,
  request: any
}) => {
  let history = useHistory();
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
    history.replace("/");
  }

  return null;
};

export default TenantResponseForm;

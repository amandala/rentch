import React, { useState } from "react";
import { Form, TextArea, useFormState, Select, Option } from "informed";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Button } from "../../components/Button";

import { sendTenantResponse } from "../../helpers/sendTenantResponse";
import { validate } from "../../helpers/validation";

const TenantResponseForm = ({ request, hideModal }) => {
  const [status, setStatus] = useState(undefined);
  const isActionable = request.fields.status === "repair";

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

    if (status) {
      sendTenantResponse(values, property, request, status).then(data => {
        if (data.error) {
          console.error("There was an error", data.error);
        } else {
          setSuccess(true);
        }
      });
    }

    if (succes) {
      history.replace("/");
    }

    return null;
  };

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
          {isActionable ? (
            <>
              <Button onClick={() => setStatus("fixed")}>Fixed</Button>
              <Button onClick={() => setStatus("followup")}>Not Fixed</Button>
            </>
          ) : null}
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

export default TenantResponseForm;

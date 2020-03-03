import React, { useState } from "react";
import { Form, TextArea, useFormState } from "informed";
import { useHistory } from "react-router-dom";

import { Button } from "../../../components/Button";

import { sendRequestUpdate } from "../../../helpers/sendRequestUpdate";
import { validate } from "../../../helpers/validation";

import styles from "./index.module.scss";

const TenantResponseForm = ({ request, hideModal }) => {
  const [status, setStatus] = useState(undefined);
  const [success, setSuccess] = useState(false);
  const isActionable = request.fields.status === "repair";
  let history = useHistory();

  const TenantResponseBuilder = ({
    hideModal,
    property,
    request
  }: {
    hideModal: any,
    property: any,
    request: any
  }) => {
    const formState = useFormState();

    const { values } = formState;

    if (status && !success) {
      const statusToSend = status;
      setStatus(undefined);
      sendRequestUpdate(
        values.response,
        property,
        request,
        statusToSend,
        property.fields.tenant[0],
        request.fields.repairOwner
      ).then(data => {
        if (data.error) {
          //TODO: return small error
          console.error(
            "There was an error sending the request update",
            data.error
          );
        } else {
          setSuccess(true);
        }
      });
    }

    return null;
  };

  if (success) {
    history.replace("/");
  }

  return (
    <>
      <Form>
        {isActionable ? (
          <label className={styles.Label}>
            <TextArea
              className={styles.Field}
              field="response"
              validate={validate}
              placeholder="Enter message here"
            />
          </label>
        ) : null}
        <div className={styles.Buttons}>
          {isActionable ? (
            <div className={styles.Actions}>
              <Button onClick={() => setStatus("fixed")}>Fixed</Button>
              <Button onClick={() => setStatus("followup")}>Not Fixed</Button>
            </div>
          ) : null}
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

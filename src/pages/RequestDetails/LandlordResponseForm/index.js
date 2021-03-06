import React, { useState } from "react";
import { Form, useFormState, Text, TextArea, useFormApi } from "informed";

import { useHistory } from "react-router-dom";

import { Button } from "../../../components/Button";

import { sendRequestUpdate } from "../../../helpers/sendRequestUpdate";
import { validate } from "../../../helpers/validation";

import styles from "./index.module.scss";

const SubmitButtons = () => {
  const formApi = useFormApi();
  return (
    <>
      <Button
        type="submit"
        value="owner-fix"
        onClick={() => formApi.setValue("repairOwner", "landlord")}
      >
        I'll fix it
      </Button>
      <Button
        type="submit"
        value="rentch-fix"
        onClick={() => formApi.setValue("repairOwner", "manager")}
      >
        Send Rentch
      </Button>
    </>
  );
};

const LandlordResponseForm = ({ request, hideModal }) => {
  const isActionable =
    request.fields.status === "new" || request.fields.status === "followup";
  return (
    <>
      <Form>
        {isActionable ? (
          <>
            <label className={styles.Label}>
              <Text className={styles.Hidden} field="repairOwner" />
              <TextArea
                className={styles.Field}
                field="response"
                validate={validate}
                placeholder="Enter a message here. It will appear in the request history and send an email notificaiton."
              />
            </label>
          </>
        ) : null}
        <div className={styles.Buttons}>
          {isActionable ? <SubmitButtons /> : null}
        </div>
        <LandlordResponseBuilder
          hideModal={hideModal}
          request={request}
          property={request.fields.property}
        />
      </Form>
    </>
  );
};

const LandlordResponseBuilder = ({ hideModal, property, request, router }) => {
  let history = useHistory();

  const [succes, setSuccess] = useState(false);
  const formState = useFormState();

  const { submits, errors, values } = formState;

  if (submits === 1 && !errors.length && !succes) {
    sendRequestUpdate(
      values.response,
      property,
      request,
      "repair",
      property.fields.landlord,
      values.repairOwner
    ).then(data => {
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

export default LandlordResponseForm;

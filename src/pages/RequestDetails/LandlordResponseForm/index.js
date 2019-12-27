import React, { useState } from "react";
import { Form, useFormState, Select, Option } from "informed";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Button } from "../../../components/Button";

import { sendRequestUpdate } from "../../../helpers/sendRequestUpdate";
import { validate } from "../../../helpers/validation";

import styles from "./index.module.scss";

const LandlordResponseForm = ({ request, hideModal }) => {
  const isActionable =
    request.fields.status === "new" || request.fields.status === "followup";
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
            <Button type="submit">Send repair notification</Button>
          ) : null}
        </div>
        <LandlordResponseForm
          hideModal={hideModal}
          request={request}
          property={request.fields.property}
        />
      </Form>
    </>
  );
};

const LandlordResponseForm = ({ hideModal, property, request, router }) => {
  let history = useHistory();

  const [succes, setSuccess] = useState(false);
  const formState = useFormState();

  const { submits, errors, values } = formState;

  if (submits === 1 && !errors.length && !succes) {
    sendRequestUpdate(values, property, request, "fixed", property.fields.landlord.sys.id).then(data => {
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

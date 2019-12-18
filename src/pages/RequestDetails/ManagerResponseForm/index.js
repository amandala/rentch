import React, { useState } from "react";
import { Form, TextArea, useFormState, Select, Option } from "informed";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Button } from "../../../components/Button";

import { buildManagerResponse } from "../../../helpers/sendManagerResponse";
import { validate } from "../../../helpers/validation";

import styles from "./index.module.scss";

const ManagerResponseForm = ({ request, hideModal }) => {
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
          <Button>
            <Link to="/">Go home</Link>
          </Button>
        </div>
        <ManagerResponseBuilder
          hideModal={hideModal}
          request={request}
          property={request.fields.property}
        />
      </Form>
    </>
  );
};

const ManagerResponseBuilder = ({ hideModal, property, request, router }) => {
  let history = useHistory();

  const [succes, setSuccess] = useState(false);
  const formState = useFormState();

  const { submits, errors, values } = formState;

  if (submits === 1 && !errors.length && !succes) {
    buildManagerResponse(values, property, request).then(data => {
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

export default ManagerResponseForm;

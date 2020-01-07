import React, { useState } from "react";
import { Form, useFormState, Select, Option } from "informed";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Button } from "../../../components/Button";

import { sendRequestUpdate } from "../../../helpers/sendRequestUpdate";
import { validate } from "../../../helpers/validation";

import styles from "./index.module.scss";

const ManagerResponseForm = ({ request, hideModal }) => {
  const isActionable =
    request.fields.status === "repair" || request.fields.status === "followup";
  return (
    <>
      <Form>
        <div className={styles.Buttons}>
          {isActionable ? <Button type="submit">Dismiss</Button> : null}
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
    sendRequestUpdate(
      values.response,
      property,
      request,
      "fixed",
      property.fields.manager,
      request.fields.repairOwner
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

export default ManagerResponseForm;

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, TextArea, useFormState, Select, Option } from "informed";

import { Button } from "../../components/Button";
import { useStateValue } from "../../StateProvider";
import { buildTenantRequest } from "../../helpers/sendTenantRequest";
import { validate } from "../../helpers/validation";

import styles from "./index.module.scss";

const Validation = field => {
  const formState = useFormState();
  const errors = formState.errors;

  return (
    <span>
      {formState.errors && formState.errors[field.field]
        ? formState.errors[field.field]
        : null}
    </span>
  );
};

const RequestBuilder = property => {
  const [succes, setSuccess] = useState(false);
  const formState = useFormState();

  const { submits, errors, values } = formState;

  if (submits === 1 && !errors.length && !succes) {
    buildTenantRequest(property.property, values).then(data => {
      if (data.error) {
        // error notification
        console.error("There was an error", data.error);
      }

      setSuccess(true);
      // success notification
      // redirect to home page
    });
  }

  if (succes) {
    return <Redirect to="/" />;
  }

  return null;
};

const TenantRequest = () => {
  const [{ userData, properties }] = useStateValue();

  if (!properties.length) {
    return <Redirect to="/" />;
  }

  return (
    <Form className={styles.Form}>
      <label className={styles.Label}>
        Request type
        <Select
          className={styles.Field}
          field="requestType"
          validate={validate}
        >
          <Option disabled value="">
            Select one
          </Option>
          <Option value="appliance">Appliance repair</Option>
          <Option value="heat">Heating issues</Option>
          <Option value="plumbing">Plumbing issues</Option>
          <Option value="lease">Lease negotiation</Option>
          <Option value="other">Other</Option>
        </Select>
        <Validation field="requestType" />
      </label>
      <label className={styles.Label}>
        Details
        <TextArea
          className={styles.Field}
          field="details"
          validate={validate}
        />
        <Validation field="details" />
      </label>
      <RequestBuilder property={properties[0]} />
      <Button type="submit">Send Rentch</Button>
    </Form>
  );
};

export default TenantRequest;

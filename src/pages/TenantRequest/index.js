import React from "react";
import { Redirect } from "react-router-dom";
import { Form, TextArea, useFormState, Select, Option } from "informed";

import { Button } from "../../components/Button";
import { useStateValue } from "../../StateProvider";
import { buildRequest } from "../../helpers/contentful";
import styles from "./index.module.scss";

import { createNotification } from "../../helpers/contentful";

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
  const formState = useFormState();

  const { submits, errors, values } = formState;

  if (submits > 0 && !errors.length) {
    buildRequest(property.property, values);
  }

  return null;
};

const TenantRequest = () => {
  const [{ userData, properties }] = useStateValue();

  if (!properties.length) {
    return <Redirect to="/" />;
  }

  const validate = value => {
    return !value || !value.length > 1 ? "This field is required" : undefined;
  };

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

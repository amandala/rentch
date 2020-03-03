import React, { useState } from "react";
import cx from "classnames";
import { Redirect } from "react-router-dom";
import { Form, TextArea, useFormState, Select, Option } from "informed";

import { Button } from "../../components/Button";
import { useStateValue } from "../../StateProvider";
import { buildTenantRequest } from "../../helpers/sendTenantRequest";
import getPrettyRequestType from "../../helpers/getPrettyRequestType";
import { validate } from "../../helpers/validation";
import Dropzone from "../../components/Dropzone";

import styles from "./index.module.scss";

const Validation = field => {
  const formState = useFormState();

  return (
    <span>
      {formState.errors && formState.errors[field.field]
        ? formState.errors[field.field]
        : null}
    </span>
  );
};

const RequestBuilder = property => {
  const [{ uploads }] = useStateValue();

  const [success, setSuccess] = useState(false);
  const formState = useFormState();

  const { submits, errors, values } = formState;

  if (submits === 1 && !errors.length && !success) {
    buildTenantRequest(property.property, values, uploads).then(data => {
      if (data.error) {
        //TODO: return small error
        console.error("There was an error", data.error);
      }

      setSuccess(true);
      //TODO: success notification
    });
  }

  if (success) {
    return <Redirect to="/" />;
  }

  return null;
};

const TenantRequest = () => {
  const [{ properties }] = useStateValue();

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
          <Option value="other">{getPrettyRequestType("other")}</Option>
          <Option value="appliance">{getPrettyRequestType("appliance")}</Option>
          <Option value="heat">{getPrettyRequestType("heat")}</Option>
          <Option value="plumbing">{getPrettyRequestType("plumbing")}</Option>
          <Option value="lease">{getPrettyRequestType("lease")}</Option>
        </Select>
        <Validation field="requestType" />
      </label>
      <label className={styles.Label}>
        Details
        <span className={styles.DetailsNote}>
          Please provide as much detail as possible. Include model and serial
          numbers for appliance and heating repair requests. If this is a lease
          negotiation request, provide requested renewal/termination terms.
        </span>
        <TextArea
          className={cx(styles.Field, styles.TextArea)}
          field="details"
          validate={validate}
          placeholder="Enter request details here"
        />
        <Validation field="details" />
      </label>
      <label className={styles.Label}>
        Photos
        <Dropzone />
      </label>
      <RequestBuilder property={properties[0]} />
      <Button type="submit">Send request</Button>
    </Form>
  );
};

export default TenantRequest;

import React from "react";
import { Form, TextArea, useFormState, Select, Option } from "informed";

import { Button } from "../Button";

const Validation = field => {
  const formState = useFormState();
  const errors = formState.errors;

  console.log(field);

  return (
    <span>
      {formState.errors && formState.errors[field.field]
        ? formState.errors[field.field]
        : null}
    </span>
  );
};

const TenantRequest = () => {
  const validate = value => {
    return !value || !value.length > 1 ? "This field is required" : undefined;
  };

  return (
    <Form>
      <label>
        Request type:
        <Select field="requestType" validate={validate}>
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
      <label>
        Details
        <TextArea field="details" validate={validate} />
        <Validation field="details" />
      </label>
      <Button type="Button">Send Rentch</Button>
    </Form>
  );
};

export default TenantRequest;

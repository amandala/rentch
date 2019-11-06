import React, { useState } from "react";
import { useModal } from "react-modal-hook";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import { Form, TextArea, useFormState, Select, Option } from "informed";

import { useStateValue } from "../../StateProvider";

import styles from "./index.module.scss";
import { buildManagerResponse } from "../../helpers/sendManagerResponse";
import { validate } from "../../helpers/validation";

import TenantResponseBuilder from "../TenantResponseBuilder";

import { getFormattedDate, getNotificationTitle, isTenant } from "./helpers";

const ManagerResponseBuilder = ({ hideModal, property, request }) => {
  const [succes, setSuccess] = useState(false);
  const formState = useFormState();

  console.log("in RESPONSE BUILDS", request);

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
    hideModal();
  }

  return null;
};

const Request = ({ request }) => {
  const [{ userData }] = useStateValue();

  const TenantResponseForm = () => {
    const [showForm, setShowForm] = useState(false);
    return (
      <>
        <Form>
          {showForm ? (
            <label>
              <TextArea
                className={styles.Field}
                field="response"
                validate={validate}
              />
            </label>
          ) : null}
          <DialogActions>
            <Button
              onClick={() => {
                setShowForm(false);
                console.log(
                  "send fixed response and archive request and responses"
                );
                hideModal();
              }}
            >
              Fixed
            </Button>
            <Button onClick={() => setShowForm(true)}>Not Fixed</Button>
            <Button onClick={hideModal}>Close</Button>
          </DialogActions>
        </Form>
      </>
    );
  };

  const ManagerResponseForm = () => {
    return (
      <>
        <Form>
          <label>
            <TextArea
              className={styles.Field}
              field="response"
              validate={validate}
            />
          </label>
          <DialogActions>
            <Button
              type="submit"
              onClick={() => {
                console.log(
                  "send fixed response and archive request and responses"
                );
                hideModal();
              }}
            >
              Send repair notification
            </Button>
            <Button onClick={hideModal}>Close</Button>
          </DialogActions>
          <ManagerResponseBuilder
            hideModal={hideModal}
            request={request}
            property={request.fields.property}
          />
        </Form>
      </>
    );
  };

  const renderResponseForm = () => {
    if (
      isTenant({
        userEmail: userData.email,
        tenant: request.fields.property.fields.tenant[0]
      })
    ) {
      return <TenantResponseForm />;
    } else return <ManagerResponseForm />;
  };

  const [showModal, hideModal] = useModal(({ in: open, onExited }) => (
    <Dialog fullScreen open={open} onExited={onExited}>
      {console.log(request)}
      {console.log(userData)}
      <DialogTitle>
        {getNotificationTitle({
          type: request.fields.type,
          status: request.fields.status,
          propertyName: request.fields.property.fields.name
        })}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {getFormattedDate({ date: request.fields.timestamp })}
        </DialogContentText>
        <DialogContentText>{request.fields.message} </DialogContentText>

        {renderResponseForm()}
      </DialogContent>
    </Dialog>
  ));

  return (
    <button
      onClick={showModal}
      className={styles.Wrapper}
      key={request.fields.date}
    >
      <span
        className={styles.Subject}
      >{`${request.fields.type} ${request.fields.property.fields.name}`}</span>
      <span className={styles.Date}>
        {getFormattedDate({ date: request.fields.timestamp })}
      </span>
    </button>
  );
};

export default Request;

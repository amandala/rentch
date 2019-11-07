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

import { getFormattedDate, isTenant } from "./helpers";

const ManagerResponseBuilder = ({ hideModal, property, request }) => {
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
    hideModal();
  }

  return null;
};

const TenantResponseForm = ({ request, hideModal }) => {
  const isActionable = request.fields.status === "repair";

  return (
    <>
      <Form>
        {isActionable ? (
          <label>
            <TextArea
              className={styles.Field}
              field="response"
              validate={validate}
            />
          </label>
        ) : null}
        <DialogActions>
          {isActionable ? <Button type="submit">Fixed</Button> : null}
          <Button onClick={hideModal}>Close</Button>
        </DialogActions>
        <TenantResponseBuilder
          hideModal={hideModal}
          property={request.fields.property}
          request={request}
        />
      </Form>
    </>
  );
};

const ManagerResponseForm = ({ request, hideModal }) => {
  const isActionable = request.fields.status === "new";
  return (
    <>
      <Form>
        {isActionable ? (
          <label>
            <TextArea
              className={styles.Field}
              field="response"
              validate={validate}
            />
          </label>
        ) : null}
        <DialogActions>
          {isActionable ? (
            <Button type="submit">Send repair notification</Button>
          ) : null}
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

const renderResponseForm = (request, hideModal, userEmail) => {
  if (
    isTenant({
      userEmail,
      tenant: request.fields.property.fields.tenant[0]
    })
  ) {
    return <TenantResponseForm request={request} hideModal={hideModal} />;
  } else return <ManagerResponseForm request={request} hideModal={hideModal} />;
};

const Request = ({ request }) => {
  const [{ userData }] = useStateValue();

  console.log(request);

  const [showModal, hideModal] = useModal(({ in: open, onExited }) => (
    <Dialog fullScreen open={open} onExited={onExited}>
      <DialogTitle>
        {`${request.fields.type} request at ${request.fields.property.fields.name}`}
        <DialogContentText>{request.fields.status}</DialogContentText>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {getFormattedDate({ date: request.fields.timestamp })}
        </DialogContentText>

        <DialogContentText>
          Request Details: {request.fields.message}
        </DialogContentText>
        {request.fields.notifications &&
          request.fields.notifications.length &&
          request.fields.notifications.map(notificaiton => {
            console.log(notificaiton);
            return (
              <div>
                <DialogContentText>
                  {getFormattedDate({ date: notificaiton.fields.timestamp })}
                </DialogContentText>
                <DialogContentText>
                  {notificaiton.fields.subject}
                </DialogContentText>
                <DialogContentText>
                  Repair details: {notificaiton.fields.message}
                </DialogContentText>
              </div>
            );
          })}
        {renderResponseForm(request, hideModal, userData.email)}
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

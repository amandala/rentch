import React, { useState } from "react";
import moment from "moment";
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

const RequestBuilder = ({ hideModal, property, notification }) => {
  const [succes, setSuccess] = useState(false);
  const formState = useFormState();

  const { submits, errors, values } = formState;

  if (submits === 1 && !errors.length && !succes) {
    buildManagerResponse(values, property, notification).then(data => {
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

const Notification = ({ notification }) => {
  const [{ userData }] = useStateValue();

  const date = Date.parse(notification.fields.date);
  const formattedDate = moment(date).format("ll");
  const formattedTime = moment(date).format("LT");
  const isCreator = notification.fields.creator.fields.email === userData.email;

  const validate = value => {
    return !value || !value.length > 1 ? "This field is required" : undefined;
  };

  const [showModal, hideModal] = useModal(({ in: open, onExited }) => (
    <Dialog fullScreen open={open} onExited={onExited}>
      <DialogTitle>{notification.fields.subject}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          On {formattedDate} @ {formattedTime}{" "}
          {notification.fields.creator.fields.name} wrote:{" "}
        </DialogContentText>
        <DialogContentText>{notification.fields.message} </DialogContentText>
        <Form>
          <label>
            <TextArea
              className={styles.Field}
              field="response"
              validate={validate}
            />
          </label>
          <RequestBuilder
            hideModal={hideModal}
            notification={notification}
            property={notification.fields.creator.fields.property[0]}
          />
          <DialogActions>
            <Button type="submit">Send</Button>
            <Button onClick={hideModal}>Close</Button>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  ));

  return (
    <button
      onClick={showModal}
      className={styles.Wrapper}
      key={notification.fields.date}
    >
      <span className={styles.Subject}>{notification.fields.subject}</span>
      <span className={styles.Date}>
        {formattedDate} @ {formattedTime}
      </span>
    </button>
  );
};

export default Notification;

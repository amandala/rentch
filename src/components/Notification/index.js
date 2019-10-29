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

const RequestBuilder = ({ hideModal }) => {
  const [succes, setSuccess] = useState(false);
  const formState = useFormState();

  const { submits, errors, values } = formState;

  if (submits === 1 && !errors.length && !succes) {
    console.log(values);

    hideModal();

    // buildRequest(property.property, values).then(data => {
    //   if (data.error) {
    //     // error notification
    //     console.error("There was an error", data.error);
    //   }

    //   setSuccess(true);
    //   // success notification
    //   // redirect to home page
    // });
  }

  // if (succes) {
  //   return <Redirect to="/" />;
  // }

  return null;
};

const Notification = ({ notification }) => {
  const [showModal, hideModal] = useModal(({ in: open, onExited }) => (
    <Dialog fullScreen open={open} onExited={onExited}>
      <DialogTitle>{notification.fields.subject}</DialogTitle>
      <DialogContent>
        <DialogContentText>{notification.fields.message}</DialogContentText>

        <Form>
          <label>
            <TextArea
              className={styles.Field}
              field="response"
              validate={validate}
            />
          </label>
        </Form>
        <DialogActions>
          <Button type="submit">Send</Button>
          <Button onClick={hideModal}>Close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  ));

  const [{ userData }] = useStateValue();

  const date = Date.parse(notification.fields.date);
  const formattedDate = moment(date).format("ll");
  const formattedTime = moment(date).format("LT");

  const isCreator = notification.fields.creator.fields.email === userData.email;

  const validate = value => {
    return !value || !value.length > 1 ? "This field is required" : undefined;
  };

  return (
    <button
      onClick={showModal}
      className={styles.Wrapper}
      key={notification.fields.date}
    >
      <span className={styles.Date}>
        {formattedDate} @ {formattedTime}
      </span>
      <span className={styles.Subject}>{notification.fields.subject}</span>
      <span>{`${isCreator ? "Outgoing " : "Incomming "}${
        notification.fields.type
      }`}</span>
      <RequestBuilder hideModal={hideModal} />
    </button>
  );
};

export default Notification;

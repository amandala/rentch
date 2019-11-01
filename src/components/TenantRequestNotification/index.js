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
import { validate } from "../../helpers/validation";

const ManagerResponseBuilder = ({ hideModal, property, notification }) => {
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

const TenantResponseBuilder = ({ hideModal, property, notification }) => {
  const [succes, setSuccess] = useState(false);
  const formState = useFormState();

  const { submits, errors, values } = formState;

  if (submits === 1 && !errors.length && !succes) {
    console.log("SUBMITTING", formState);
    // buildManagerResponse(values, property, notification).then(data => {
    //   if (data.error) {
    //     console.error("There was an error", data.error);
    //   }

    //   setSuccess(true);
    // });
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

  const ResponseModalContent = () => {
    return (
      <>
        <DialogTitle>{notification.fields.subject}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            On {formattedDate} @ {formattedTime}{" "}
            {notification.fields.creator.fields.name} wrote:{" "}
          </DialogContentText>
          <DialogContentText>{notification.fields.message} </DialogContentText>
          {/* <Form>
            <label>
              <TextArea
                className={styles.Field}
                field="response"
                validate={validate}
              />
            </label>
            <ManagerResponseBuilder
              hideModal={hideModal}
              notification={notification}
              property={notification.fields.creator.fields.property[0]}
            /> */}
          <DialogActions>
            <Button onClick={() => console.log("FIXED")}>Fixed</Button>
            <Button
              onClick={() => {
                console.log("notFIXED");
              }}
            >
              Not Fixed
            </Button>
            <Button onClick={hideModal}>Close</Button>
          </DialogActions>
          {/* </Form> */}
        </DialogContent>
      </>
    );
  };

  const RequestModalContent = () => {
    const isAcknowledged =
      notification.fields.hasOwnProperty("requestAcknowledged") &&
      notification.fields.requestAcknowledged === true;
    if (isAcknowledged) {
      return (
        <>
          <DialogTitle>{notification.fields.subject}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              On {formattedDate} @ {formattedTime}{" "}
              {notification.fields.creator.fields.name} wrote:{" "}
            </DialogContentText>
            <DialogContentText>
              {notification.fields.message}{" "}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={hideModal}>Close</Button>
          </DialogActions>
        </>
      );
    }

    return (
      <>
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
            <ManagerResponseBuilder
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
      </>
    );
  };

  const renderModalContent = () => {
    if (notification.fields.type.includes("request")) {
      return <RequestModalContent />;
    } else {
      return <ResponseModalContent />;
    }
  };

  const [showModal, hideModal] = useModal(({ in: open, onExited }) => (
    <Dialog fullScreen open={open} onExited={onExited}>
      {renderModalContent()}
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

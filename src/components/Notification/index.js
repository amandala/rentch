import React from "react";
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

import { useStateValue } from "../../StateProvider";

import styles from "./index.module.scss";

const Notification = ({ notification }) => {
  const [{ userData }] = useStateValue();

  const date = Date.parse(notification.fields.date);
  const formattedDate = moment(date).format("ll");
  const formattedTime = moment(date).format("LT");

  console.log(notification);

  const isCreator = notification.fields.creator.fields.email === userData.email;

  const [showModal, hideModal] = useModal(({ in: open, onExited }) => (
    <Dialog fullScreen open={open} onExited={onExited}>
      <DialogTitle>{notification.fields.subject}</DialogTitle>
      <DialogContent>
        <DialogContentText>{notification.fields.message}</DialogContentText>
        <DialogActions>
          <Button onClick={hideModal}>Close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  ));

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
    </button>
  );
};

export default Notification;

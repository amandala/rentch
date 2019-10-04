import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useStateValue } from "../../StateProvider";

import { Button } from "../../components/Button";
import Property from "./Property";
import { HeadingMedium, HeadingLarge } from "../../components/Heading";

import styles from "./index.module.scss";

const TenantHome = ({ property }) => {
  const [{ userData }, dispatch] = useStateValue();
  const [navigateToRequestForm, setNavigateToRequestForm] = React.useState();

  useEffect(() => {
    dispatch({
      type: "SET_PROPERTIES",
      data: [property]
    });
    dispatch({
      type: "SET_USER_ROLE",
      data: "tenant"
    });
  }, []);

  if (navigateToRequestForm) {
    return <Redirect to="/request" />;
  }

  // TODO: check for notifications first
  const allNotifications = property.fields.notifications || [];
  let filteredNotifications;

  if (allNotifications.length > 0) {
    filteredNotifications = allNotifications.filter(
      notification =>
        notification.fields &&
        notification.fields.creator.fields.email !== userData.email
    );
  }

  const renderNotifications = () => {
    return filteredNotifications.map(notification => {
      const { date, type, subject } = notification.fields;

      return (
        <div className={styles.Notification} key={date}>
          <span>{date}</span>
          <span>{type}</span>
          <span>{subject}</span>
        </div>
      );
    });
  };

  return (
    <div className={styles.Home}>
      <div className={styles.Greeting}>
        <HeadingLarge>Welcome, {userData.givenName}</HeadingLarge>
        <Button onClick={() => setNavigateToRequestForm(true)}>Get Help</Button>
      </div>
      {filteredNotifications && filteredNotifications.length > 0 ? (
        <div className={styles.Notifications}>
          <HeadingMedium>You have new notifications</HeadingMedium>
          {renderNotifications()}
        </div>
      ) : null}
      <div>
        <Property property={property} />
      </div>
    </div>
  );
};

export default TenantHome;

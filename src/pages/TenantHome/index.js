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

  console.log("PROPERTY>>", property);
  const allNotifications = property.fields.notifications || [];
  let filteredNotifications;

  console.log("Notifications", allNotifications);

  const renderNotifications = () => {
    return allNotifications.map(notification => {
      console.log(notification);

      if (!notification.fields) return;

      return (
        <div className={styles.Notification} key={notification.fields.date}>
          <span>{notification.fields.date}</span>
          <span>{notification.fields.type}</span>
          <span>{notification.fields.subject}</span>
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
      {allNotifications && allNotifications.length > 0 ? (
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

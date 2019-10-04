import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Query } from "react-contentful";

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

  const renderNotifications = () => {
    return (
      <Query
        contentType="notification"
        include={4}
        query={{
          "fields.propertyId": property.sys.id
        }}
      >
        {({ data, error, fetched, loading }) => {
          console.log("HERE");
          if (loading || !fetched) {
            return null;
          }

          if (error) {
            console.error(error);
            return null;
          }

          if (!data.items.length || !data.items[0]) {
            return <p>No notifications</p>;
          }

          console.log("Notificaitons data", data);

          const notifications = data.items;

          return (
            <div className={styles.Home}>
              {notifications.map(notification => {
                console.log(notification);

                if (!notification.fields) return;

                return (
                  <div
                    className={styles.Notification}
                    key={notification.fields.date}
                  >
                    <span>{notification.fields.date}</span>
                    <span>{notification.fields.type}</span>
                    <span>{notification.fields.subject}</span>
                  </div>
                );
              })}
            </div>
          );
        }}
      </Query>
    );
  };

  return (
    <div className={styles.Home}>
      <div className={styles.Greeting}>
        <HeadingLarge>Welcome, {userData.givenName}</HeadingLarge>
        <Button onClick={() => setNavigateToRequestForm(true)}>Get Help</Button>
      </div>
      <div className={styles.Notifications}>{renderNotifications()}</div>
      <div>
        <Property property={property} />
      </div>
    </div>
  );
};

export default TenantHome;

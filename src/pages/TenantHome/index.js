import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Query } from "react-contentful";

import { useStateValue } from "../../StateProvider";

import { Button } from "../../components/Button";
import Notification from "../../components/Notification";
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

          const notifications = data.items;

          const filteredNotifications = notifications.filter(notification => {
            const isCreator =
              notification.fields.creator.fields.email === userData.email;
            if (!isCreator) {
              return notification;
            }
          });

          return (
            <div className={styles.Home}>
              {filteredNotifications.map(notification => {
                return (
                  <Notification
                    key={notification.fields.date}
                    notification={{ ...Object.assign({}, notification) }}
                  />
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

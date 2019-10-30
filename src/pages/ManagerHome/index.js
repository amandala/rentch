import React from "react";
import { Redirect } from "react-router-dom";
import { Query } from "react-contentful";

import { useStateValue } from "../../StateProvider";

import { Button } from "../../components/Button";
import Notification from "../../components/Notification";
import Property from "./Property";
import { HeadingMedium, HeadingLarge } from "../../components/Heading";

import styles from "./index.module.scss";

const ManagerHome = ({ properties }) => {
  const [{ userData }, dispatch] = useStateValue();

  const renderNotifications = () => {
    const propertyIds = properties.map(property => property.sys.id);
    return (
      <Query
        contentType="notification"
        include={4}
        query={{
          "fields.propertyId": propertyIds
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

          return (
            <div className={styles.Home}>
              {notifications.map(notification => {
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
      </div>

      {renderNotifications(properties)}

      <div>
        {properties.map(property => (
          <Property property={property} />
        ))}
      </div>
    </div>
  );
};

export default ManagerHome;
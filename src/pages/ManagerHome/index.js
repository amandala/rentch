import React from "react";
import { Redirect } from "react-router-dom";
import { Query } from "react-contentful";

import { useStateValue } from "../../StateProvider";

import { Button } from "../../components/Button";
import Request from "../../components/Request";
import Property from "./Property";
import { HeadingMedium, HeadingLarge } from "../../components/Heading";

import styles from "./index.module.scss";

const ManagerHome = ({ properties }) => {
  const [{ userData }, dispatch] = useStateValue();

  const renderNotifications = () => {
    const propertyIds = properties.map(property => property.sys.id);
    return (
      <Query
        contentType="request"
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
            return <p>Awesome! No active requests at this time</p>;
          }

          const requests = data.items;

          const filteredRequests = requests.filter(notification => {
            if (!notification.fields.archived) {
              return notification;
            }
          });

          return (
            <div className={styles.Home}>
              {filteredRequests.map(request => {
                return (
                  <Request
                    key={request.sys.id}
                    request={{ ...Object.assign({}, request) }}
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
          <Property key={property.sys.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default ManagerHome;

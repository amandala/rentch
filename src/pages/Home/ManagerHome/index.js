import React from "react";
import { Redirect } from "react-router-dom";
import { Query, ContentfulClient, ContentfulProvider } from "react-contentful";

import { useStateValue } from "../../../StateProvider";

import { Button } from "../../../components/Button";
import RequestNotification from "../../../components/RequestNotification";
import Property from "../../../components/Property";
import { HeadingSmall, HeadingLarge, Text } from "../../../components/Heading";

import styles from "./index.module.scss";

const ManagerHome = ({ properties }) => {
  const contentfulClient = new ContentfulClient({
    accessToken: process.env.REACT_APP_CONTENT_DELIVERY_API,
    space: process.env.REACT_APP_CONTENTFUL_SPACE
  });
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
            return <Text>Awesome! No active requests at this time</Text>;
          }

          const requests = data.items;

          const openRequests = requests.filter(notification => {
            if (
              !notification.fields.archived &&
              notification.fields.status !== "fixed"
            ) {
              return notification;
            }
          });

          const closedRequests = requests.filter(notification => {
            if (
              !notification.fields.archived &&
              notification.fields.status === "fixed"
            ) {
              return notification;
            }
          });

          return (
            <div className={styles.Home}>
              <div className={styles.Notifications}>
                <HeadingSmall>Active Requests</HeadingSmall>
                {openRequests.map(request => {
                  return (
                    <RequestNotification
                      key={request.sys.id}
                      request={{ ...Object.assign({}, request) }}
                    />
                  );
                })}
              </div>
              {closedRequests.length
                ? <div className={styles.Notifications}>
                    <HeadingSmall>Closed Requests</HeadingSmall>
                    {closedRequests.map(request => {
                      return (
                        <RequestNotification
                          key={request.sys.id}
                          request={{ ...Object.assign({}, request) }}
                        />
                      );
                    })}
                  </div>
                : null}
            </div>
          );
        }}
      </Query>
    );
  };

  return (
    <div className={styles.Home}>
      <div className={styles.Greeting}>
        <HeadingLarge>
          Welcome, {userData.givenName}
        </HeadingLarge>
      </div>
      <div>
        {renderNotifications(properties)}
      </div>
    </div>
  );
};

export default ManagerHome;
import React from "react";

import { Query } from "react-contentful";
import { HeadingSmall, Text } from "../../../components/Heading";
import RequestNotification from "../../../components/RequestNotification";

import styles from "./index.module.scss";

const Notifications = ({ properties }) => {
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

        const requests = data.items
          .sort(
            (a, b) =>
              new Date(a.sys.updatedAt).getTime() -
              new Date(b.sys.updatedAt).getTime()
          )
          .reverse();

        const openRequests = requests.filter(
          notification =>
            !notification.fields.archived &&
            notification.fields.status !== "fixed"
        );

        const closedRequests = requests.filter(
          notification =>
            !notification.fields.archived &&
            notification.fields.status === "fixed"
        );

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
            <div className={styles.Notifications}>
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
          </div>
        );
      }}
    </Query>
  );
};

export default Notifications;

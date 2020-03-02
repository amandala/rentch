import React from "react";

import { Query } from "react-contentful";
import { Text, HeadingMedium } from "../Type";
import RequestNotification from "../RequestNotification";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./tabs.scss";

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

        const filtered = data.items.filter(notification =>
          propertyIds.includes(notification.fields.propertyId)
        );

        const requests = filtered
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
          <Tabs>
            <TabList>
              <Tab className={styles.Tab}>
                <HeadingMedium>Active</HeadingMedium>
              </Tab>
              <Tab className={styles.Tab}>
                <HeadingMedium>Closed</HeadingMedium>
              </Tab>
            </TabList>
            <TabPanel>
              <div className={styles.Notifications}>
                {openRequests.length > 0 ? (
                  openRequests.map(request => {
                    return (
                      <RequestNotification
                        key={request.sys.id}
                        request={{ ...Object.assign({}, request) }}
                      />
                    );
                  })
                ) : (
                  <Text>No active requests</Text>
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <div className={styles.Notifications}>
                {closedRequests.length > 0 ? (
                  closedRequests.map(request => {
                    return (
                      <RequestNotification
                        key={request.sys.id}
                        request={{ ...Object.assign({}, request) }}
                      />
                    );
                  })
                ) : (
                  <Text>No archived requests</Text>
                )}
              </div>
            </TabPanel>
          </Tabs>
        );
      }}
    </Query>
  );
};

export default Notifications;

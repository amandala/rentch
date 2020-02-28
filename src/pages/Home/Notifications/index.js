import React from "react";

import { Query } from "react-contentful";
import { Text } from "../../../components/Type";
import RequestNotification from "../../../components/RequestNotification";

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
          <div className={styles.Wrapper}>
            <Tabs>
              <TabList>
                <Tab className={styles.Tab}>Active</Tab>
                <Tab className={styles.Tab}>Closed</Tab>
              </TabList>
              <TabPanel>
                <div className={styles.Notifications}>
                  {openRequests.map(request => {
                    return (
                      <RequestNotification
                        key={request.sys.id}
                        request={{ ...Object.assign({}, request) }}
                      />
                    );
                  })}
                </div>
              </TabPanel>
              <TabPanel>
                <div className={styles.Notifications}>
                  {closedRequests.map(request => {
                    return (
                      <RequestNotification
                        key={request.sys.id}
                        request={{ ...Object.assign({}, request) }}
                      />
                    );
                  })}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        );
      }}
    </Query>
  );
};

export default Notifications;

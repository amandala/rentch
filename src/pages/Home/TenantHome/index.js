import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Query, ContentfulClient, ContentfulProvider } from "react-contentful";

import { useStateValue } from "../../../StateProvider";

import { ButtonLink } from "../../../components/Button";
import RequestNotification from "../../../components/RequestNotification";
import Property from "../../../components/Property";
import {
  HeadingMedium,
  HeadingLarge,
  Text,
  HeadingSmall
} from "../../../components/Heading";

import styles from "./index.module.scss";

const TenantHome = ({ property }) => {
  const [{ userData }, dispatch] = useStateValue();

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

  const renderNotifications = () => {
    const contentfulClient = new ContentfulClient({
      accessToken: process.env.REACT_APP_CONTENT_DELIVERY_API,
      space: process.env.REACT_APP_CONTENTFUL_SPACE
    });

    return (
      <ContentfulProvider client={contentfulClient}>
        <Query
          contentType="request"
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
              return <Text>Awesome! No active requests at this time</Text>;
            }

            const requests = data.items;

            const filteredRequests = requests.filter(notification => {
              if (
                !notification.fields.archived &&
                notification.fields.status !== "fixed"
              ) {
                return notification;
              }
            });

            return (
              <div className={styles.Home}>
                {filteredRequests.map(request => {
                  return (
                    <span key={request.sys.id}>
                      <RequestNotification
                        request={{ ...Object.assign({}, request) }}
                      />
                    </span>
                  );
                })}
              </div>
            );
          }}
        </Query>
      </ContentfulProvider>
    );
  };

  return (
    <div className={styles.Home}>
      <div className={styles.Greeting}>
        <HeadingLarge>Welcome, {userData.givenName}</HeadingLarge>
        <ButtonLink url="request">Get Help</ButtonLink>
      </div>
      <div className={styles.PropertyDetails}>
        <div>
          <HeadingSmall>Your Home</HeadingSmall>
          <div className={styles.Property}>
            <Property property={property} />
          </div>
        </div>
        <div className={styles.Notifications}>
          <HeadingSmall>Active Requests</HeadingSmall>
          {renderNotifications()}
        </div>
      </div>
    </div>
  );
};

export default TenantHome;

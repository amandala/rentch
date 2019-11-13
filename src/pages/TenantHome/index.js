import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Query, ContentfulClient, ContentfulProvider } from "react-contentful";
import { Link } from "react-router-dom";

import { useStateValue } from "../../StateProvider";

import { Button } from "../../components/Button";
import RequestNotification from "../../components/RequestNotification";
import Property from "./Property";
import { HeadingMedium, HeadingLarge } from "../../components/Heading";

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
              return <p>Awesome! No active requests at this time</p>;
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
                    <RequestNotification
                      key={request.fields.date}
                      request={{ ...Object.assign({}, request) }}
                    />
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
        <Button>
          <Link to="request">Get Help</Link>
        </Button>
      </div>
      <div className={styles.Notifications}>{renderNotifications()}</div>
      <div>
        <Property property={property} />
      </div>
    </div>
  );
};

export default TenantHome;

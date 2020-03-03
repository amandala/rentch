import React from "react";
import { Redirect } from "react-router-dom";
import { Query, ContentfulClient, ContentfulProvider } from "react-contentful";
import PropertyDetails from "../../components/PropertyDetails";
import Notifications from "../../components/Notifications";
import { useStateValue } from "../../StateProvider";
import ErrorScreen from "../../components/ErrorScreen";
import { Text } from "../../components/Type";

import styles from "./index.module.scss";

const SingleProperty = props => {
  const [{ userRole }] = useStateValue();

  if (!props.match.params.id) {
    return <Redirect to="/" />;
  }

  const contentfulClient = new ContentfulClient({
    accessToken: process.env.REACT_APP_CONTENT_DELIVERY_API,
    space: process.env.REACT_APP_CONTENTFUL_SPACE
  });

  return (
    <ContentfulProvider client={contentfulClient}>
      <Query
        contentType="property"
        include={4}
        query={{
          "sys.id": props.match.params.id
        }}
      >
        {({ data, error, fetched, loading }) => {
          if (loading || !fetched) {
            return null;
            //TODO: loading
          }

          if (error) {
            console.error(error);
            return (
              <ErrorScreen>
                <Text>
                  We're sorry! Something went wrong locating the details for
                  this property. Please refresh the page and try again.
                </Text>
              </ErrorScreen>
            );
          }

          if (!data.items.length || !data.items[0]) {
            return <p>No user data exists.</p>;
          }

          const property = data.items[0];

          return (
            <div className={styles.SingleProperty}>
              <div className={styles.Dashboard}>
                <div className={styles.Property}>
                  <PropertyDetails
                    showImage
                    userRole={userRole}
                    property={property}
                  />
                </div>
                <div className={styles.Notifications}>
                  <Notifications properties={[property]} />
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    </ContentfulProvider>
  );
};

export default SingleProperty;

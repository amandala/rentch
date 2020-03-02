import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { ContentfulClient, ContentfulProvider, Query } from "react-contentful";

import ErrorPage from "./ErrorPage";
import { Text, HeadingLarge } from "../../components/Type";
import PropertyLinkList from "../../components/PropertyLinkList";
import PropertyDetails from "../../components/PropertyDetails";
import Notifications from "../../components/Notifications";
import styles from "./index.module.scss";

const Home = () => {
  const contentfulClient = new ContentfulClient({
    accessToken: process.env.REACT_APP_CONTENT_DELIVERY_API,
    space: process.env.REACT_APP_CONTENTFUL_SPACE
  });

  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  return (
    <ContentfulProvider client={contentfulClient}>
      <Query
        contentType="user"
        include={4}
        query={{
          "fields.email": user.email
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
            return (
              <ErrorPage>
                <Text>
                  We're sorry! There's no account configured for {user.email}{" "}
                  yet.
                </Text>
              </ErrorPage>
            );
          }

          const properties = data.items[0].fields.property;
          const role = data.items[0].fields.role;

          return (
            <>
              {properties ? (
                <div className={styles.Home}>
                  <div className={styles.Greeting}>
                    <HeadingLarge>Welcome, {user.nickname}</HeadingLarge>
                  </div>
                  <div className={styles.Dashboard}>
                    {role === "tenant" ? (
                      <div className={styles.PropertyDetails}>
                        <PropertyDetails
                          showImage
                          userRole="tenant"
                          property={properties[0]}
                        />
                      </div>
                    ) : (
                      <div className={styles.PropertiesList}>
                        <PropertyLinkList properties={properties} />
                      </div>
                    )}
                    <div className={styles.Notifications}>
                      <Notifications properties={properties} />
                    </div>
                  </div>
                </div>
              ) : (
                <ErrorPage>
                  <Text>
                    We're sorry! There's no properties configured for your user
                    account yet.
                  </Text>
                </ErrorPage>
              )}
            </>
          );
        }}
      </Query>
    </ContentfulProvider>
  );
};

export default Home;

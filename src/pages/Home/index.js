import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { ContentfulClient, ContentfulProvider, Query } from "react-contentful";

import LandlordHome from "./LandlordHome";
import TenantHome from "./TenantHome";
import ManagerHome from "./ManagerHome";
import ErrorPage from "./ErrorPage";
import { Text } from "../../components/Type";
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

  const renderHomeView = (role, properties) => {
    if (role === "tenant") {
      return <TenantHome property={properties[0]} />;
    } else if (role === "manager") {
      return <ManagerHome properties={properties} />;
    } else {
      return <LandlordHome properties={properties} />;
    }
  };

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
            <div className={styles.Home}>
              {properties ? (
                renderHomeView(role, properties)
              ) : (
                <ErrorPage>
                  <Text>
                    We're sorry! There's no properties configured for your user
                    account yet.
                  </Text>
                </ErrorPage>
              )}
            </div>
          );
        }}
      </Query>
    </ContentfulProvider>
  );
};

export default Home;

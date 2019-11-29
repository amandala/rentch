import React from "react";
import { Redirect } from "react-router-dom";
import { ContentfulClient, ContentfulProvider, Query } from "react-contentful";

import { useStateValue } from "../../StateProvider";

import TenantHome from "../TenantHome";
import ManagerHome from "../ManagerHome";

import Property from "../../components/Property";

import styles from "./index.module.scss";

const Home = () => {
  const contentfulClient = new ContentfulClient({
    accessToken: process.env.REACT_APP_CONTENT_DELIVERY_API,
    space: process.env.REACT_APP_CONTENTFUL_SPACE
  });

  const [{ userData, loggedIn }, dispatch] = useStateValue();

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  const renderHomeView = (role, properties) => {
    if (role === "tenant") {
      return <TenantHome property={properties[0]} />;
    } else {
      return <ManagerHome properties={properties} />;
    }
  };

  return (
    <ContentfulProvider client={contentfulClient}>
      <Query
        contentType="user"
        include={4}
        query={{
          "fields.email": userData.email
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
            return <p>No user data exists.</p>;
          }

          const properties = data.items[0].fields.property;

          const role = data.items[0].fields.role;

          return (
            <div className={styles.Home}>
              <div className={styles.ContentWrapper}>
                {renderHomeView(role, properties)}
              </div>
            </div>
          );
        }}
      </Query>
    </ContentfulProvider>
  );
};

export default Home;

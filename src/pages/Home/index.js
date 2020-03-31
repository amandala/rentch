import React from "react";
import { useAuth0 } from "../../react-auth0-spa";

import { ContentfulClient, ContentfulProvider, Query } from "react-contentful";
import ErrorScreen from "../../components/ErrorScreen";
import Properties from "../Properties";
import { Text } from "../../components/Type";
import { Button } from "../../components/Button";
import PropertyDetails from "../../components/PropertyDetails";
import Notifications from "../../components/Notifications";
import styles from "./index.module.scss";

const renderHome = ({ properties, role, activePage }) => {
  console.log(activePage);
  if (properties && properties.length < 1) {
    return (
      <ErrorScreen>
        <Text>
          We're sorry! There's no properties configured for your user account
          yet.
        </Text>
      </ErrorScreen>
    );
  }
  if (role === "tenant") {
    return (
      <div className={styles.PropertyDetails}>
        <PropertyDetails showImage userRole="tenant" property={properties[0]} />
      </div>
    );
  } else {
    if (activePage === "properties") {
      return <Properties properties={properties} />;
    }
    if (activePage === "dashboard") {
      return (
        <div className={styles.Notifications}>
          <Notifications properties={properties} />
        </div>
      );
    }
  }
};

const Home = () => {
  const contentfulClient = new ContentfulClient({
    accessToken: process.env.REACT_APP_CONTENT_DELIVERY_API,
    space: process.env.REACT_APP_CONTENTFUL_SPACE
  });

  const [activePage, setActivePage] = React.useState("dashboard");

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
            //TODO: loading
            return null;
          }

          if (error) {
            console.error(error);

            return (
              <ErrorScreen>
                <Text>
                  We're sorry! Something went wrong locating the user account
                  for {user.email}. Please refresh the page and try again.
                </Text>
              </ErrorScreen>
            );
          }

          if (!data.items.length || !data.items[0]) {
            return (
              <ErrorScreen>
                <Text>
                  We're sorry! There's no account configured for {user.email}{" "}
                  yet.
                </Text>
              </ErrorScreen>
            );
          }

          const properties = data.items[0].fields.property;
          const role = data.items[0].fields.role;

          return (
            <>
              {role === "manager" ? (
                <div className={styles.Subnav}>
                  <div className={styles.SubnavContent}>
                    <Button
                      onClick={() => setActivePage("dashboard")}
                      className={styles.NavButton}
                    >
                      Dashboard
                    </Button>
                    <Button
                      onClick={() => setActivePage("properties")}
                      className={styles.NavButton}
                    >
                      Properties
                    </Button>
                    <Button
                      onClick={() => setActivePage("archive")}
                      className={styles.NavButton}
                    >
                      Archive
                    </Button>
                  </div>
                </div>
              ) : null}

              <div className={styles.Home}>
                {renderHome({ activePage, properties, role })}
              </div>
            </>
          );
        }}
      </Query>
    </ContentfulProvider>
  );
};

export default Home;

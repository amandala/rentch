import React from "react";
import { Redirect } from "react-router-dom";
import { ContentfulClient, ContentfulProvider, Query } from "react-contentful";

import { useStateValue } from "../StateProvider";

import Property from "../Property";

import "./index.css";

const contentfulClient = new ContentfulClient({
  accessToken: "3PcuT-6xkUk8xMdwkMi4mvSUoEO-ud0Iv6Se7XP9Klk",
  space: "wxi01ulkw63v"
});

const Home = () => {
  const [{ userData, loggedIn }, dispatch] = useStateValue();

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <ContentfulProvider client={contentfulClient}>
      <Query
        contentType="user"
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

          if (!data.items.length) {
            return <p>No user data exists.</p>;
          }

          const properties = data.items[0].fields.property;

          console.log(properties);

          return (
            <div className="Home">
              <h1>Welcome, {userData.givenName}</h1>
              {properties.map(property => (
                <Property property={property} />
              ))}
            </div>
          );
        }}
      </Query>
    </ContentfulProvider>
  );
};

export default Home;

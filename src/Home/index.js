import React from "react";
import { Redirect } from "react-router-dom";
import { ContentfulClient, ContentfulProvider, Query } from "react-contentful";

import { useStateValue } from "../StateProvider";

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

          if (!data.items) {
            return <p>No user data exists.</p>;
          }

          // See the Contentful query response
          console.log(data.items);

          const property = data.items[0].fields.property[0];

          // Process and pass in the loaded `data` necessary for your page or child components.
          return (
            <div className="Home">
              <h1>Welcome, {userData.givenName}</h1>
              {property.fields.name}
            </div>
          );
        }}
      </Query>
    </ContentfulProvider>
  );
};

export default Home;
